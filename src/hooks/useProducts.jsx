import { useState, useEffect } from 'react';
import { initialProducts } from '../data/products.js';

const PRODUCTS_KEY = 'dano_products';

export function useProducts() {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem(PRODUCTS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load products from localStorage:', e);
    }
    return initialProducts;
  });

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage:', e);
    }
  }, [products]);

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: newProduct.id || `custom-${Date.now()}`,
      slug: newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: newProduct.rating || 5.0,
      soldCount: newProduct.soldCount || 0
    };
    setProducts((prev) => [productWithId, ...prev]);
    return productWithId;
  };

  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const updateStock = (id, newStock) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stock: Math.max(0, parseInt(newStock) || 0) } : item))
    );
  };

  const resetToDefault = () => {
    setProducts(initialProducts);
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
    } catch (e) {}
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    resetToDefault
  };
}
