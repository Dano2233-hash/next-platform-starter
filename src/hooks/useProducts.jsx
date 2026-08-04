import { useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

export default function useProducts() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('dano_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialProducts;
      }
    }
    return initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('dano_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const editProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateStock = (productId, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: newStock } : p))
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
