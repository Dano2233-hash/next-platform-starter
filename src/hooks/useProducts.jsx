import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

const ProductsContext = createContext();

const LOCAL_STORAGE_KEY = 'dano_products';

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse saved products:', e);
    }
    return initialProducts;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to local storage:', e);
    }
  }, [products]);

  const addProduct = (newProduct) => {
    const id = newProduct.id || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    const productToAdd = {
      ...newProduct,
      id,
      slug: newProduct.slug || id,
      price: Number(newProduct.price) || 0,
      oldPrice: newProduct.oldPrice ? Number(newProduct.oldPrice) : null,
      stock: Number(newProduct.stock) || 0,
      rating: Number(newProduct.rating) || 5.0,
      soldCount: Number(newProduct.soldCount) || 0,
      packages: newProduct.packages || [],
      isFeatured: Boolean(newProduct.isFeatured),
      isTrending: Boolean(newProduct.isTrending),
      isFlashDeal: Boolean(newProduct.isFlashDeal),
      isTopRated: Boolean(newProduct.isTopRated)
    };
    setProducts((prev) => [productToAdd, ...prev]);
    return productToAdd;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            ...updatedFields,
            price: updatedFields.price !== undefined ? Number(updatedFields.price) : p.price,
            oldPrice: updatedFields.oldPrice !== undefined ? (updatedFields.oldPrice ? Number(updatedFields.oldPrice) : null) : p.oldPrice,
            stock: updatedFields.stock !== undefined ? Number(updatedFields.stock) : p.stock
          };
        }
        return p;
      })
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateStock = (id, newStock) => {
    updateProduct(id, { stock: Number(newStock) });
  };

  const toggleProductFlag = (id, flagName) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return { ...p, [flagName]: !p[flagName] };
        }
        return p;
      })
    );
  };

  const resetToDefaultProducts = () => {
    setProducts(initialProducts);
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
        resetToDefaultProducts
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
