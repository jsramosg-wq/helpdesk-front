import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Tickets() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true)
      setError(null)
      try {
        const resp = await api.get('/tickets')
        setTickets(resp.data || [])
      } catch (err) {
        // If unauthorized, redirect to login
        if (err.response?.status === 401) {
          localStorage.removeItem('token')
          navigate('/login')
          return
        }
        setError(err.response?.data?.message || err.message || 'Error al obtener tickets')
      } finally {
        setLoading(false)
      }
    }
    fetchTickets()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Tickets</h1>
        <div>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>

      {loading && <div>Cargando tickets...</div>}
      {error && <div style={{ color: 'crimson' }}>{error}</div>}

      {!loading && !error && (
        <ul className="ticket-list">
          {tickets.length === 0 && <li>No hay tickets.</li>}
          {tickets.map((t) => {
            const id = t.id || t._id || t.ticketId || t.uuid
            const title = t.title || t.subject || 'Sin título'
            return (
              <li className="ticket-item" key={id || title}>
                <div>
                  <Link className="ticket-link" to={`/tickets/${id}`}>
                    {title}
                  </Link>
                  <div className="meta">ID: {id}</div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}