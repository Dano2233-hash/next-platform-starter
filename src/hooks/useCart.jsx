import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'dano_cart';

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to persist cart to localStorage:', e);
    }
  }, [cart]);

  /**
   * Add item to cart
   * @param {Object} product
   * @param {Object|null} selectedPackage
   * @param {number} quantity
   */
  const addToCart = (product, selectedPackage = null, quantity = 1) => {
    setCart((prevCart) => {
      const packageKey = selectedPackage ? selectedPackage.name : 'standard';
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedPackageName === packageKey
      );

      const unitPrice = selectedPackage ? selectedPackage.price : product.price;

      if (existingIndex > -1) {
        const next = [...prevCart];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }

      return [
        ...prevCart,
        {
          id: `${product.id}-${packageKey}`,
          product,
          selectedPackage: selectedPackage || null,
          selectedPackageName: packageKey,
          price: unitPrice,
          quantity
        }
      ];
    });
  };

  /**
   * Remove item from cart
   */
  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  /**
   * Update item quantity
   */
  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  /**
   * Clear all cart items
   */
  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  // Derived state
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
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

export default useCart;
