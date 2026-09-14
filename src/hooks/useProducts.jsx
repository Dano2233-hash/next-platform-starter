import React, { useState, useEffect, createContext, useContext } from 'react';
import { INITIAL_PRODUCTS } from '../data/products.js';

const ProductsContext = createContext();

const STORAGE_KEY = 'dano_products';

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading products from LocalStorage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products to LocalStorage:', e);
    }
  }, [products]);

  const addProduct = (newProduct) => {
    const created = {
      ...newProduct,
      id: `prod-${Date.now()}`,
      slug: newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      soldCount: Number(newProduct.soldCount || 0),
      rating: Number(newProduct.rating || 5.0),
      stock: Number(newProduct.stock || 50),
      price: Number(newProduct.price || 0),
      oldPrice: newProduct.oldPrice ? Number(newProduct.oldPrice) : null,
      packages: newProduct.packages && newProduct.packages.length > 0
        ? newProduct.packages
        : [{ id: 'pkg-default', name: 'Standard Edition', price: Number(newProduct.price || 0) }],
      isFeatured: Boolean(newProduct.isFeatured),
      isTrending: Boolean(newProduct.isTrending),
      isFlashDeal: Boolean(newProduct.isFlashDeal),
      isTopRated: Boolean(newProduct.isTopRated)
    };
    setProducts(prev => [created, ...prev]);
    return created;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          ...updatedFields,
          price: updatedFields.price !== undefined ? Number(updatedFields.price) : p.price,
          oldPrice: updatedFields.oldPrice !== undefined ? (updatedFields.oldPrice ? Number(updatedFields.oldPrice) : null) : p.oldPrice,
          stock: updatedFields.stock !== undefined ? Number(updatedFields.stock) : p.stock
        };
      }
      return p;
    }));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const toggleStock = (id) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, stock: p.stock > 0 ? 0 : 50 };
      }
      return p;
    }));
  };

  const resetToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
  };

  return (
    <ProductsContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      toggleStock,
      resetToDefault
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
