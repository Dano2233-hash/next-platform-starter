import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const STORAGE_KEY = 'dano_admin_auth';

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch (e) {
      console.error('Error reading dano_admin_auth:', e);
      return false;
    }
  });

  const login = (username, password) => {
    if (username.trim() === 'dano.js' && password.trim() === 'lawa2233') {
      localStorage.setItem(STORAGE_KEY, 'true');
      setIsAdmin(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password' };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
