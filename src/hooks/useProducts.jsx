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
      console.error('Failed to parse products from local storage', e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('dano_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to local storage', e);
    }
  }, [products]);

  const addProduct = (newProd) => {
    const id = newProd.id || `prod-${Date.now()}`;
    const slug = newProd.slug || newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const productToAdd = {
      ...newProd,
      id,
      slug,
      price: Number(newProd.price) || 0,
      oldPrice: Number(newProd.oldPrice) || 0,
      stock: Number(newProd.stock) || 0,
      rating: Number(newProd.rating) || 5.0,
      soldCount: Number(newProd.soldCount) || 0,
      packages: newProd.packages || [{ name: 'Standard Package', price: Number(newProd.price) || 0 }],
      isFeatured: !!newProd.isFeatured,
      isTrending: !!newProd.isTrending,
      isFlashDeal: !!newProd.isFlashDeal,
      isTopRated: !!newProd.isTopRated
    };

    setProducts((prev) => [productToAdd, ...prev]);
    return productToAdd;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateStock = (id, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, Number(newStock) || 0) } : p))
    );
  };

  const toggleProductFlag = (id, flagName) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [flagName]: !p[flagName] } : p))
    );
  };

  const resetProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem('dano_products', JSON.stringify(INITIAL_PRODUCTS));
  };

  const getProductBySlug = (slug) => {
    return products.find((p) => p.slug === slug || p.id === slug);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        toggleProductFlag,
        resetProducts,
        getProductBySlug
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
