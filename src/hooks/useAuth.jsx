import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = 'dano_admin_auth';

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isAdmin) {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to sync auth with localStorage:', e);
    }
  }, [isAdmin]);

  /**
   * Admin credentials requirement:
   * Username: dano.js
   * Password: lawa2233
   */
  const login = (username, password) => {
    if (username === 'dano.js' && password === 'lawa2233') {
      setIsAdmin(true);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } catch (e) {
        console.error(e);
      }
      return { success: true };
    }
    return {
      success: false,
      error: 'Invalid username or password. Please verify credentials.'
    };
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
