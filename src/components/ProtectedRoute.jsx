import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigation } from '../hooks/useNavigation';

/**
 * Higher-order component / wrapper to secure admin pages.
 * Redirects to #/admin-login if the user is not authenticated.
 */
export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    if (!isAuthenticated) {
      // Direct visit to /admin without login redirects to /admin-login
      navigate('#/admin-login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white p-4">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-cyan mx-auto"></div>
          <p className="text-sm text-gray-400 font-medium">Checking authorization, redirecting...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default ProtectedRoute;
