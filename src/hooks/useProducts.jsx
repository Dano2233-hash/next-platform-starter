import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const PRODUCTS_KEY = 'dano_products';
const ORDERS_KEY = 'dano_orders';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading products from local storage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading orders from local storage:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products:', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders:', e);
    }
  }, [orders]);

  const addProduct = (newProd) => {
    const productToAdd = {
      id: newProd.id || `prod_${Date.now()}`,
      slug: newProd.slug || (newProd.name ? newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `prod-${Date.now()}`),
      name: newProd.name || 'New Product',
      category: newProd.category || 'Mobile Top-Ups',
      platform: newProd.platform || 'Mobile',
      type: newProd.type || 'Top-Up',
      price: Number(newProd.price) || 0,
      oldPrice: newProd.oldPrice ? Number(newProd.oldPrice) : null,
      description: newProd.description || '',
      image: newProd.image || null,
      packages: Array.isArray(newProd.packages) ? newProd.packages : [],
      stock: newProd.stock !== undefined ? Number(newProd.stock) : 100,
      rating: newProd.rating ? Number(newProd.rating) : 5.0,
      soldCount: newProd.soldCount ? Number(newProd.soldCount) : 0,
      tag: newProd.tag || 'New',
      isFeatured: !!newProd.isFeatured,
      isTrending: !!newProd.isTrending,
      isFlashDeal: !!newProd.isFlashDeal,
      isTopRated: !!newProd.isTopRated,
      isComingSoon: !!newProd.isComingSoon,
    };
    setProducts((prev) => [productToAdd, ...prev]);
    return productToAdd;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateStock = (id, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, Number(newStock)) } : p))
    );
  };

  const addOrder = (orderData) => {
    const newOrder = {
      id: orderData.id,
      createdAt: new Date().toISOString(),
      customerName: orderData.customerName,
      phone: orderData.phone,
      city: orderData.city,
      paymentMethod: orderData.paymentMethod,
      orderNote: orderData.orderNote || '',
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      status: 'Pending',
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const resetToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
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
        addOrder,
        resetToDefault,
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
