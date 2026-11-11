import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const ProductsContext = createContext(null);
const PRODUCTS_STORAGE_KEY = 'dano_products';
const ORDERS_STORAGE_KEY = 'dano_orders';

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load products from localStorage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load orders from localStorage:', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products:', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders:', e);
    }
  }, [orders]);

  const addProduct = (newProduct) => {
    const slug = newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const productWithId = {
      ...newProduct,
      id: newProduct.id || `custom-${Date.now()}`,
      slug,
      packages: Array.isArray(newProduct.packages) && newProduct.packages.length > 0
        ? newProduct.packages
        : [{ name: 'Standard Edition', price: Number(newProduct.price) || 0 }],
      price: Number(newProduct.price) || 0,
      oldPrice: Number(newProduct.oldPrice) || 0,
      stock: Number(newProduct.stock) || 0,
      rating: Number(newProduct.rating) || 5.0,
      soldCount: Number(newProduct.soldCount) || 0
    };
    setProducts((prev) => [productWithId, ...prev]);
    return productWithId;
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
    updateProduct(id, { stock: Math.max(0, Number(newStock)) });
  };

  const resetToDefaultProducts = () => {
    setProducts(INITIAL_PRODUCTS);
  };

  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        resetToDefaultProducts,
        addOrder
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

export default useProducts;
