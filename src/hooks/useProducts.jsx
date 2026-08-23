import { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

export function useProducts() {
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
      console.error('Error loading products from local storage:', e);
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
      console.error('Error loading orders from local storage:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('dano_products', JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products:', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('dano_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders:', e);
    }
  }, [orders]);

  const addProduct = (newProduct) => {
    const formatted = {
      ...newProduct,
      id: newProduct.id || `prod-${Date.now()}`,
      slug: newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: newProduct.rating ? parseFloat(newProduct.rating) : 5.0,
      soldCount: newProduct.soldCount ? parseInt(newProduct.soldCount) : 0,
      stock: newProduct.stock !== undefined ? parseInt(newProduct.stock) : 50,
      price: parseFloat(newProduct.price) || 0,
      oldPrice: newProduct.oldPrice ? parseFloat(newProduct.oldPrice) : null,
      packages: newProduct.packages || [{ id: 'p-default', name: 'Standard Pack', price: parseFloat(newProduct.price) || 0 }],
      isFeatured: !!newProduct.isFeatured,
      isTrending: !!newProduct.isTrending,
      isFlashDeal: !!newProduct.isFlashDeal,
      isTopRated: !!newProduct.isTopRated,
    };
    setProducts((prev) => [formatted, ...prev]);
    return formatted;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const updateStock = (id, newStock) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stock: parseInt(newStock) } : item))
    );
  };

  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

  return {
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    addOrder,
    totalProducts,
    totalOrders,
    totalRevenue
  };
}
