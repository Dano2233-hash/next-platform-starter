import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error reading dano_products from local storage', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error reading dano_orders from local storage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dano_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to persist dano_products', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('dano_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to persist dano_orders', e);
    }
  }, [orders]);

  const addProduct = (newProduct) => {
    const slug = newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const productToAdd = {
      ...newProduct,
      id: newProduct.id || `product-${Date.now()}`,
      slug: slug,
      price: Number(newProduct.price) || 0,
      oldPrice: newProduct.oldPrice ? Number(newProduct.oldPrice) : null,
      packages: newProduct.packages && newProduct.packages.length > 0 ? newProduct.packages : [{ name: 'Standard', price: Number(newProduct.price) || 0 }],
      stock: Number(newProduct.stock) || 0,
      rating: Number(newProduct.rating) || 5.0,
      soldCount: Number(newProduct.soldCount) || 0,
      isFeatured: Boolean(newProduct.isFeatured),
      isTrending: Boolean(newProduct.isTrending),
      isFlashDeal: Boolean(newProduct.isFlashDeal),
      isTopRated: Boolean(newProduct.isTopRated)
    };
    setProducts(prev => [productToAdd, ...prev]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, ...updatedFields };
      }
      return p;
    }));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateStock = (id, newStock) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, stock: Math.max(0, newStock) };
      }
      return p;
    }));
  };

  const addOrder = (order) => {
    setOrders(prev => [order, ...prev]);
  };

  return (
    <ProductsContext.Provider value={{
      products,
      orders,
      addProduct,
      updateProduct,
      deleteProduct,
      updateStock,
      addOrder
    }}>
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
