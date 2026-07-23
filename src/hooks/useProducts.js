import { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const STORAGE_KEY = 'dano_products';

// Simple global observer system to keep multiple hooks synced across components
const listeners = new Set();
const notify = () => listeners.forEach(listener => listener());

export function useProducts() {
  const [products, setProducts] = useState(() => {
    if (typeof window === 'undefined') return INITIAL_PRODUCTS;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    try {
      return JSON.parse(stored);
    } catch (e) {
      return INITIAL_PRODUCTS;
    }
  });

  useEffect(() => {
    const handleSync = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setProducts(JSON.parse(stored));
        } catch (e) {}
      }
    };
    listeners.add(handleSync);
    return () => {
      listeners.delete(handleSync);
    };
  }, []);

  const saveToStorage = (updated) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setProducts(updated);
    notify();
  };

  const addProduct = (newProduct) => {
    // Generate simple unique ID if not present
    const productWithId = {
      ...newProduct,
      id: newProduct.id || `custom-${Date.now()}`,
      slug: newProduct.slug || (newProduct.name ? newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `custom-${Date.now()}`),
      rating: Number(newProduct.rating) || 5.0,
      soldCount: Number(newProduct.soldCount) || 0,
      stock: Number(newProduct.stock) || 100,
      isFeatured: !!newProduct.isFeatured,
      isTrending: !!newProduct.isTrending,
      isFlashDeal: !!newProduct.isFlashDeal,
      isTopRated: !!newProduct.isTopRated
    };

    const updated = [productWithId, ...products];
    saveToStorage(updated);
    return productWithId;
  };

  const editProduct = (id, updatedFields) => {
    const updated = products.map(p => {
      if (p.id === id) {
        return {
          ...p,
          ...updatedFields,
          // Ensure proper type conversions for numeric attributes
          price: updatedFields.price !== undefined ? Number(updatedFields.price) : p.price,
          oldPrice: updatedFields.oldPrice !== undefined ? (updatedFields.oldPrice ? Number(updatedFields.oldPrice) : null) : p.oldPrice,
          stock: updatedFields.stock !== undefined ? Number(updatedFields.stock) : p.stock,
          soldCount: updatedFields.soldCount !== undefined ? Number(updatedFields.soldCount) : p.soldCount,
          rating: updatedFields.rating !== undefined ? Number(updatedFields.rating) : p.rating
        };
      }
      return p;
    });
    saveToStorage(updated);
  };

  const deleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id);
    saveToStorage(updated);
  };

  const changeStock = (id, newStock) => {
    editProduct(id, { stock: Number(newStock) });
  };

  const resetProducts = () => {
    saveToStorage(INITIAL_PRODUCTS);
  };

  return {
    products,
    addProduct,
    editProduct,
    deleteProduct,
    changeStock,
    resetProducts
  };
}
