import { useState } from 'react'

function SubmitReport({ addReport, navigate }) {
  const [form, setForm] = useState({
    name: '',
    category: '',
    title: '',
    description: ''
  })

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (
      !form.name ||
      !form.category ||
      !form.title ||
      !form.description
    ) {
      alert('Mohon lengkapi seluruh formulir.')
      return
    }

    addReport(form)

    alert('Laporan berhasil dikirim.')
  }

  return (
    <section className="form-section">

      <div className="form-container">
        <h1>Kirim Aspirasi dan Laporan</h1>

        <p>
          Isi formulir berikut untuk menyampaikan
          aspirasi atau laporan Anda.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Nama Pelapor</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Masukkan nama Anda"
          />

          <label>Kategori Laporan</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Pilih kategori</option>
            <option value="Infrastruktur">Infrastruktur</option>
            <option value="Pelayanan">Pelayanan Desa</option>
            <option value="Lingkungan">Lingkungan</option>
            <option value="Keamanan">Keamanan</option>
            <option value="Lainnya">Lainnya</option>
          </select>

          <label>Judul Laporan</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Masukkan judul laporan"
          />

          <label>Isi Aspirasi atau Laporan</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Jelaskan laporan Anda..."
            rows="5"
          />

          <button className="primary-button" type="submit">
            Kirim Laporan
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate('home')}
          >
            Kembali
          </button>

        </form>
      </div>

    </section>
  )
}

export default SubmitReport