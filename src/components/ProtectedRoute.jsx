import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const auth = localStorage.getItem('dano_admin_auth');
  const isAuth = auth === 'true';

  if (!isAuth) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
