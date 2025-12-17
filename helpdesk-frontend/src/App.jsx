import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Tickets from './pages/Tickets'
import TicketDetail from './pages/TicketDetail'

export default function App() {
  const token = localStorage.getItem('token')

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/tickets" element={token ? <Tickets /> : <Navigate to="/login" />} />
      <Route path="/tickets/:id" element={token ? <TicketDetail /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}
