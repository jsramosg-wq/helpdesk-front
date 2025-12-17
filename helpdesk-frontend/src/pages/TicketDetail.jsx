import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'

export default function TicketDetail() {
  const { id } = useParams()
  const [ticket, setTicket] = useState(null)

  useEffect(() => {
    api.get(`/tickets/${id}`).then(res => setTicket(res.data))
  }, [id])

  if (!ticket) return null

  return (
    <div>
      <h2>{ticket.title}</h2>
      <p>{ticket.description}</p>
      <p>Estado: {ticket.status}</p>
    </div>
  )
}
