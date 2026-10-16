import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/products.js';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem('dano_products');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse stored products', e);
    }
    return initialProducts;
  });

  useEffect(() => {
    try {
      localStorage.setItem('dano_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  const addProduct = (newProduct) => {
    const id = newProduct.id || newProduct.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const slug = id;
    const productToAdd = {
      ...newProduct,
      id,
      slug,
      rating: newProduct.rating || 5.0,
      soldCount: newProduct.soldCount || 0
    };
    setProducts((prev) => [productToAdd, ...prev]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetToDefaultProducts = () => {
    setProducts(initialProducts);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToDefaultProducts
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
