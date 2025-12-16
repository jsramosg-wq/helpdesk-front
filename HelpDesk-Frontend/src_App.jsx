import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Tickets from './pages/Tickets'
import TicketDetail from './pages/TicketDetail'

function RequireAuth({ children }) {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tickets" replace />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/tickets"
        element={
          <RequireAuth>
            <Tickets />
          </RequireAuth>
        }
      />

      <Route
        path="/tickets/:id"
        element={
          <RequireAuth>
            <TicketDetail />
          </RequireAuth>
        }
      />

      {/* Not found -> redirect to tickets or login depending on auth */}
      <Route path="*" element={<Navigate to="/tickets" replace />} />
    </Routes>
  )
}