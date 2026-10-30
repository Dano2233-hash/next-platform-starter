import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load products from localStorage', e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('dano_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  const addProduct = (newProd) => {
    const slug = newProd.slug || newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const productToAdd = {
      ...newProd,
      id: newProd.id || `prod-${Date.now()}`,
      slug,
      rating: newProd.rating || 5.0,
      soldCount: newProd.soldCount || 0,
      stock: Number(newProd.stock) >= 0 ? Number(newProd.stock) : 100,
      price: Number(newProd.price) || 0,
      oldPrice: newProd.oldPrice ? Number(newProd.oldPrice) : null,
      packages: newProd.packages && newProd.packages.length > 0
        ? newProd.packages
        : [{ name: 'Standard Package', price: Number(newProd.price) || 0 }]
    };
    setProducts((prev) => [productToAdd, ...prev]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, ...updatedFields } : prod))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  const updateStock = (id, newStock) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, stock: Math.max(0, newStock) } : prod))
    );
  };

  const resetProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem('dano_products', JSON.stringify(INITIAL_PRODUCTS));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        resetProducts
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
