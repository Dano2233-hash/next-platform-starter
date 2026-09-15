import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const savedProducts = localStorage.getItem('dano_products');
      return savedProducts ? JSON.parse(savedProducts) : INITIAL_PRODUCTS;
    } catch (error) {
      console.error('Failed to load products from LocalStorage:', error);
      return INITIAL_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem('dano_orders');
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch (error) {
      console.error('Failed to load orders from LocalStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dano_products', JSON.stringify(products));
    } catch (error) {
      console.error('Failed to save products to LocalStorage:', error);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('dano_orders', JSON.stringify(orders));
    } catch (error) {
      console.error('Failed to save orders to LocalStorage:', error);
    }
  }, [orders]);

  const addProduct = (newProductData) => {
    const slug = newProductData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const productToAdd = {
      ...newProductData,
      id: newProductData.id || `prod-${Date.now()}`,
      slug: slug || `prod-${Date.now()}`,
      rating: parseFloat(newProductData.rating) || 5.0,
      soldCount: parseInt(newProductData.soldCount) || 0,
      stock: parseInt(newProductData.stock) || 0,
      price: parseFloat(newProductData.price) || 0,
      oldPrice: newProductData.oldPrice ? parseFloat(newProductData.oldPrice) : null,
      packages: newProductData.packages && newProductData.packages.length > 0
        ? newProductData.packages
        : [{ name: 'Standard', price: parseFloat(newProductData.price) || 0 }]
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
    const createdOrder = {
      ...orderData,
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [createdOrder, ...prev]);
    return createdOrder;
  };

  const getProductById = (id) => products.find((p) => p.id === id || p.slug === id);

  return (
    <ProductsContext.Provider
      value={{
        products,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        getProductById
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
