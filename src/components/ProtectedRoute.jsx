import React from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ isAdmin, children }) {
  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
}
