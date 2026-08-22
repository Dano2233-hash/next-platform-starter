import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading products from local storage:', e);
    }
    return initialProducts;
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('dano_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('dano_orders', JSON.stringify(orders));
  }, [orders]);

  const addProduct = (newProduct) => {
    const id = newProduct.id || newProduct.slug || `prod-${Date.now()}`;
    const slug = newProduct.slug || id.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const productToAdd = {
      ...newProduct,
      id,
      slug,
      stock: Number(newProduct.stock) || 100,
      soldCount: Number(newProduct.soldCount) || 0,
      rating: Number(newProduct.rating) || 5.0,
      packages: newProduct.packages && newProduct.packages.length > 0 ? newProduct.packages : [{ id: 'p1', name: 'Standard Package', price: Number(newProduct.price) }],
      price: Number(newProduct.price) || 0,
      oldPrice: newProduct.oldPrice ? Number(newProduct.oldPrice) : null,
    };

    setProducts((prev) => [productToAdd, ...prev]);
    return productToAdd;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const resetToDefault = () => {
    setProducts(initialProducts);
    localStorage.setItem('dano_products', JSON.stringify(initialProducts));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        resetToDefault,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
