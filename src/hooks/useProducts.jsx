import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem('dano_products');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading products from LocalStorage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('dano_products', JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products to LocalStorage:', e);
    }
  }, [products]);

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: productData.id || `prod_${Date.now()}`,
      slug: productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      rating: productData.rating || 5.0,
      soldCount: productData.soldCount || 0,
      stock: Number(productData.stock) || 100,
      price: Number(productData.price) || 0,
      oldPrice: productData.oldPrice ? Number(productData.oldPrice) : null,
      packages: productData.packages || [{ name: 'Standard', price: Number(productData.price) || 0 }]
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, ...updatedData } : prod))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  const toggleFeatured = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    );
  };

  const toggleTrending = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isTrending: !p.isTrending } : p))
    );
  };

  const toggleFlashDeal = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFlashDeal: !p.isFlashDeal } : p))
    );
  };

  const toggleTopRated = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isTopRated: !p.isTopRated } : p))
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
        toggleFeatured,
        toggleTrending,
        toggleFlashDeal,
        toggleTopRated,
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
