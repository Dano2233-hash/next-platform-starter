import { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

export const useProducts = () => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_products');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved products:', e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('dano_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products:', e);
    }
  }, [products]);

  const addProduct = (newProduct) => {
    const productToAdd = {
      ...newProduct,
      id: newProduct.id || `custom-${Date.now()}`,
      slug: newProduct.slug || (newProduct.name ? newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `prod-${Date.now()}`),
      rating: newProduct.rating || 5.0,
      soldCount: newProduct.soldCount || 0,
      stock: Number(newProduct.stock) || 0,
      price: Number(newProduct.price) || 0,
      oldPrice: newProduct.oldPrice ? Number(newProduct.oldPrice) : null,
      packages: newProduct.packages && newProduct.packages.length > 0 ? newProduct.packages : [
        { id: `pkg-${Date.now()}`, name: 'Standard Package', price: Number(newProduct.price) || 0, oldPrice: newProduct.oldPrice ? Number(newProduct.oldPrice) : null }
      ]
    };
    setProducts((prev) => [productToAdd, ...prev]);
    return productToAdd;
  };

  const editProduct = (id, updatedFields) => {
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

  const resetToDefaultProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem('dano_products', JSON.stringify(INITIAL_PRODUCTS));
  };

  return {
    products,
    addProduct,
    editProduct,
    deleteProduct,
    updateStock,
    resetToDefaultProducts,
  };
};
