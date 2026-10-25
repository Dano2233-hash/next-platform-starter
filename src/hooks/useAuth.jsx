import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const ADMIN_AUTH_KEY = 'dano_admin_auth';

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isAdmin) {
        localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      } else {
        localStorage.removeItem(ADMIN_AUTH_KEY);
      }
    } catch (e) {
      console.error('Failed to update auth state in storage:', e);
    }
  }, [isAdmin]);

  const login = (username, password) => {
    if (username === 'dano.js' && password === 'lawa2233') {
      setIsAdmin(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password' };
  };

  const logout = () => {
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
