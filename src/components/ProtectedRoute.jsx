import React from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children, isAdmin }) {
  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
}
