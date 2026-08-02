import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { isAdmin } = useAuth();

  // If not logged in as admin, redirect to login page instantly
  if (!isAdmin) {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin-login';
    }
    return null;
  }

  return <>{children}</>;
}
