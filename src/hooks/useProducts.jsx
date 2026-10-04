import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('dano_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved products:', e);
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('dano_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved orders:', e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('dano_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('dano_orders', JSON.stringify(orders));
  }, [orders]);

  const addProduct = (newProduct) => {
    const id = newProduct.slug || `product-${Date.now()}`;
    const productToAdd = {
      ...newProduct,
      id,
      slug: id,
      soldCount: newProduct.soldCount || 0,
      rating: newProduct.rating || 5.0,
      stock: parseInt(newProduct.stock) || 0,
      price: parseFloat(newProduct.price) || 0,
      oldPrice: newProduct.oldPrice ? parseFloat(newProduct.oldPrice) : null,
      packages: newProduct.packages || [],
    };
    setProducts((prev) => [productToAdd, ...prev]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, ...updatedFields } : prod))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  const updateStock = (id, stock) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, stock: parseInt(stock) || 0 } : prod))
    );
  };

  const addOrder = (order) => {
    const orderWithDate = {
      ...order,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [orderWithDate, ...prev]);
    return orderWithDate;
  };

  const resetToDefaultProducts = () => {
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
        updateStock,
        addOrder,
        resetToDefaultProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
