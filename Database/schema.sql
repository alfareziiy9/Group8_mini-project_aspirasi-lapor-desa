DROP TABLE IF EXISTS report_responses CASCADE;
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'warga',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255),
    status VARCHAR(30) DEFAULT 'Menunggu',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE report_responses (
    id SERIAL PRIMARY KEY,
    report_id INT REFERENCES reports(id) ON DELETE CASCADE,
    admin_id INT REFERENCES users(id) ON DELETE SET NULL,
    response TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Data (Users)
INSERT INTO users (name, email, phone, role) VALUES
('Budi Santoso', 'budi.santoso@gmail.com', '081234567890', 'warga'),
('Siti Rahmawati', 'siti.rahma@gmail.com', '081298765432', 'warga'),
('Admin Desa Sukamaju', 'admin@sukamaju.desa.id', '081300112233', 'admin');

-- Data (Categories)
INSERT INTO categories (name, description) VALUES
('Infrastruktur', 'Laporan kerusakan jalan, jembatan, irigasi, dan fasilitas umum desa'),
('Pelayanan Desa', 'Aspirasi terkait administrasi kependudukan dan surat-menyurat desa'),
('Lingkungan', 'Pengelolaan sampah, kebersihan lingkungan, dan saluran air'),
('Keamanan', 'Gangguan ketertiban umum, penerangan jalan umum (PJU), pos ronda'),
('Lainnya', 'Aspirasi dan usulan umum lainnya');

-- Data (Reports)
INSERT INTO reports (user_id, category_id, title, description, location, status) VALUES
(1, 1, 'Jalan Rusak dan Berlubang di RT 02 Dusun Krajan', 'Terdapat lubang besar sedalam 20 cm yang membahayakan pengendara motor, mohon segera ditambal.', 'Jl. Melati RT 02 RW 01 Dusun Krajan', 'Diproses'),
(2, 4, 'Lampu Penerangan Jalan Padam', 'Lampu PJU di dekat pos kamling padam sudah 3 hari, kondisi jalan sangat gelap saat malam.', 'Depan Pos Kamling RT 05 RW 02', 'Menunggu'),
(1, 3, 'Penumpukan Sampah Liar di Pinggir Saluran Irigasi', 'Warga membuang sampah sembarangan sehingga aliran air tersumbat saat hujan.', 'Dekat Jembatan Irigasi Dusun Selatan', 'Selesai');

-- Data (Report Responses)
INSERT INTO report_responses (report_id, admin_id, response) VALUES
(1, 3, 'Laporan telah kami terima dan ditinjau oleh Seksi Pembangunan Desa. Perbaikan jalan dijadwalkan minggu ini.'),
(3, 3, 'Pembersihan saluran irigasi dan pengangkutan sampah telah selesai dilaksanakan bersama tim kebersihan desa.');
