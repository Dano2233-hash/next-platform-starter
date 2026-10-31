import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const ADMIN_STORAGE_KEY = 'dano_admin_auth';

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
  });

  useEffect(() => {
    if (isAdmin) {
      localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
    } else {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
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
    localStorage.removeItem(ADMIN_STORAGE_KEY);
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
