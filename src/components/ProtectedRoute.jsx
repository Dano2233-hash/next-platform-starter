import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children, navigate }) {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to admin-login
      navigate('/admin-login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-t-cyan-400 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-zinc-500 mt-4 font-bold">Redirecting to Admin Login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
