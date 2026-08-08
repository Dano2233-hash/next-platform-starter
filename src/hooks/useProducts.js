import { useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

export function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('dano_products');
    if (stored) {
      try {
        setProducts(JSON.parse(stored));
      } catch (e) {
        setProducts(initialProducts);
        localStorage.setItem('dano_products', JSON.stringify(initialProducts));
      }
    } else {
      setProducts(initialProducts);
      localStorage.setItem('dano_products', JSON.stringify(initialProducts));
    }
  }, []);

  const saveProducts = (updated) => {
    setProducts(updated);
    localStorage.setItem('dano_products', JSON.stringify(updated));
  };

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: product.id || `product-${Date.now()}`,
      slug: product.slug || (product.name ? product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `product-${Date.now()}`),
      rating: parseFloat(product.rating) || 5.0,
      soldCount: parseInt(product.soldCount) || 0,
    };
    const updated = [...products, newProduct];
    saveProducts(updated);
    return newProduct;
  };

  const editProduct = (id, updatedFields) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        return { ...p, ...updatedFields };
      }
      return p;
    });
    saveProducts(updated);
  };

  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
  };

  const changeStock = (id, newStock) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        return { ...p, stock: Math.max(0, parseInt(newStock) || 0) };
      }
      return p;
    });
    saveProducts(updated);
  };

  return {
    products,
    addProduct,
    editProduct,
    deleteProduct,
    changeStock
  };
}
