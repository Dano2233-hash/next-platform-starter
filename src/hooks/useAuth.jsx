import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = 'dano_admin_auth';

// Required Admin Credentials
const ADMIN_USER = 'dano.js';
const ADMIN_PASS = 'lawa2233';

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const login = (username, password) => {
    if (username.trim() === ADMIN_USER && password === ADMIN_PASS) {
      setIsAdmin(true);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } catch (e) {
        console.error(e);
      }
      return { success: true };
    }
    return { success: false, message: 'Invalid username or password' };
  };

  const logout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
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
