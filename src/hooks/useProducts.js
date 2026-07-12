import { useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

export const useProducts = () => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('dano_products');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('dano_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    setProducts(prev => [...prev, { ...product, id: Date.now() }]);
  };

  const editProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateStock = (id, newStock) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: newStock } : p));
  };

  return { products, addProduct, editProduct, deleteProduct, updateStock };
};
