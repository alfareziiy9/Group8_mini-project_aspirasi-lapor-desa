import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [page, setPage] = useState('home');

  const [reports, setReports] = useState([]);

  const [form, setForm] = useState({
    name: '',
    category: '',
    title: '',
    description: ''
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Mengirim laporan
  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.name ||
      !form.category ||
      !form.title ||
      !form.description
    ) {
      alert('Mohon lengkapi semua data!');
      return;
    }

    const newReport = {
      id: Date.now(),
      ...form,
      status: 'Menunggu',
      date: new Date().toLocaleDateString('id-ID')
    };

    setReports([...reports, newReport]);

    setForm({
      name: '',
      category: '',
      title: '',
      description: ''
    });

    alert('Laporan berhasil dikirim!');
    setPage('reports');
  }

  // Login admin (simulasi)
  function handleLogin(e) {
    e.preventDefault();

    if (username === 'admin' && password === 'admin123') {
      alert('Login berhasil!');
      setPage('admin');
    } else {
      alert('Username atau password salah!');
    }
  }

  // Mengubah status laporan
  function updateStatus(id, status) {
    setReports(
      reports.map((report) =>
        report.id === id
          ? { ...report, status: status }
          : report
      )
    );
  }

  // Navigasi
  function navigate(destination) {
    setPage(destination);
    window.scrollTo(0, 0);
  }

  return (
    <div style={styles.body}>

      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <div style={styles.logo} onClick={() => navigate('home')}>
          🏡 PORTAL ASPIRASI DESA
        </div>

        <div style={styles.navLinks}>
          <button style={styles.navButton} onClick={() => navigate('home')}>
            Beranda
          </button>

          <button style={styles.navButton} onClick={() => navigate('submit')}>
            Kirim Laporan
          </button>

          <button style={styles.navButton} onClick={() => navigate('reports')}>
            Daftar Laporan
          </button>

          <button
            style={styles.loginButton}
            onClick={() => navigate('login')}
          >
            Login Admin
          </button>
        </div>
      </nav>

      {/* HALAMAN UTAMA */}
      {page === 'home' && (
        <>
          <section style={styles.hero}>
            <div style={styles.heroContent}>
              <p style={styles.heroLabel}>
                PELAYANAN MASYARAKAT DIGITAL
              </p>

              <h1 style={styles.heroTitle}>
                Suarakan Aspirasi,<br />
                Bangun Desa Bersama.
              </h1>

              <p style={styles.heroText}>
                Sampaikan aspirasi, keluhan, dan laporan
                Anda untuk membantu membangun desa yang
                lebih baik.
              </p>

              <button
                style={styles.primaryButton}
                onClick={() => navigate('submit')}
              >
                Kirim Aspirasi
              </button>

              <button
                style={styles.outlineButton}
                onClick={() => navigate('reports')}
              >
                Lihat Laporan
              </button>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Layanan Portal Desa</h2>

            <p style={styles.sectionText}>
              Sarana digital untuk menyampaikan aspirasi
              dan laporan masyarakat.
            </p>

            <div style={styles.cardContainer}>
              <div style={styles.card}>
                <div style={styles.icon}>📝</div>
                <h3>Kirim Aspirasi</h3>
                <p>
                  Sampaikan ide, saran, dan masukan
                  untuk kemajuan desa.
                </p>
              </div>

              <div style={styles.card}>
                <div style={styles.icon}>📢</div>
                <h3>Laporan Masyarakat</h3>
                <p>
                  Laporkan permasalahan yang terjadi
                  di lingkungan desa.
                </p>
              </div>

              <div style={styles.card}>
                <div style={styles.icon}>📊</div>
                <h3>Pantau Laporan</h3>
                <p>
                  Lihat perkembangan status laporan
                  yang telah dikirimkan.
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* HALAMAN KIRIM LAPORAN */}
      {page === 'submit' && (
        <section style={styles.formSection}>
          <div style={styles.formCard}>
            <h2>Kirim Aspirasi dan Laporan</h2>

            <p style={styles.muted}>
              Silakan isi formulir berikut dengan lengkap.
            </p>

            <form onSubmit={handleSubmit}>
              <label style={styles.label}>Nama Pelapor</label>
              <input
                style={styles.input}
                type="text"
                placeholder="Masukkan nama Anda"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <label style={styles.label}>Kategori</label>
              <select
                style={styles.input}
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                <option value="">Pilih kategori</option>
                <option value="Infrastruktur">Infrastruktur</option>
                <option value="Pelayanan Desa">Pelayanan Desa</option>
                <option value="Lingkungan">Lingkungan</option>
                <option value="Keamanan">Keamanan</option>
                <option value="Lainnya">Lainnya</option>
              </select>

              <label style={styles.label}>Judul Laporan</label>
              <input
                style={styles.input}
                type="text"
                placeholder="Masukkan judul laporan"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <label style={styles.label}>Isi Laporan</label>
              <textarea
                style={styles.textarea}
                rows="5"
                placeholder="Jelaskan aspirasi atau laporan Anda..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <button style={styles.primaryButton} type="submit">
                Kirim Laporan
              </button>

              <button
                style={styles.backButton}
                type="button"
                onClick={() => navigate('home')}
              >
                Kembali
              </button>
            </form>
          </div>
        </section>
      )}

      {/* HALAMAN DAFTAR LAPORAN */}
      {page === 'reports' && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            Daftar Laporan Masyarakat
          </h2>

          <p style={styles.sectionText}>
            Laporan yang telah disampaikan melalui portal.
          </p>

          {reports.length === 0 ? (
            <div style={styles.empty}>
              <h3>Belum Ada Laporan</h3>
              <p>Jadilah yang pertama menyampaikan aspirasi.</p>

              <button
                style={styles.primaryButton}
                onClick={() => navigate('submit')}
              >
                Buat Laporan
              </button>
            </div>
          ) : (
            reports.map((report) => (
              <div key={report.id} style={styles.reportCard}>
                <h3>{report.title}</h3>
                <p><b>Nama:</b> {report.name}</p>
                <p><b>Kategori:</b> {report.category}</p>
                <p><b>Tanggal:</b> {report.date}</p>
                <p><b>Isi:</b> {report.description}</p>
                <p>
                  <b>Status:</b> {report.status}
                </p>
              </div>
            ))
          )}
        </section>
      )}

      {/* HALAMAN LOGIN */}
      {page === 'login' && (
        <section style={styles.formSection}>
          <div style={styles.formCard}>
            <h2>Login Admin</h2>

            <p style={styles.muted}>
              Masuk untuk mengelola laporan masyarakat.
            </p>

            <form onSubmit={handleLogin}>
              <label style={styles.label}>Username</label>
              <input
                style={styles.input}
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <label style={styles.label}>Password</label>
              <input
                style={styles.input}
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button style={styles.primaryButton} type="submit">
                Masuk
              </button>
            </form>

            <p style={styles.demo}>
              Login demo: admin / admin123
            </p>
          </div>
        </section>
      )}

      {/* DASHBOARD ADMIN */}
      {page === 'admin' && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Dashboard Admin</h2>

          <p style={styles.sectionText}>
            Kelola aspirasi dan laporan masyarakat.
          </p>

          <div style={styles.summary}>
            <div style={styles.summaryCard}>
              <h3>Total Laporan</h3>
              <h2>{reports.length}</h2>
            </div>

            <div style={styles.summaryCard}>
              <h3>Menunggu</h3>
              <h2>
                {reports.filter((r) => r.status === 'Menunggu').length}
              </h2>
            </div>

            <div style={styles.summaryCard}>
              <h3>Selesai</h3>
              <h2>
                {reports.filter((r) => r.status === 'Selesai').length}
              </h2>
            </div>
          </div>

          <h3 style={{ marginTop: 35 }}>Kelola Laporan</h3>

          {reports.length === 0 ? (
            <p style={{ marginTop: 20 }}>
              Belum ada laporan yang masuk.
            </p>
          ) : (
            reports.map((report) => (
              <div key={report.id} style={styles.reportCard}>
                <h3>{report.title}</h3>
                <p>Pelapor: {report.name}</p>
                <p>Kategori: {report.category}</p>
                <p>Isi: {report.description}</p>

                <label style={styles.label}>Ubah Status</label>

                <select
                  style={styles.input}
                  value={report.status}
                  onChange={(e) =>
                    updateStatus(report.id, e.target.value)
                  }
                >
                  <option value="Menunggu">Menunggu</option>
                  <option value="Diproses">Diproses</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>
            ))
          )}

          <button
            style={styles.backButton}
            onClick={() => navigate('home')}
          >
            Kembali ke Beranda
          </button>
        </section>
      )}

      {/* FOOTER */}
      <footer style={styles.footer}>
        <h3>Portal Kanal Aspirasi dan Lapor Desa</h3>
        <p>Sarana penyampaian aspirasi masyarakat desa.</p>
        <p>© 2026 Portal Aspirasi Desa</p>
      </footer>

    </div>
  );
}

// DESAIN WEBSITE
const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    color: '#26352d',
    backgroundColor: '#f5f7f6',
    minHeight: '100vh'
  },

  navbar: {
    backgroundColor: '#ffffff',
    padding: '18px 6%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
  },

  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#176b45',
    cursor: 'pointer'
  },

  navLinks: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px'
  },

  navButton: {
    border: 'none',
    background: 'transparent',
    padding: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#333'
  },

  loginButton: {
    border: 'none',
    backgroundColor: '#176b45',
    color: 'white',
    padding: '11px 18px',
    borderRadius: '6px',
    cursor: 'pointer'
  },

  hero: {
    background: 'linear-gradient(120deg, #145c3c, #31976b)',
    color: 'white',
    padding: '90px 9%',
    minHeight: '430px',
    display: 'flex',
    alignItems: 'center'
  },

  heroContent: {
    maxWidth: '700px'
  },

  heroLabel: {
    letterSpacing: '2px',
    fontSize: '13px',
    fontWeight: 'bold'
  },

  heroTitle: {
    fontSize: 'clamp(32px, 5vw, 48px)',
    lineHeight: '1.2',
    margin: '20px 0'
  },

  heroText: {
    lineHeight: '1.8',
    marginBottom: '25px',
    maxWidth: '580px'
  },

  primaryButton: {
    backgroundColor: '#176b45',
    color: 'white',
    border: 'none',
    padding: '13px 22px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    margin: '8px 8px 8px 0'
  },

  outlineButton: {
    backgroundColor: 'white',
    color: '#176b45',
    border: 'none',
    padding: '13px 22px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    margin: '8px'
  },

  backButton: {
    backgroundColor: '#e5eee8',
    color: '#176b45',
    border: 'none',
    padding: '13px 22px',
    borderRadius: '6px',
    cursor: 'pointer',
    margin: '8px 8px 8px 0'
  },

  section: {
    padding: '65px 8%',
    minHeight: '450px'
  },

  sectionTitle: {
    textAlign: 'center',
    fontSize: '30px'
  },

  sectionText: {
    textAlign: 'center',
    color: '#777',
    margin: '15px 0 35px'
  },

  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '22px'
  },

  card: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 3px 12px rgba(0,0,0,0.05)'
  },

  icon: {
    fontSize: '42px',
    marginBottom: '15px'
  },

  formSection: {
    padding: '55px 20px',
    minHeight: '500px'
  },

  formCard: {
    backgroundColor: 'white',
    maxWidth: '650px',
    margin: 'auto',
    padding: '35px',
    borderRadius: '12px',
    boxShadow: '0 3px 15px rgba(0,0,0,0.06)'
  },

  muted: {
    color: '#777',
    margin: '12px 0 25px'
  },

  label: {
    display: 'block',
    fontWeight: 'bold',
    margin: '15px 0 8px'
  },

  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    marginBottom: '10px',
    boxSizing: 'border-box',
    backgroundColor: 'white'
  },

  textarea: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    boxSizing: 'border-box',
    marginBottom: '10px',
    fontFamily: 'Arial'
  },

  empty: {
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '45px 20px',
    borderRadius: '10px',
    marginTop: '30px'
  },

  reportCard: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '9px',
    marginTop: '18px',
    boxShadow: '0 3px 12px rgba(0,0,0,0.05)'
  },

  summary: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '20px',
    marginTop: '30px'
  },

  summaryCard: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 3px 12px rgba(0,0,0,0.05)'
  },

  demo: {
    color: '#777',
    fontSize: '13px',
    marginTop: '20px'
  },

  footer: {
    backgroundColor: '#174d36',
    color: 'white',
    textAlign: 'center',
    padding: '35px 20px',
    lineHeight: '1.8'
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
