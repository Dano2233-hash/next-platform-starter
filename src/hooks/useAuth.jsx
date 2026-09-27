import { useState, useEffect } from 'react';

const AUTH_STORAGE_KEY = 'dano_admin_auth';

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        setIsAdmin(localStorage.getItem(AUTH_STORAGE_KEY) === 'true');
      } catch (e) {
        setIsAdmin(false);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (username, password) => {
    if (username === 'dano.js' && password === 'lawa2233') {
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } catch (e) {
        console.error('Error saving auth to LocalStorage:', e);
      }
      setIsAdmin(true);
      return { success: true };
    }
    return { success: false, message: 'Invalid username or password. Please try again.' };
  };

  const logout = () => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error('Error removing auth from LocalStorage:', e);
    }
    setIsAdmin(false);
  };

  return {
    isAdmin,
    login,
    logout
  };
}
