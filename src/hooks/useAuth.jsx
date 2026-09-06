import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem('dano_admin_auth') === 'true';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isAdmin) {
        localStorage.setItem('dano_admin_auth', 'true');
      } else {
        localStorage.removeItem('dano_admin_auth');
      }
    } catch (e) {
      console.error('Failed to sync auth state to localStorage', e);
    }
  }, [isAdmin]);

  const login = (username, password) => {
    if (username === 'dano.js' && password === 'lawa2233') {
      setIsAdmin(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid admin username or password' };
  };

  const logout = () => {
    setIsAdmin(false);
  };

  return {
    isAdmin,
    login,
    logout
  };
}
