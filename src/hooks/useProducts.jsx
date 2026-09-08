import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading products from localStorage', e);
    }
    return initialProducts;
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error loading orders from localStorage', e);
    }
    return [];
  });

  // Sync products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dano_products', JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products to localStorage', e);
    }
  }, [products]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dano_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders to localStorage', e);
    }
  }, [orders]);

  const addProduct = (newProduct) => {
    const slug = newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const productToAdd = {
      id: `prod_${Date.now()}`,
      soldCount: 0,
      rating: 5.0,
      packages: newProduct.packages || [],
      stock: Number(newProduct.stock) || 0,
      price: Number(newProduct.price) || 0,
      oldPrice: newProduct.oldPrice ? Number(newProduct.oldPrice) : null,
      isFeatured: !!newProduct.isFeatured,
      isTrending: !!newProduct.isTrending,
      isFlashDeal: !!newProduct.isFlashDeal,
      isTopRated: !!newProduct.isTopRated,
      ...newProduct,
      slug
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
      phoneNumber: orderData.phoneNumber,
      city: orderData.city,
      paymentMethod: orderData.paymentMethod,
      orderNote: orderData.orderNote || '',
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      status: 'Pending'
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update stock and sold count for ordered products
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const itemInOrder = orderData.items.find((item) => item.productId === p.id);
        if (itemInOrder) {
          const newStock = Math.max(0, p.stock - itemInOrder.quantity);
          const newSoldCount = (p.soldCount || 0) + itemInOrder.quantity;
          return { ...p, stock: newStock, soldCount: newSoldCount };
        }
        return p;
      })
    );

    return newOrder;
  };

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

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
        totalProducts,
        totalOrders,
        totalRevenue
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
