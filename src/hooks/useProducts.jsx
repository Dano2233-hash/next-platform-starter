import React, { createContext, useContext, useState, useEffect } from 'react';
import INITIAL_PRODUCTS from '../data/products';

const ProductsContext = createContext();

const PRODUCTS_KEY = 'dano_products';
const ORDERS_KEY = 'dano_orders';

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem(PRODUCTS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved products', e);
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem(ORDERS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved orders', e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  const addProduct = (newProductData) => {
    const id = `prod-${Date.now()}`;
    const slug = newProductData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const product = {
      id,
      slug,
      rating: 5.0,
      soldCount: 0,
      stock: newProductData.stock !== undefined ? Number(newProductData.stock) : 100,
      ...newProductData,
      price: Number(newProductData.price),
      oldPrice: newProductData.oldPrice ? Number(newProductData.oldPrice) : null,
    };
    setProducts((prev) => [product, ...prev]);
    return product;
  };

  const editProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updatedFields };
          if (updatedFields.price !== undefined) updated.price = Number(updatedFields.price);
          if (updatedFields.oldPrice !== undefined) updated.oldPrice = updatedFields.oldPrice ? Number(updatedFields.oldPrice) : null;
          if (updatedFields.stock !== undefined) updated.stock = Number(updatedFields.stock);
          return updated;
        }
        return p;
      })
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

  const toggleProductFlag = (id, flagName) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [flagName]: !p[flagName] } : p))
    );
  };

  const addOrder = (orderData) => {
    setOrders((prev) => [orderData, ...prev]);
  };

  const resetToDefaultProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        orders,
        addProduct,
        editProduct,
        deleteProduct,
        updateStock,
        toggleProductFlag,
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

export default useProducts;
