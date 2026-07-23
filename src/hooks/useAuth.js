import { useState, useEffect } from 'react';

const AUTH_KEY = 'dano_admin_auth';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(AUTH_KEY) === 'true';
  });

  const login = (username, password) => {
    if (username === 'dano.js' && password === 'lawa2233') {
      localStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      return { success: true };
    } else {
      return {
        success: false,
        message: 'Invalid username or password. Please try again.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    logout
  };
}
