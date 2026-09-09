import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('dano_admin_auth') === 'true';
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAdmin(localStorage.getItem('dano_admin_auth') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (username, password) => {
    if (username === 'dano.js' && password === 'lawa2233') {
      localStorage.setItem('dano_admin_auth', 'true');
      setIsAdmin(true);
      return { success: true };
    } else {
      return { success: false, message: 'Invalid admin username or password.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('dano_admin_auth');
    setIsAdmin(false);
  };

  return {
    isAdmin,
    login,
    logout,
  };
};
