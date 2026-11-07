import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const ADMIN_STORAGE_KEY = 'dano_admin_auth';

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const login = (username, password) => {
    // Required Admin credentials:
    // Username: dano.js
    // Password: lawa2233
    if (username.trim() === 'dano.js' && password === 'lawa2233') {
      localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
      setIsAdmin(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password. Please try again.' };
  };

  const logout = () => {
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
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

export default useAuth;
