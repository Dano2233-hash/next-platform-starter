import { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const STORAGE_KEY = 'dano_products';

export function useProducts() {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse products from local storage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to local storage:', e);
    }
  }, [products]);

  const addProduct = (newProduct) => {
    const productToAdd = {
      ...newProduct,
      id: newProduct.id || newProduct.slug || `prod-${Date.now()}`,
      slug: newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: newProduct.rating || 5.0,
      soldCount: newProduct.soldCount || 0,
      stock: parseInt(newProduct.stock, 10) || 0,
      price: parseInt(newProduct.price, 10) || 0,
      oldPrice: newProduct.oldPrice ? parseInt(newProduct.oldPrice, 10) : null,
      packages: newProduct.packages && newProduct.packages.length > 0 ? newProduct.packages : [{ name: 'Standard Edition', price: parseInt(newProduct.price, 10) || 0 }],
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

  const updateStock = (id, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, parseInt(newStock, 10) || 0) } : p))
    );
  };

  const toggleFlag = (id, flagName) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [flagName]: !p[flagName] } : p))
    );
  };

  const resetToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    toggleFlag,
    resetToDefault,
  };
}
