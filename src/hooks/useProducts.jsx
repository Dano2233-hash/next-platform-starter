import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
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
      console.error('Failed to load products from localStorage', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_orders');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load orders from localStorage', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('dano_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('dano_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  const addProduct = (newProd) => {
    const id = newProd.slug || newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const productToAdd = {
      id: id + '-' + Date.now().toString().slice(-4),
      slug: id,
      stock: 100,
      rating: 5.0,
      soldCount: 0,
      packages: [{ name: 'Standard Package', price: newProd.price }],
      ...newProd
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

  const addOrder = (orderData) => {
    const order = {
      id: orderData.id,
      customerName: orderData.customerName,
      phone: orderData.phone,
      city: orderData.city,
      paymentMethod: orderData.paymentMethod,
      orderNote: orderData.orderNote || '',
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      createdAt: new Date().toISOString(),
      status: 'Pending'
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
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
