import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const LOCAL_STORAGE_KEY = 'dano_admin_auth';

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });

  const login = (username, password) => {
    if (username === 'dano.js' && password === 'lawa2233') {
      localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
      setIsAdmin(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid admin username or password.' };
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
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
