import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem('dano_admin_auth') === 'true';
    } catch (e) {
      return false;
    }
  });

  const login = (username, password) => {
    if (username === 'dano.js' && password === 'lawa2233') {
      try {
        localStorage.setItem('dano_admin_auth', 'true');
      } catch (e) {}
      setIsAdmin(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password. Check credentials.' };
  };

  const logout = () => {
    try {
      localStorage.removeItem('dano_admin_auth');
    } catch (e) {}
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
