const express = require("express");
const router = express.Router();

const {
    getAllReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport
} = require("../controllers/reportController");

// ============================================================================
// ROUTES REST API LAPORAN (REPORTS)
// Sesuai Ketentuan Tugas:
// 1. GET    /api/reports      => Dapatkan semua data
// 2. GET    /api/reports/:id  => Dapatkan data berdasarkan ID pada parameter URL
// 3. POST   /api/reports      => Membuat data baru disimpan ke Database
// 4. PUT    /api/reports/:id  => Memperbarui data
// 5. DELETE /api/reports/:id  => Menghapus data
// ============================================================================

// 1. GET ALL: Dapatkan semua data laporan
router.get("/", getAllReports);

// 2. GET BY ID: Dapatkan data laporan berdasarkan parameter ID
router.get("/:id", getReportById);

// 3. POST: Buat laporan baru dan simpan ke database
router.post("/", createReport);

// 4. PUT: Perbarui data laporan berdasarkan parameter ID
router.put("/:id", updateReport);

// 5. DELETE: Hapus data laporan berdasarkan parameter ID
router.delete("/:id", deleteReport);

module.exports = router;
