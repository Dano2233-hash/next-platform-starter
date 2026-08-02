import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, PRODUCTS_KEY, ORDERS_KEY } from '../data/products';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem(PRODUCTS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse saved products, reset to default', err);
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem(ORDERS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  const addProduct = (productData) => {
    setProducts((prev) => [productData, ...prev]);
  };

  const editProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateStock = (id, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: parseInt(newStock, 10) } : p))
    );
  };

  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
    // Deduct stock for ordered quantities safely
    order.items.forEach((item) => {
      setProducts((prevProducts) =>
        prevProducts.map((p) => {
          if (p.id === item.product.id) {
            const currentStock = p.stock || 0;
            const updatedStock = Math.max(0, currentStock - item.quantity);
            return { ...p, stock: updatedStock, soldCount: (p.soldCount || 0) + item.quantity };
          }
          return p;
        })
      );
    });
  };

  const getTotalRevenue = () => {
    return orders.reduce((sum, order) => sum + order.total, 0);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        orders,
        addProduct,
        editProduct,
        deleteProduct,
        updateStock,
        addOrder,
        getTotalRevenue,
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
