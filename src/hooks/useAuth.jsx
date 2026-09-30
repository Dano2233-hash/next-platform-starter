import { useState, useEffect, createContext, useContext } from 'react';

const AUTH_KEY = 'dano_admin_auth';
const ADMIN_USER = 'dano.js';
const ADMIN_PASS = 'lawa2233';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });

  const login = (username, password) => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      try {
        localStorage.setItem(AUTH_KEY, 'true');
      } catch (e) {}
      setIsAdmin(true);
      return { success: true };
    } else {
      return { success: false, error: 'Invalid admin username or password.' };
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (e) {}
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
