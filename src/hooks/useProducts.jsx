import { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const PRODUCTS_KEY = 'dano_products';
const ORDERS_KEY = 'dano_orders';

export function useProducts() {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading products from local storage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading orders from local storage:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products:', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders:', e);
    }
  }, [orders]);

  const addProduct = (productData) => {
    const id = productData.id || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const slug = productData.slug || id;
    const newProduct = {
      ...productData,
      id,
      slug,
      rating: Number(productData.rating) || 5.0,
      soldCount: Number(productData.soldCount) || 0,
      packages: productData.packages && productData.packages.length > 0
        ? productData.packages
        : [{ id: `${id}-pkg`, name: 'Standard Package', price: Number(productData.price) || 0, oldPrice: productData.oldPrice ? Number(productData.oldPrice) : null }]
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, ...updatedFields } : prod))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const resetToDefaultProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
  };

  return {
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    addOrder,
    resetToDefaultProducts
  };
}
