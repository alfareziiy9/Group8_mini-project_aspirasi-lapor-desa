const pool = require("../config/database");

/**
 * 1. GET ALL REPORTS
 * Mengambil semua data laporan masyarakat
 * Mendukung filter opsional: ?status=Diproses atau ?category_id=1
 */
const getAllReports = async (req, res) => {
    try {
        const { status, category_id } = req.query;
        let query = `
            SELECT 
                r.id,
                r.title,
                r.description,
                r.location,
                r.status,
                r.created_at,
                r.updated_at,
                r.user_id,
                u.name AS reporter_name,
                u.email AS reporter_email,
                r.category_id,
                c.name AS category_name
            FROM reports r
            LEFT JOIN users u ON r.user_id = u.id
            LEFT JOIN categories c ON r.category_id = c.id
        `;
        const params = [];
        const conditions = [];

        if (status) {
            params.push(status);
            conditions.push(`r.status ILIKE $${params.length}`);
        }

        if (category_id) {
            params.push(category_id);
            conditions.push(`r.category_id = $${params.length}`);
        }

        if (conditions.length > 0) {
            query += ` WHERE ` + conditions.join(" AND ");
        }

        query += ` ORDER BY r.id ASC`;

        const result = await pool.query(query, params);

        res.status(200).json({
            success: true,
            total: result.rowCount,
            data: result.rows
        });
    } catch (error) {
        console.error("Error getAllReports:", error.message);
        res.status(500).json({
            success: false,
            message: "Gagal mengambil data laporan.",
            error: error.message
        });
    }
};

/**
 * 2. GET REPORT BY ID
 * Mengambil detail laporan berdasarkan ID pada parameter URL
 */
const getReportById = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Parameter ID harus berupa angka."
            });
        }

        const query = `
            SELECT 
                r.id,
                r.title,
                r.description,
                r.location,
                r.status,
                r.created_at,
                r.updated_at,
                r.user_id,
                u.name AS reporter_name,
                u.email AS reporter_email,
                u.phone AS reporter_phone,
                r.category_id,
                c.name AS category_name
            FROM reports r
            LEFT JOIN users u ON r.user_id = u.id
            LEFT JOIN categories c ON r.category_id = c.id
            WHERE r.id = $1
        `;

        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Laporan dengan ID ${id} tidak ditemukan.`
            });
        }

        // Ambil tanggapan admin jika ada
        const responsesQuery = `
            SELECT rr.id, rr.response, rr.created_at, u.name AS admin_name
            FROM report_responses rr
            LEFT JOIN users u ON rr.admin_id = u.id
            WHERE rr.report_id = $1
            ORDER BY rr.created_at ASC
        `;
        const responsesResult = await pool.query(responsesQuery, [id]);

        res.status(200).json({
            success: true,
            data: {
                ...result.rows[0],
                responses: responsesResult.rows
            }
        });
    } catch (error) {
        console.error("Error getReportById:", error.message);
        res.status(500).json({
            success: false,
            message: "Gagal mengambil detail laporan.",
            error: error.message
        });
    }
};

/**
 * 3. POST - CREATE REPORT
 * Menambahkan data laporan baru ke database
 */
const createReport = async (req, res) => {
    try {
        const { user_id, category_id, title, description, location } = req.body;

        // Validasi input wajib
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Judul (title) dan deskripsi (description) wajib diisi."
            });
        }

        const query = `
            INSERT INTO reports (user_id, category_id, title, description, location, status)
            VALUES ($1, $2, $3, $4, $5, 'Menunggu')
            RETURNING *
        `;

        const values = [
            user_id || 1, // default ke user id 1 jika tidak disertakan
            category_id || null,
            title,
            description,
            location || null
        ];

        const result = await pool.query(query, values);

        res.status(201).json({
            success: true,
            message: "Laporan berhasil dibuat dan disimpan ke database!",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error createReport:", error.message);
        res.status(500).json({
            success: false,
            message: "Gagal membuat laporan baru.",
            error: error.message
        });
    }
};

/**
 * 4. PUT - UPDATE REPORT
 * Memperbarui data laporan (judul, deskripsi, kategori, lokasi, status) berdasarkan ID
 */
const updateReport = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, category_id, location, status } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Parameter ID harus berupa angka."
            });
        }

        // Cek apakah data ada
        const checkQuery = "SELECT * FROM reports WHERE id = $1";
        const checkResult = await pool.query(checkQuery, [id]);

        if (checkResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Laporan dengan ID ${id} tidak ditemukan.`
            });
        }

        const current = checkResult.rows[0];

        const query = `
            UPDATE reports
            SET 
                title = $1,
                description = $2,
                category_id = $3,
                location = $4,
                status = $5,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $6
            RETURNING *
        `;

        const values = [
            title !== undefined ? title : current.title,
            description !== undefined ? description : current.description,
            category_id !== undefined ? category_id : current.category_id,
            location !== undefined ? location : current.location,
            status !== undefined ? status : current.status,
            id
        ];

        const result = await pool.query(query, values);

        res.status(200).json({
            success: true,
            message: `Laporan ID ${id} berhasil diperbarui!`,
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error updateReport:", error.message);
        res.status(500).json({
            success: false,
            message: "Gagal memperbarui data laporan.",
            error: error.message
        });
    }
};

/**
 * 5. DELETE - DELETE REPORT
 * Menghapus data laporan dari database berdasarkan ID
 */
const deleteReport = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Parameter ID harus berupa angka."
            });
        }

        const query = "DELETE FROM reports WHERE id = $1 RETURNING *";
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Laporan dengan ID ${id} tidak ditemukan.`
            });
        }

        res.status(200).json({
            success: true,
            message: `Laporan ID ${id} berhasil dihapus dari database.`,
            deletedData: result.rows[0]
        });
    } catch (error) {
        console.error("Error deleteReport:", error.message);
        res.status(500).json({
            success: false,
            message: "Gagal menghapus data laporan.",
            error: error.message
        });
    }
};

module.exports = {
    getAllReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport
};
