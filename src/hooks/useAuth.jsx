import { useState, createContext, useContext } from 'react';

const AuthContext = createContext(null);
const AUTH_KEY = 'dano_admin_auth';

export const ADMIN_CREDENTIALS = {
  username: 'dano.js',
  password: 'lawa2233',
};

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const login = (username, password) => {
    if (
      username.trim() === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      localStorage.setItem(AUTH_KEY, 'true');
      setIsAdmin(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid admin username or password.' };
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
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
