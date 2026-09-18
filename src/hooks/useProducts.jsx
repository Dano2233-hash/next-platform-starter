import { useState, useEffect } from 'react';
import { initialProducts } from '../data/products.js';

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
    return initialProducts;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to local storage:', e);
    }
  }, [products]);

  const addProduct = (newProd) => {
    const id = newProd.slug || newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const productToAdd = {
      ...newProd,
      id: id + '-' + Date.now(),
      slug: id,
      rating: newProd.rating || 5.0,
      soldCount: newProd.soldCount || 0,
      stock: Number(newProd.stock) || 100,
      price: Number(newProd.price) || 0,
      oldPrice: newProd.oldPrice ? Number(newProd.oldPrice) : null,
      packages: newProd.packages || [{ name: 'Standard', price: Number(newProd.price) || 0 }]
    };
    setProducts((prev) => [productToAdd, ...prev]);
    return productToAdd;
  };

  const updateProduct = (updatedProd) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProd.id ? { ...p, ...updatedProd } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetProductsToDefault = () => {
    setProducts(initialProducts);
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault
  };
}
