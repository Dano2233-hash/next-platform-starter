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

  useEffect(() => {
    try {
      if (isAdmin) {
        localStorage.setItem(AUTH_KEY, 'true');
      } else {
        localStorage.removeItem(AUTH_KEY);
      }
    } catch (e) {
      console.error('Failed to update auth status:', e);
    }
  }, [isAdmin]);

  const login = (username, password) => {
    if (username === 'dano.js' && password === 'lawa2233') {
      localStorage.setItem(AUTH_KEY, 'true');
      setIsAdmin(true);
      return { success: true };
    }
    return { success: false, message: 'Invalid username or password' };
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAdmin(false);
  };

  return {
    isAdmin,
    login,
    logout,
  };
}
