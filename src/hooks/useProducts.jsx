import { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const STORAGE_KEY = 'dano_products';

export function useProducts() {
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
    const formatted = {
      ...newProduct,
      id: newProduct.id || `custom-${Date.now()}`,
      slug: newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: Number(newProduct.rating) || 5.0,
      soldCount: Number(newProduct.soldCount) || 0,
      stock: Number(newProduct.stock) || 100,
      price: Number(newProduct.price) || 0,
      oldPrice: newProduct.oldPrice ? Number(newProduct.oldPrice) : null,
      packages: newProduct.packages || [{ name: 'Standard Package', price: Number(newProduct.price) || 0 }],
    };
    setProducts((prev) => [formatted, ...prev]);
    return formatted;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const updateStock = (id, newStock) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stock: Number(newStock) } : item))
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
    resetToDefault,
  };
}
