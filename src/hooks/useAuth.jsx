import { useState, useEffect } from 'react';

const AUTH_KEY = 'dano_admin_auth';

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });

  const login = (username, password) => {
    if (username === 'dano.js' && password === 'lawa2233') {
      try {
        localStorage.setItem(AUTH_KEY, 'true');
      } catch (e) {
        console.error('Error writing auth to localStorage:', e);
      }
      setIsAdmin(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password' };
  };

  const logout = () => {
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (e) {
      console.error('Error removing auth from localStorage:', e);
    }
    setIsAdmin(false);
  };

  return {
    isAdmin,
    login,
    logout
  };
}
