import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ isAdmin, children }) {
  const location = useLocation();

  if (!isAdmin) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return children;
}
