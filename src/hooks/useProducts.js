import { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const STORAGE_KEY = 'dano_products';

export function useProducts() {
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

  const addProduct = (newProduct) => {
    const id = newProduct.id || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const slug = newProduct.slug || id;
    const productToAdd = {
      ...newProduct,
      id,
      slug,
      stock: Number(newProduct.stock) || 0,
      price: Number(newProduct.price) || 0,
      oldPrice: Number(newProduct.oldPrice) || 0,
      rating: Number(newProduct.rating) || 5.0,
      soldCount: Number(newProduct.soldCount) || 0,
      packages: newProduct.packages || [{ name: 'Standard', price: Number(newProduct.price) || 0 }]
    };

    setProducts(prev => [productToAdd, ...prev]);
    return productToAdd;
  };

  const updateProduct = (updatedProduct) => {
    setProducts(prev =>
      prev.map(item => (item.id === updatedProduct.id ? { ...item, ...updatedProduct } : item))
    );
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(item => item.id !== id));
  };

  const updateStock = (id, newStock) => {
    setProducts(prev =>
      prev.map(item => (item.id === id ? { ...item, stock: Number(newStock) } : item))
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
    resetToDefault
  };
}
