import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function ProtectedRoute({ children }) {
  const { isAdmin } = useAuth()

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />
  }

  return children
}
