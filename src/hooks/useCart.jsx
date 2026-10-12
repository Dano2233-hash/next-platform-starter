import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse cart from local storage:', e);
    }
    return [];
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse orders from local storage:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('dano_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to local storage:', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('dano_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to local storage:', e);
    }
  }, [orders]);

  const addToCart = (product, selectedPackage = null, quantity = 1) => {
    const pkgId = selectedPackage ? selectedPackage.id : 'base';
    const itemKey = `${product.id}-${pkgId}`;
    const price = selectedPackage ? selectedPackage.price : product.price;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.itemKey === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            itemKey,
            product,
            selectedPackage,
            price,
            quantity
          }
        ];
      }
    });
  };

  const removeFromCart = (itemKey) => {
    setCartItems((prev) => prev.filter((item) => item.itemKey !== itemKey));
  };

  const updateQuantity = (itemKey, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemKey);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.itemKey === itemKey ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const createOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        orders,
        createOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
