function ReportList({ reports, navigate }) {
  return (
    <section className="content-section">

      <h1>Daftar Laporan Masyarakat</h1>

      <p>
        Berikut adalah laporan yang telah
        disampaikan melalui portal.
      </p>

      {reports.length === 0 ? (
        <div className="empty-state">
          <h3>Belum Ada Laporan</h3>
          <p>Silakan kirim laporan pertama Anda.</p>

          <button
            className="primary-button"
            onClick={() => navigate('submit')}
          >
            Buat Laporan
          </button>
        </div>
      ) : (
        <div className="report-list">

          {reports.map((report) => (
            <div className="report-card" key={report.id}>

              <div className="report-header">
                <h3>{report.title}</h3>
                <span className="status">
                  {report.status}
                </span>
              </div>

              <p><strong>Pelapor:</strong> {report.reporter_name || report.name || 'Warga Desa'}</p>
              <p><strong>Kategori:</strong> {report.category_name || report.category || 'Umum'}</p>
              <p><strong>Tanggal:</strong> {report.created_at ? new Date(report.created_at).toLocaleDateString('id-ID') : (report.date || '-')}</p>
              {report.location && <p><strong>Lokasi:</strong> {report.location}</p>}
              <p>{report.description}</p>

            </div>
          ))}

        </div>
      )}

    </section>
  )
}

export default ReportList
