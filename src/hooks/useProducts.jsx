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
      return INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: newProduct.id || `custom-${Date.now()}`,
      slug: newProduct.slug || (newProduct.name || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: newProduct.rating || 5.0,
      soldCount: newProduct.soldCount || 0,
      stock: Number(newProduct.stock) || 0,
      price: Number(newProduct.price) || 0,
      packages: newProduct.packages && newProduct.packages.length > 0
        ? newProduct.packages
        : [{ name: 'Standard', price: Number(newProduct.price) || 0 }]
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

  const toggleStock = (id) => {
    setProducts((prev) =>
      prev.map((prod) =>
        prod.id === id ? { ...prod, stock: prod.stock > 0 ? 0 : 50 } : prod
      )
    );
  };

  const toggleFlag = (id, flagName) => {
    setProducts((prev) =>
      prev.map((prod) =>
        prod.id === id ? { ...prod, [flagName]: !prod[flagName] } : prod
      )
    );
  };

  const addOrder = (orderData) => {
    const completeOrder = {
      ...orderData,
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [completeOrder, ...prev]);
    return completeOrder;
  };

  const resetToDefaultProducts = () => {
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
        toggleStock,
        toggleFlag,
        addOrder,
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
