import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ isAdmin }) {
  const isAuth = isAdmin || (typeof window !== 'undefined' && localStorage.getItem('dano_admin_auth') === 'true');

  if (!isAuth) {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;
}
