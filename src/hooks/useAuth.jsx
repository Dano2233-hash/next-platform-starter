import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const ADMIN_AUTH_KEY = 'dano_admin_auth';

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [authError, setAuthError] = useState('');

  const login = (username, password) => {
    setAuthError('');
    const trimmedUser = (username || '').trim();
    const trimmedPass = (password || '').trim();

    if (trimmedUser === 'dano.js' && trimmedPass === 'lawa2233') {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      setIsAdmin(true);
      return { success: true };
    } else {
      setAuthError('Invalid admin username or password. Access denied.');
      return { success: false, error: 'Invalid admin username or password. Access denied.' };
    }
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    setIsAdmin(false);
    setAuthError('');
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout, authError, setAuthError }}>
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
