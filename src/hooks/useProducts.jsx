import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const ProductsContext = createContext(null);

const STORAGE_KEY = 'dano_products';

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading dano_products from localStorage', e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Error saving dano_products to localStorage', e);
    }
  }, [products]);

  const addProduct = (newProduct) => {
    const slug =
      newProduct.slug ||
      newProduct.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    const id = newProduct.id || slug || `prod-${Date.now()}`;

    const formattedProduct = {
      id,
      slug,
      name: newProduct.name || 'Untitled Product',
      category: newProduct.category || 'PC Gaming',
      platform: newProduct.platform || 'PC',
      type: newProduct.type || 'Game',
      price: Number(newProduct.price) || 0,
      oldPrice: newProduct.oldPrice ? Number(newProduct.oldPrice) : null,
      description: newProduct.description || '',
      image: newProduct.image || null,
      packages: Array.isArray(newProduct.packages) ? newProduct.packages : [],
      stock: newProduct.stock !== undefined ? Number(newProduct.stock) : 99,
      rating: newProduct.rating ? Number(newProduct.rating) : 4.8,
      soldCount: newProduct.soldCount ? Number(newProduct.soldCount) : 0,
      tag: newProduct.tag || null,
      isFeatured: !!newProduct.isFeatured,
      isTrending: !!newProduct.isTrending,
      isFlashDeal: !!newProduct.isFlashDeal,
      isTopRated: !!newProduct.isTopRated
    };

    setProducts((prev) => [formattedProduct, ...prev]);
    return formattedProduct;
  };

  const editProduct = (productId, updatedFields) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id === productId) {
          return {
            ...prod,
            ...updatedFields,
            price: updatedFields.price !== undefined ? Number(updatedFields.price) : prod.price,
            stock: updatedFields.stock !== undefined ? Number(updatedFields.stock) : prod.stock,
          };
        }
        return prod;
      })
    );
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== productId));
  };

  const updateStock = (productId, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: Number(newStock) } : p))
    );
  };

  const toggleFlag = (productId, flagName) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, [flagName]: !p[flagName] } : p))
    );
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
  };

  const getProductBySlug = (slug) => {
    return products.find((p) => p.slug === slug || p.id === slug);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        editProduct,
        deleteProduct,
        updateStock,
        toggleFlag,
        resetToDefaults,
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
