import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const ADMIN_AUTH_KEY = 'dano_admin_auth';

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
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
      console.error('Failed to update admin auth status', e);
    }
  }, [isAdmin]);

  const login = (username, password) => {
    if (username.trim() === 'dano.js' && password === 'lawa2233') {
      setIsAdmin(true);
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      return { success: true };
    }
    return { success: false, error: 'Invalid admin credentials. Please verify your username and password.' };
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem(ADMIN_AUTH_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        login,
        logout
      }}
    >
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
