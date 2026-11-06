const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/database");
const categoriesRoute = require("./routes/categories");
const reportsRoute = require("./routes/reports");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Halaman utama (Daftar API & status)
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "REST API Portal Kanal Aspirasi dan Lapor Desa aktif!",
        endpoints: {
            reports: {
                getAll: "GET /api/reports",
                getById: "GET /api/reports/:id",
                create: "POST /api/reports",
                update: "PUT /api/reports/:id",
                delete: "DELETE /api/reports/:id"
            },
            categories: {
                getAll: "GET /api/categories",
                getById: "GET /api/categories/:id",
                create: "POST /api/categories",
                update: "PUT /api/categories/:id",
                delete: "DELETE /api/categories/:id"
            },
            databaseTest: "GET /api/db-test"
        }
    });
});

// Tes koneksi database
app.get("/api/db-test", async (req, res) => {
    try {
        const result = await pool.query("SELECT current_database(), now() AS server_time");
        res.json({
            success: true,
            message: "Database PostgreSQL berhasil terhubung!",
            database: result.rows[0].current_database,
            server_time: result.rows[0].server_time
        });
    } catch (error) {
        console.error("Koneksi database gagal:", error.message);
        res.status(500).json({
            success: false,
            message: "Koneksi database PostgreSQL gagal.",
            error: error.message
        });
    }
});

// Routing API
app.use("/api/categories", categoriesRoute);
app.use("/api/reports", reportsRoute);

// 404 Handler untuk rute yang tidak ditemukan
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan.`
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({
        success: false,
        message: "Terjadi kesalahan internal pada server.",
        error: err.message
    });
});

// Menjalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
