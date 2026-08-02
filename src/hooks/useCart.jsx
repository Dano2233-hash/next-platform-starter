import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('dano_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('dano_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, packageName, packagePrice, qty = 1) => {
    setCart((prevCart) => {
      // Find matching item by ID AND Selected package
      const existingIdx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedPackage === packageName
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += qty;
        return updated;
      }

      return [
        ...prevCart,
        {
          product,
          selectedPackage: packageName,
          price: packagePrice,
          quantity: qty,
        },
      ];
    });
  };

  const updateQuantity = (productId, packageName, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId && item.selectedPackage === packageName) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const removeFromCart = (productId, packageName) => {
    setCart((prevCart) => {
      return prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedPackage === packageName)
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
