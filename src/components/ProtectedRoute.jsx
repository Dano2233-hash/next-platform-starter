import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * ProtectedRoute:
 * - Nobody can access /admin without login
 * - Direct visit to /admin without login must redirect to /admin-login
 */
export function ProtectedRoute({ children }) {
  const { isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
