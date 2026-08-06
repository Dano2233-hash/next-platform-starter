import { useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

export function useProducts() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('dano_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing dano_products, resetting to initial', e);
      }
    }
    return initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('dano_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct) => {
    setProducts((prev) => {
      const updated = [...prev, { ...newProduct, id: newProduct.id || Date.now().toString() }];
      return updated;
    });
  };

  const editProduct = (id, updatedFields) => {
    setProducts((prev) => {
      return prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    });
  };

  const deleteProduct = (id) => {
    setProducts((prev) => {
      return prev.filter((p) => p.id !== id);
    });
  };

  const changeStock = (id, newStock) => {
    setProducts((prev) => {
      return prev.map((p) => (p.id === id ? { ...p, stock: parseInt(newStock) || 0 } : p));
    });
  };

  return {
    products,
    addProduct,
    editProduct,
    deleteProduct,
    changeStock,
  };
}
