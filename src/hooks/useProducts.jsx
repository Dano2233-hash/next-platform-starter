import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const ProductsContext = createContext();

const PRODUCTS_STORAGE_KEY = 'dano_products';

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading products from local storage', e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products to local storage', e);
    }
  }, [products]);

  const addProduct = (newProduct) => {
    const created = {
      id: `prod-${Date.now()}`,
      slug: newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      rating: 5.0,
      soldCount: 0,
      ...newProduct
    };
    setProducts(prev => [created, ...prev]);
    return created;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(item => item.id === id ? { ...item, ...updatedFields } : item));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(item => item.id !== id));
  };

  const updateStock = (id, newStock) => {
    setProducts(prev => prev.map(item => item.id === id ? { ...item, stock: Number(newStock) } : item));
  };

  const resetToInitialProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        resetToInitialProducts
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
