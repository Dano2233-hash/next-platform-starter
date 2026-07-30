import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('dano_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse products from local storage", e);
      }
    }
    // Seed default products
    return initialProducts;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('dano_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: productData.id || `prod-${Date.now()}`,
      slug: productData.slug || (productData.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      rating: parseFloat(productData.rating) || 5.0,
      soldCount: parseInt(productData.soldCount) || 0,
      stock: parseInt(productData.stock) !== undefined ? parseInt(productData.stock) : 10,
      price: parseInt(productData.price) || 0,
      oldPrice: productData.oldPrice ? parseInt(productData.oldPrice) : null,
      packages: productData.packages || [],
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const editProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id === id) {
          const name = updatedData.name || prod.name;
          const slug = updatedData.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          return {
            ...prod,
            ...updatedData,
            slug,
            price: parseInt(updatedData.price) || 0,
            oldPrice: updatedData.oldPrice ? parseInt(updatedData.oldPrice) : null,
            stock: updatedData.stock !== undefined ? parseInt(updatedData.stock) : prod.stock,
            rating: parseFloat(updatedData.rating) || prod.rating,
            soldCount: parseInt(updatedData.soldCount) || prod.soldCount,
          };
        }
        return prod;
      })
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  const updateStock = (id, newStock) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, stock: Math.max(0, parseInt(newStock)) } : prod))
    );
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        editProduct,
        deleteProduct,
        updateStock,
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
