import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('dano_admin_auth');
    if (auth === 'true') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    if (username === 'dano.js' && password === 'lawa2233') {
      localStorage.setItem('dano_admin_auth', 'true');
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('dano_admin_auth');
    setIsAdmin(false);
  };

  return { isAdmin, loading, login, logout };
}
