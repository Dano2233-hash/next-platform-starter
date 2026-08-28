import { useState } from 'react';

const STORAGE_KEY = 'dano_admin_auth';

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });

  const login = (username, password) => {
    if (username === 'dano.js' && password === 'lawa2233') {
      try {
        localStorage.setItem(STORAGE_KEY, 'true');
      } catch (e) {
        console.error('Failed to set admin auth in localStorage', e);
      }
      setIsAdmin(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password' };
  };

  const logout = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to remove admin auth from localStorage', e);
    }
    setIsAdmin(false);
  };

  return {
    isAdmin,
    login,
    logout,
  };
}

export default useAuth;
