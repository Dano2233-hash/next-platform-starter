import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem('dano_admin_auth') === 'true';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    const handleStorage = () => {
      setIsAdmin(localStorage.getItem('dano_admin_auth') === 'true');
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const login = (username, password) => {
    if (username === 'dano.js' && password === 'lawa2233') {
      try {
        localStorage.setItem('dano_admin_auth', 'true');
      } catch (e) {
        console.error('Failed to set localStorage', e);
      }
      setIsAdmin(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid admin username or password' };
  };

  const logout = () => {
    try {
      localStorage.removeItem('dano_admin_auth');
    } catch (e) {
      console.error('Failed to remove localStorage item', e);
    }
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
