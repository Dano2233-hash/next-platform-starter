import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { isAdmin } = useAuth();
  const location = useLocation();

  if (!isAdmin) {
    // Redirect to /admin-login keeping track of the intended location
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return children;
}
