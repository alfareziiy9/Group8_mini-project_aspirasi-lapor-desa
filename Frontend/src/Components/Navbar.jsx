function Navbar({ navigate }) {
  return (
    <nav className="navbar">
      <div className="nav-container">

        <div
          className="logo"
          onClick={() => navigate('home')}
        >
          <span>🏡</span>
          <div>
            <h2>ASPIRASI DESA</h2>
            <small>Portal Layanan Masyarakat</small>
          </div>
        </div>

        <div className="nav-links">
          <button onClick={() => navigate('home')}>
            Beranda
          </button>

          <button onClick={() => navigate('submit')}>
            Buat Laporan
          </button>

          <button onClick={() => navigate('reports')}>
            Daftar Laporan
          </button>

          <button
            className="login-button"
            onClick={() => navigate('login')}
          >
            Login
          </button>
        </div>

      </div>
    </nav>
  )
}

export default Navbar