import React, { createContext, useContext, useState, useEffect } from 'react';

const AUTH_KEY = 'dano_admin_auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isAdmin) {
        localStorage.setItem(AUTH_KEY, 'true');
      } else {
        localStorage.removeItem(AUTH_KEY);
      }
    } catch (e) {
      console.error('Error syncing auth state:', e);
    }
  }, [isAdmin]);

  const login = (username, password) => {
    if (username === 'dano.js' && password === 'lawa2233') {
      setIsAdmin(true);
      localStorage.setItem(AUTH_KEY, 'true');
      return { success: true };
    }
    return { success: false, message: 'Invalid admin username or password.' };
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem(AUTH_KEY);
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
