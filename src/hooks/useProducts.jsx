import { useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

export const useProducts = () => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_products');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load products from localStorage', e);
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
    const productToAdd = {
      ...newProduct,
      id: newProduct.id || newProduct.slug || `prod-${Date.now()}`,
      soldCount: Number(newProduct.soldCount) || 0,
      rating: Number(newProduct.rating) || 5.0,
      stock: newProduct.stock || 'in_stock'
    };
    setProducts((prev) => [productToAdd, ...prev]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const resetToDefault = () => {
    setProducts(initialProducts);
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefault
  };
};
