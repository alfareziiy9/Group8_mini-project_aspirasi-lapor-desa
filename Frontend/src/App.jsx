import { useState, useEffect } from 'react'

import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

import Home from './Pages/Home'
import Login from './Pages/Login'
import AdminDashboard from './Pages/AdminDashboard'
import ReportList from './Pages/ReportList'
import SubmitReport from './Pages/SubmitReport'

const API_BASE_URL = 'http://localhost:5000/api'

function App() {
  const [page, setPage] = useState('home')
  const [reports, setReports] = useState([])

  // Fungsi untuk memuat daftar laporan dari Express REST API
  const fetchReports = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports`)
      if (response.ok) {
        const data = await response.json()
        if (data.data) {
          setReports(data.data)
        }
      }
    } catch (error) {
      console.warn('Backend API tidak terdeteksi atau offline. Menggunakan penyimpanan lokal.', error.message)
    }
  }

  // Muat data saat aplikasi pertama kali dibuka
  useEffect(() => {
    fetchReports()
  }, [])

  const navigate = (destination) => {
    setPage(destination)
    window.scrollTo(0, 0)
  }

  // Menambah laporan baru (POST ke Express REST API)
  const addReport = async (report) => {
    const newReportLocal = {
      id: Date.now(),
      ...report,
      reporter_name: report.name,
      category_name: report.category,
      status: 'Menunggu',
      created_at: new Date().toISOString()
    }

    try {
      const response = await fetch(`${API_BASE_URL}/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 1,
          category_id: 1,
          title: report.title,
          description: report.description,
          location: report.name ? `Dari: ${report.name}` : null
        })
      })

      if (response.ok) {
        await fetchReports()
      } else {
        setReports((previous) => [newReportLocal, ...previous])
      }
    } catch {
      setReports((previous) => [newReportLocal, ...previous])
    }

    navigate('reports')
  }

  // Mengubah status laporan (PUT ke Express REST API)
  const updateStatus = async (id, status) => {
    // Update local state terlebih dahulu agar UI responsif
    setReports((previous) =>
      previous.map((report) =>
        report.id === id ? { ...report, status } : report
      )
    )

    try {
      await fetch(`${API_BASE_URL}/reports/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
    } catch (error) {
      console.warn('Gagal sinkron status ke API backend:', error.message)
    }
  }

  return (
    <>
      <Navbar navigate={navigate} />

      <main>
        {page === 'home' && (
          <Home navigate={navigate} />
        )}

        {page === 'login' && (
          <Login navigate={navigate} />
        )}

        {page === 'submit' && (
          <SubmitReport
            addReport={addReport}
            navigate={navigate}
          />
        )}

        {page === 'reports' && (
          <ReportList
            reports={reports}
            navigate={navigate}
          />
        )}

        {page === 'admin' && (
          <AdminDashboard
            reports={reports}
            updateStatus={updateStatus}
          />
        )}
      </main>

      <Footer />
    </>
  )
}

export default App
