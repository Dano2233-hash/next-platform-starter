import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem('dano_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const login = (username, password) => {
    // Official admin credentials
    if (username === 'dano.js' && password === 'lawa2233') {
      localStorage.setItem('dano_admin_auth', 'true');
      setIsAdmin(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password' };
  };

  const logout = () => {
    localStorage.removeItem('dano_admin_auth');
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
