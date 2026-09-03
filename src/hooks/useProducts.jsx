import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products.js';

const ProductsContext = createContext();

const STORAGE_KEY = 'dano_products';

export const ProductsProvider = ({ children }) => {
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
      console.error('Error reading dano_products from LocalStorage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Error saving dano_products to LocalStorage:', e);
    }
  }, [products]);

  const addProduct = (newProd) => {
    const slug = newProd.slug || newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const productToAdd = {
      ...newProd,
      id: newProd.id || `prod_${Date.now()}`,
      slug,
      soldCount: Number(newProd.soldCount) || 0,
      rating: Number(newProd.rating) || 5.0,
      price: Number(newProd.price) || 0,
      oldPrice: newProd.oldPrice ? Number(newProd.oldPrice) : null,
      stock: newProd.stock !== false,
      isFeatured: !!newProd.isFeatured,
      isTrending: !!newProd.isTrending,
      isFlashDeal: !!newProd.isFlashDeal,
      isTopRated: !!newProd.isTopRated
    };
    setProducts((prev) => [productToAdd, ...prev]);
    return productToAdd;
  };

  const editProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleStock = (id) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stock: !item.stock } : item))
    );
  };

  const toggleFeatured = (id) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isFeatured: !item.isFeatured } : item))
    );
  };

  const toggleTrending = (id) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isTrending: !item.isTrending } : item))
    );
  };

  const toggleFlashDeal = (id) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isFlashDeal: !item.isFlashDeal } : item))
    );
  };

  const toggleTopRated = (id) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isTopRated: !item.isTopRated } : item))
    );
  };

  const resetToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        editProduct,
        deleteProduct,
        toggleStock,
        toggleFeatured,
        toggleTrending,
        toggleFlashDeal,
        toggleTopRated,
        resetToDefault
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
