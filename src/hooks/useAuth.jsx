import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem('dano_admin_auth') === 'true';
    } catch (e) {
      return false;
    }
  });

  const login = (username, password) => {
    if (username === 'dano.js' && password === 'lawa2233') {
      localStorage.setItem('dano_admin_auth', 'true');
      setIsAdmin(true);
      return { success: true };
    }
    return { success: false, message: 'Invalid admin username or password.' };
  };

  const logout = () => {
    localStorage.removeItem('dano_admin_auth');
    setIsAdmin(false);
  };

  return {
    isAdmin,
    login,
    logout
  };
}
