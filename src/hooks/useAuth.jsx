import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('dano_admin_auth') === 'true';
  });

  useEffect(() => {
    if (isAdmin) {
      localStorage.setItem('dano_admin_auth', 'true');
    } else {
      localStorage.removeItem('dano_admin_auth');
    }
  }, [isAdmin]);

  const login = (username, password) => {
    if (username === 'dano.js' && password === 'lawa2233') {
      setIsAdmin(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid admin username or password.' };
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
