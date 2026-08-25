import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const ProductsContext = createContext();

const LOCAL_STORAGE_KEY = 'dano_products';

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Error reading products from Local Storage:', err);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
    } catch (err) {
      console.error('Error saving products to Local Storage:', err);
    }
  }, [products]);

  const addProduct = (newProdData) => {
    const newId = newProdData.slug || newProdData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProduct = {
      id: newId,
      slug: newId,
      stock: 100,
      rating: 5.0,
      soldCount: 0,
      isFeatured: false,
      isTrending: false,
      isFlashDeal: false,
      isTopRated: false,
      packages: [],
      ...newProdData,
      price: Number(newProdData.price) || 0,
      oldPrice: Number(newProdData.oldPrice) || 0
    };

    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const editProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            ...updatedData,
            price: Number(updatedData.price ?? p.price),
            oldPrice: Number(updatedData.oldPrice ?? p.oldPrice)
          };
        }
        return p;
      })
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleStock = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: p.stock > 0 ? 0 : 100 } : p))
    );
  };

  const toggleFlag = (id, flagName) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [flagName]: !p[flagName] } : p))
    );
  };

  const getProductById = (idOrSlug) => {
    return products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
  };

  const resetToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        editProduct,
        deleteProduct,
        toggleStock,
        toggleFlag,
        getProductById,
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
