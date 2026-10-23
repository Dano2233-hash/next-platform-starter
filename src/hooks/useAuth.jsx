import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem('dano_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dano_orders', JSON.stringify(orders));
    } catch (err) {
      console.error('Failed to save orders to localStorage', err);
    }
  }, [orders]);

  const login = (username, password) => {
    if (username === 'dano.js' && password === 'lawa2233') {
      localStorage.setItem('dano_admin_auth', 'true');
      setIsAdmin(true);
      return { success: true };
    }
    return { success: false, message: 'Invalid username or password. Please try again.' };
  };

  const logout = () => {
    localStorage.removeItem('dano_admin_auth');
    setIsAdmin(false);
  };

  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'Pending'
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout, orders, addOrder }}>
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
