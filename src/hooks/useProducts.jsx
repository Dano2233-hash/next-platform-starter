import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/products.js';

const ProductsContext = createContext(null);

const STORAGE_KEY = 'dano_products';

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load products from localStorage', e);
    }
    return initialProducts;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  const addProduct = (newProduct) => {
    const id = newProduct.id || newProduct.slug || `prod-${Date.now()}`;
    const productToAdd = { ...newProduct, id };
    setProducts(prev => [productToAdd, ...prev]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const resetProducts = () => {
    setProducts(initialProducts);
  };

  return (
    <ProductsContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      resetProducts
    }}>
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
