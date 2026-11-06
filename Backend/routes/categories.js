const express = require("express");
const router = express.Router();
const pool = require("../config/database");

// 1. GET ALL: Mengambil semua kategori
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM categories ORDER BY id ASC"
        );
        res.status(200).json({
            success: true,
            total: result.rowCount,
            data: result.rows
        });
    } catch (error) {
        console.error("Error getCategories:", error.message);
        res.status(500).json({
            success: false,
            message: "Gagal mengambil data kategori.",
            error: error.message
        });
    }
});

// 2. GET BY ID: Mengambil kategori berdasarkan ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            "SELECT * FROM categories WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Kategori dengan ID ${id} tidak ditemukan.`
            });
        }

        res.status(200).json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error getCategoryById:", error.message);
        res.status(500).json({
            success: false,
            message: "Gagal mengambil kategori.",
            error: error.message
        });
    }
});

// 3. POST: Tambah kategori baru
router.post("/", async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Nama kategori (name) wajib diisi."
            });
        }

        const result = await pool.query(
            "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *",
            [name, description || null]
        );

        res.status(201).json({
            success: true,
            message: "Kategori baru berhasil ditambahkan!",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error createCategory:", error.message);
        res.status(500).json({
            success: false,
            message: "Gagal menambahkan kategori.",
            error: error.message
        });
    }
});

// 4. PUT: Update kategori berdasarkan ID
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const check = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
        if (check.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Kategori dengan ID ${id} tidak ditemukan.`
            });
        }

        const current = check.rows[0];
        const result = await pool.query(
            "UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *",
            [
                name !== undefined ? name : current.name,
                description !== undefined ? description : current.description,
                id
            ]
        );

        res.status(200).json({
            success: true,
            message: `Kategori ID ${id} berhasil diperbarui!`,
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error updateCategory:", error.message);
        res.status(500).json({
            success: false,
            message: "Gagal memperbarui kategori.",
            error: error.message
        });
    }
});

// 5. DELETE: Hapus kategori berdasarkan ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            "DELETE FROM categories WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Kategori dengan ID ${id} tidak ditemukan.`
            });
        }

        res.status(200).json({
            success: true,
            message: `Kategori ID ${id} berhasil dihapus!`,
            deletedData: result.rows[0]
        });
    } catch (error) {
        console.error("Error deleteCategory:", error.message);
        res.status(500).json({
            success: false,
            message: "Gagal menghapus kategori.",
            error: error.message
        });
    }
});

module.exports = router;
