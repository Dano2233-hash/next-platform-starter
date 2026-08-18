import { useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

const PRODUCTS_STORAGE_KEY = 'dano_products';

export function useProducts() {
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
      console.error('Failed to load products from localStorage', e);
    }
    return initialProducts;
  });

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  const addProduct = (newProduct) => {
    const productToAdd = {
      ...newProduct,
      id: newProduct.id || `custom-${Date.now()}`,
      rating: newProduct.rating ? parseFloat(newProduct.rating) : 5.0,
      soldCount: newProduct.soldCount ? parseInt(newProduct.soldCount) : 0,
      stock: newProduct.stock ? parseInt(newProduct.stock) : 100,
      price: parseFloat(newProduct.price),
      oldPrice: newProduct.oldPrice ? parseFloat(newProduct.oldPrice) : null,
      packages: newProduct.packages && newProduct.packages.length > 0
        ? newProduct.packages
        : [{ id: 'std', name: 'Standard Package', price: parseFloat(newProduct.price) }],
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

  const updateStock = (id, newStock) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, stock: Math.max(0, parseInt(newStock) || 0) } : item
      )
    );
  };

  const toggleFlag = (id, flagName) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [flagName]: !item[flagName] } : item
      )
    );
  };

  const resetToDefault = () => {
    setProducts(initialProducts);
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
