import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const ProductsContext = createContext();

const PRODUCTS_STORAGE_KEY = 'dano_products';
const ORDERS_STORAGE_KEY = 'dano_orders';

export function ProductsProvider({ children }) {
  // Initialize products from Local Storage or fallback to INITIAL_PRODUCTS
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
      console.error('Failed reading products from localStorage', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Initialize orders
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed reading orders from localStorage', e);
    }
    return [];
  });

  // Save products on change
  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed saving products to localStorage', e);
    }
  }, [products]);

  // Save orders on change
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed saving orders to localStorage', e);
    }
  }, [orders]);

  // Add Product
  const addProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: newProduct.id || `custom-${Date.now()}`,
      slug: newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      stock: Number(newProduct.stock) || 0,
      price: Number(newProduct.price) || 0,
      oldPrice: newProduct.oldPrice ? Number(newProduct.oldPrice) : null,
      soldCount: Number(newProduct.soldCount) || 0,
      rating: Number(newProduct.rating) || 5.0,
      packages: newProduct.packages && newProduct.packages.length > 0 ? newProduct.packages : [
        { id: 'default', name: 'Standard Edition', price: Number(newProduct.price) || 0 }
      ]
    };
    setProducts((prev) => [product, ...prev]);
    return product;
  };

  // Update Product
  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, ...updatedFields } : prod))
    );
  };

  // Delete Product
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  // Toggle Stock availability
  const toggleStock = (id) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id === id) {
          const newStock = prod.stock > 0 ? 0 : 50;
          return { ...prod, stock: newStock };
        }
        return prod;
      })
    );
  };

  // Toggle feature flags (isFeatured, isTrending, isFlashDeal, isTopRated)
  const toggleFeature = (id, fieldName) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, [fieldName]: !prod[fieldName] } : prod))
    );
  };

  // Reset to default initial products catalog
  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
  };

  // Add a new completed order
  const createOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [newOrder, ...prev]);

    // Update soldCount & decrease stock in products if desired
    setProducts((prev) =>
      prev.map((prod) => {
        const matchingItem = orderData.items.find((item) => item.productId === prod.id);
        if (matchingItem) {
          const newStock = Math.max(0, prod.stock - matchingItem.quantity);
          const newSoldCount = (prod.soldCount || 0) + matchingItem.quantity;
          return { ...prod, stock: newStock, soldCount: newSoldCount };
        }
        return prod;
      })
    );

    return newOrder;
  };

  // Helper stats
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.totalAmount) || 0), 0);

  return (
    <ProductsContext.Provider
      value={{
        products,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStock,
        toggleFeature,
        resetToDefaults,
        createOrder,
        totalProducts,
        totalOrders,
        totalRevenue
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

export default useProducts;
