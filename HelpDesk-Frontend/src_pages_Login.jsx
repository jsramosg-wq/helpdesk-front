import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const resp = await api.post('/auth/login', { email, password })
      const token = resp.data?.token
      if (!token) throw new Error('Token no recibido')
      localStorage.setItem('token', token)
      // Optionally set default header (interceptor already handles it)
      api.defaults.headers.common.Authorization = `Bearer ${token}`
      navigate('/tickets')
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || err.message || 'Error en login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>HelpDesk - Login</h1>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tu@correo.com"
          />
        </label>

        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="tu contraseña"
          />
        </label>

        {error && <div style={{ color: 'crimson' }}>{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}