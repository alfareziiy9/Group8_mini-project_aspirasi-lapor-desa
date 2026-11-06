function AdminDashboard({ reports, updateStatus }) {
  return (
    <section className="content-section">

      <h1>Dashboard Admin</h1>

      <p>
        Kelola laporan dan aspirasi masyarakat desa.
      </p>

      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>Total Laporan</h3>
          <h2>{reports.length}</h2>
        </div>

        <div className="summary-card">
          <h3>Menunggu</h3>
          <h2>
            {reports.filter(
              (report) => report.status === 'Menunggu'
            ).length}
          </h2>
        </div>

        <div className="summary-card">
          <h3>Selesai</h3>
          <h2>
            {reports.filter(
              (report) => report.status === 'Selesai'
            ).length}
          </h2>
        </div>
      </div>

      <h2>Kelola Laporan</h2>

      {reports.length === 0 ? (
        <p>Belum ada laporan yang masuk.</p>
      ) : (
        reports.map((report) => (
          <div className="report-card" key={report.id}>

            <h3>{report.title}</h3>
            <p><strong>Pelapor:</strong> {report.reporter_name || report.name || 'Warga Desa'}</p>
            <p><strong>Kategori:</strong> {report.category_name || report.category || 'Umum'}</p>
            {report.location && <p><strong>Lokasi:</strong> {report.location}</p>}
            <p>{report.description}</p>

            <label>Ubah Status: </label>

            <select
              value={report.status}
              onChange={(e) =>
                updateStatus(report.id, e.target.value)
              }
            >
              <option value="Menunggu">Menunggu</option>
              <option value="Diproses">Diproses</option>
              <option value="Selesai">Selesai</option>
              <option value="Ditolak">Ditolak</option>
            </select>

          </div>
        ))
      )}

    </section>
  )
}

export default AdminDashboard
