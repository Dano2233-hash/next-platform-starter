import { useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

export function useProducts() {
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem('dano_products');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing stored products, resetting to default', e);
      }
    }
    // Default fallback
    localStorage.setItem('dano_products', JSON.stringify(initialProducts));
    return initialProducts;
  });

  const saveProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem('dano_products', JSON.stringify(updatedProducts));
  };

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: product.id || `custom-${Date.now()}`,
      slug: product.slug || (product.name ? product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `custom-${Date.now()}`),
      soldCount: Number(product.soldCount) || 0,
      rating: Number(product.rating) || 5.0,
      stock: product.stock !== undefined ? product.stock : 100
    };
    const updated = [newProduct, ...products];
    saveProducts(updated);
    return newProduct;
  };

  const updateProduct = (updatedProduct) => {
    const updated = products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
    saveProducts(updated);
  };

  const deleteProduct = (productId) => {
    const updated = products.filter((p) => p.id !== productId);
    saveProducts(updated);
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefault: () => saveProducts(initialProducts)
  };
}
