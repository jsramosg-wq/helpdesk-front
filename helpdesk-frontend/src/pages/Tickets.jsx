import { useEffect, useState } from 'react'
import api from '../api/axios'
import { Link } from 'react-router-dom'

export default function Tickets() {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    api.get('/tickets').then(res => setTickets(res.data))
  }, [])

  return (
    <div>
      <h2>Tickets</h2>
      {tickets.map(t => (
        <div key={t._id}>
          <Link to={`/tickets/${t._id}`}>{t.title}</Link>
        </div>
      ))}
    </div>
  )
}
