import { useState } from 'react';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('dano_admin_auth') === 'true';
  });

  const login = (username, password) => {
    if (username === 'dano.js' && password === 'lawa2233') {
      localStorage.setItem('dano_admin_auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('dano_admin_auth');
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    logout
  };
}
