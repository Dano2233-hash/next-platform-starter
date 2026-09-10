import { useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

const STORAGE_KEY = 'dano_products';

export function useProducts() {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load products from localStorage', e);
    }
    return initialProducts;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  const addProduct = (productData) => {
    const id = productData.slug || `prod-${Date.now()}`;
    const newProduct = {
      ...productData,
      id,
      slug: productData.slug || id,
      rating: productData.rating || 5.0,
      soldCount: productData.soldCount || 0,
      stock: Number(productData.stock) || 0,
      price: Number(productData.price) || 0,
      oldPrice: productData.oldPrice ? Number(productData.oldPrice) : null,
      packages: productData.packages || [{ name: 'Standard Package', price: Number(productData.price) || 0 }]
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
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
    setProducts(initialProducts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
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
