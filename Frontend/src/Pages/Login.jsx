import { useState } from 'react'

function Login({ navigate }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    if (username === 'admin' && password === 'admin123') {
      alert('Login berhasil!')
      navigate('admin')
    } else {
      alert('Username atau password salah.')
    }
  }

  return (
    <section className="form-section">

      <div className="form-container login-container">

        <h1>Login Admin</h1>

        <p>
          Masuk untuk mengelola laporan masyarakat.
        </p>

        <form onSubmit={handleLogin}>

          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Masukkan username"
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password"
          />

          <button className="primary-button" type="submit">
            Masuk
          </button>

        </form>

        <small>
          Demo: admin / admin123
        </small>

      </div>

    </section>
  )
}

export default Login