import { useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

export function useProducts() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('dano_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse dano_products from localstorage", e);
      }
    }
    return initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('dano_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    setProducts((prev) => [...prev, product]);
  };

  const editProduct = (id, updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateStock = (id, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: newStock } : p))
    );
  };

  return {
    products,
    addProduct,
    editProduct,
    deleteProduct,
    updateStock,
    setProducts
  };
}
