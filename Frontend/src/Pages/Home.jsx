function Home({ navigate }) {
  return (
    <div className="home">

      <section className="hero">
        <div className="hero-content">

          <span className="hero-label">
            PELAYANAN MASYARAKAT DIGITAL
          </span>

          <h1>
            Suarakan Aspirasi,
            <br />
            Bangun Desa Bersama.
          </h1>

          <p>
            Sampaikan aspirasi, keluhan, dan laporan
            Anda melalui Portal Kanal Aspirasi dan
            Lapor Desa.
          </p>

          <button
            className="primary-button"
            onClick={() => navigate('submit')}
          >
            Kirim Aspirasi
          </button>

          <button
            className="secondary-button"
            onClick={() => navigate('reports')}
          >
            Lihat Laporan
          </button>

        </div>
      </section>

      <section className="features">
        <h2>Layanan Portal Desa</h2>

        <p className="section-description">
          Kami menyediakan sarana digital untuk
          membantu masyarakat menyampaikan aspirasi.
        </p>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Kirim Aspirasi</h3>
            <p>
              Sampaikan ide, saran, dan masukan
              untuk kemajuan desa.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📢</div>
            <h3>Laporan Masyarakat</h3>
            <p>
              Laporkan permasalahan yang terjadi
              di lingkungan desa.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Pantau Status</h3>
            <p>
              Lihat status laporan yang telah
              dikirimkan melalui portal.
            </p>
          </div>

        </div>
      </section>

    </div>
  )
}

export default Home