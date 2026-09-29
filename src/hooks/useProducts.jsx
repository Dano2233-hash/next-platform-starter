import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  // Products state backed by localStorage 'dano_products'
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('dano_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse dano_products:', e);
      }
    }
    return initialProducts;
  });

  // Orders state backed by localStorage 'dano_orders'
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('dano_orders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error('Failed to parse dano_orders:', e);
      }
    }
    return [];
  });

  // Sync products to Local Storage
  useEffect(() => {
    localStorage.setItem('dano_products', JSON.stringify(products));
  }, [products]);

  // Sync orders to Local Storage
  useEffect(() => {
    localStorage.setItem('dano_orders', JSON.stringify(orders));
  }, [orders]);

  const addProduct = (newProduct) => {
    const productToAdd = {
      ...newProduct,
      id: newProduct.id || newProduct.slug || `prod-${Date.now()}`,
      slug: newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: newProduct.rating || 5.0,
      soldCount: newProduct.soldCount || 0,
      stock: Number(newProduct.stock) || 100,
      price: Number(newProduct.price) || 0,
      oldPrice: newProduct.oldPrice ? Number(newProduct.oldPrice) : null,
      packages: newProduct.packages && newProduct.packages.length > 0
        ? newProduct.packages
        : [{ id: 'std', name: newProduct.name, price: Number(newProduct.price) || 0 }],
    };
    setProducts((prev) => [productToAdd, ...prev]);
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
      prev.map((p) => (p.id === id ? { ...p, stock: Number(newStock) } : p))
    );
  };

  const getProductBySlug = (slug) => {
    return products.find((p) => p.slug === slug);
  };

  const getProductById = (id) => {
    return products.find((p) => p.id === id);
  };

  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const resetProductsToDefault = () => {
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
        updateStock,
        getProductBySlug,
        getProductById,
        addOrder,
        resetProductsToDefault,
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
