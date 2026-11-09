import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Route protection: Nobody can access /admin without login.
 * Direct visit redirects to /admin-login.
 */
export default function ProtectedRoute({ children }) {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
