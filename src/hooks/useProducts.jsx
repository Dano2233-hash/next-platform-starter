import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const ProductsContext = createContext();

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
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (err) {
      console.error('Error saving products to Local Storage:', err);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (err) {
      console.error('Error saving orders to Local Storage:', err);
    }
  }, [orders]);

  const addProduct = (newProdData) => {
    const slug = newProdData.slug || newProdData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newProduct = {
      id: `prod-${Date.now()}`,
      slug,
      packages: newProdData.packages || [],
      rating: newProdData.rating || 5.0,
      soldCount: newProdData.soldCount || 0,
      stock: newProdData.stock ?? 100,
      oldPrice: newProdData.oldPrice ? Number(newProdData.oldPrice) : null,
      price: Number(newProdData.price) || 0,
      isFeatured: !!newProdData.isFeatured,
      isTrending: !!newProdData.isTrending,
      isFlashDeal: !!newProdData.isFlashDeal,
      isTopRated: !!newProdData.isTopRated,
      isComingSoon: !!newProdData.isComingSoon,
      tag: newProdData.tag || null,
      ...newProdData
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateStock = (id, newStock) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, stock: Number(newStock) } : p))
    );
  };

  const toggleFlag = (id, flagName) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          return { ...p, [flagName]: !p[flagName] };
        }
        return p;
      })
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
      status: 'Pending'
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const getProductBySlug = (slug) => {
    return products.find(p => p.slug === slug);
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
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
        toggleFlag,
        addOrder,
        getProductBySlug,
        resetProductsToDefault
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
