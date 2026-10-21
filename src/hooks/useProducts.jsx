import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('dano_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved products', e);
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('dano_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved orders', e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('dano_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('dano_orders', JSON.stringify(orders));
  }, [orders]);

  const addProduct = (newProduct) => {
    const productToAdd = {
      ...newProduct,
      id: newProduct.id || newProduct.slug || `prod-${Date.now()}`,
      rating: newProduct.rating || 5.0,
      soldCount: newProduct.soldCount || 0
    };
    setProducts((prev) => [productToAdd, ...prev]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, ...updatedFields } : prod))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  const addOrder = (order) => {
    const orderWithDate = {
      ...order,
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [orderWithDate, ...prev]);
    return orderWithDate;
  };

  const resetToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('dano_products');
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        resetToDefault
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
