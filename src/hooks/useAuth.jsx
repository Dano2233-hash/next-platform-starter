import { useState, useEffect } from 'react';

const ADMIN_AUTH_KEY = 'dano_admin_auth';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  });

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem(ADMIN_AUTH_KEY) === 'true');
    };
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const login = (username, password) => {
    if (username === 'dano.js' && password === 'lawa2233') {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password' };
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
}
