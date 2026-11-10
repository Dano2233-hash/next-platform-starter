import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products.js';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to read dano_products:', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to read dano_orders:', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dano_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to persist dano_products:', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('dano_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to persist dano_orders:', e);
    }
  }, [orders]);

  // Admin Actions:
  const addProduct = (newProd) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleStock = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, stock: item.stock > 0 ? 0 : 50 } : item
      )
    );
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem('dano_products', JSON.stringify(INITIAL_PRODUCTS));
  };

  // Order Actions:
  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStock,
        resetToDefaults,
        addOrder
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}

export default useProducts;
