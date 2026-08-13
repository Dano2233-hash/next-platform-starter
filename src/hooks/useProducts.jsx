import { useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

export function useProducts() {
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
    setProducts((prev) => {
      const generatedId = newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const finalProduct = {
        ...newProduct,
        id: generatedId,
        slug: generatedId,
        rating: Number(newProduct.rating) || 5.0,
        soldCount: Number(newProduct.soldCount) || 0,
        stock: Number(newProduct.stock),
        price: Number(newProduct.price),
        oldPrice: newProduct.oldPrice ? Number(newProduct.oldPrice) : null,
      };
      return [finalProduct, ...prev];
    });
  };

  const editProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateStock = (id, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Number(newStock) } : p))
    );
  };

  return {
    products,
    addProduct,
    editProduct,
    deleteProduct,
    updateStock,
  };
}
