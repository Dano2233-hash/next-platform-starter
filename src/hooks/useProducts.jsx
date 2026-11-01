import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const ProductsContext = createContext(null);

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
      console.error('Error loading products from localStorage', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
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

  const addProduct = (productData) => {
    const slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newProduct = {
      ...productData,
      id: productData.id || `prod-${Date.now()}`,
      slug: productData.slug || slug,
      price: Number(productData.price) || 0,
      oldPrice: Number(productData.oldPrice) || 0,
      stock: Number(productData.stock) || 0,
      rating: Number(productData.rating) || 5.0,
      soldCount: Number(productData.soldCount) || 0,
      packages: Array.isArray(productData.packages) ? productData.packages : []
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            ...updatedFields,
            price: updatedFields.price !== undefined ? Number(updatedFields.price) : item.price,
            oldPrice: updatedFields.oldPrice !== undefined ? Number(updatedFields.oldPrice) : item.oldPrice,
            stock: updatedFields.stock !== undefined ? Number(updatedFields.stock) : item.stock
          };
        }
        return item;
      })
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleStock = (id) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, stock: item.stock > 0 ? 0 : 50 };
        }
        return item;
      })
    );
  };

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem('dano_products', JSON.stringify(INITIAL_PRODUCTS));
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
        addOrder,
        resetToDefaults
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
