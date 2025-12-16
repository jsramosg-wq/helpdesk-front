import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'

export default function TicketDetail() {
  const { id } = useParams()
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTicket = async () => {
      setLoading(true)
      setError(null)
      try {
        const resp = await api.get(`/tickets/${id}`)
        setTicket(resp.data)
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token')
          navigate('/login')
          return
        }
        setError(err.response?.data?.message || err.message || 'Error al obtener ticket')
      } finally {
        setLoading(false)
      }
    }
    fetchTicket()
  }, [id, navigate])

  return (
    <div className="container">
      <div className="header">
        <h1>Detalle del Ticket</h1>
        <div>
          <Link to="/tickets">Volver a lista</Link>
        </div>
      </div>

      {loading && <div>Cargando...</div>}
      {error && <div style={{ color: 'crimson' }}>{error}</div>}

      {!loading && !error && ticket && (
        <div>
          <h2>{ticket.title || ticket.subject || 'Sin título'}</h2>
          <p><strong>Estado:</strong> {ticket.status || ticket.state || 'N/A'}</p>
          <div>
            <h3>Descripción</h3>
            <p>{ticket.description || ticket.body || 'Sin descripción'}</p>
          </div>
        </div>
      )}
    </div>
  )
}