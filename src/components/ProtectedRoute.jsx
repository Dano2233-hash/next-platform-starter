import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Route wrapper that restricts access to admin-only pages.
 * Redirects unauthorized visitors to /admin-login.
 */
export default function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem('dano_admin_auth') === 'true';

  if (!isAuth) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
