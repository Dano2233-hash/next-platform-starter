import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const ProductsContext = createContext(null);

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

  const addProduct = (newProduct) => {
    const slug = newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const id = newProduct.id || slug || `prod-${Date.now()}`;
    const product = {
      id,
      slug,
      stock: Number(newProduct.stock ?? 100),
      soldCount: Number(newProduct.soldCount ?? 0),
      rating: Number(newProduct.rating ?? 5.0),
      isFeatured: Boolean(newProduct.isFeatured),
      isTrending: Boolean(newProduct.isTrending),
      isFlashDeal: Boolean(newProduct.isFlashDeal),
      isTopRated: Boolean(newProduct.isTopRated),
      packages: newProduct.packages || [{ id: `${id}-std`, name: 'Standard Package', price: Number(newProduct.price || 0) }],
      ...newProduct
    };

    setProducts((prev) => [product, ...prev]);
    return product;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateStock = (id, stock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Number(stock) } : p))
    );
  };

  const toggleFlag = (id, flagName) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [flagName]: !p[flagName] } : p))
    );
  };

  const resetToDefault = () => {
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
        toggleFlag,
        resetToDefault
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
