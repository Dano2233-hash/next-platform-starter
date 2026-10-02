import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to read dano_products from local storage', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to read dano_orders from local storage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dano_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save dano_products', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('dano_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save dano_orders', e);
    }
  }, [orders]);

  const addProduct = (newProduct) => {
    const created = {
      ...newProduct,
      id: newProduct.id || newProduct.slug || `prod-${Date.now()}`,
      soldCount: Number(newProduct.soldCount) || 0,
      rating: Number(newProduct.rating) || 5.0,
      stock: Number(newProduct.stock) || 0,
      price: Number(newProduct.price) || 0,
    };
    setProducts((prev) => [created, ...prev]);
    return created;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateStock = (id, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, Number(newStock)) } : p))
    );
  };

  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      createdAt: new Date().toISOString(),
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
        updateStock,
        addOrder,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
