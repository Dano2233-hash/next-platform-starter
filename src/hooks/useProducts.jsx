import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

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
      console.error('Error loading products from LocalStorage:', e);
    }
    return initialProducts;
  });

  useEffect(() => {
    try {
      localStorage.setItem('dano_products', JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products to LocalStorage:', e);
    }
  }, [products]);

  const addProduct = (productData) => {
    const slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newProduct = {
      id: `prod-${Date.now()}`,
      slug,
      rating: 5.0,
      soldCount: 0,
      stock: Number(productData.stock) || 100,
      packages: productData.packages || [],
      isFeatured: Boolean(productData.isFeatured),
      isTrending: Boolean(productData.isTrending),
      isFlashDeal: Boolean(productData.isFlashDeal),
      isTopRated: Boolean(productData.isTopRated),
      ...productData
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
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
    const num = Math.max(0, parseInt(newStock) || 0);
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, stock: num } : prod))
    );
  };

  const toggleFlag = (id, flagName) => {
    setProducts((prev) =>
      prev.map((prod) =>
        prod.id === id ? { ...prod, [flagName]: !prod[flagName] } : prod
      )
    );
  };

  const resetToDefault = () => {
    setProducts(initialProducts);
    localStorage.setItem('dano_products', JSON.stringify(initialProducts));
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
