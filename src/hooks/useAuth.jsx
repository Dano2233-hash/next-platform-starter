import { useState, useEffect } from 'react';

const AUTH_STORAGE_KEY = 'dano_admin_auth';

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAdmin(localStorage.getItem(AUTH_STORAGE_KEY) === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (username, password) => {
    if (username === 'dano.js' && password === 'lawa2233') {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setIsAdmin(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid admin username or password' };
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAdmin(false);
  };

  return { isAdmin, login, logout };
}
