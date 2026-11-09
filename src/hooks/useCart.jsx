import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'dano_cart';

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cart]);

  /**
   * Add item to cart. If exact product + package exists, increment quantity.
   */
  const addToCart = (product, selectedPackage = null, quantity = 1) => {
    const pkg = selectedPackage || (product.packages && product.packages[0]) || {
      id: 'default',
      name: 'Standard',
      price: product.price,
      oldPrice: product.oldPrice
    };

    const cartItemId = `${product.id}-${pkg.id}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const nextCart = [...prev];
        nextCart[existingIndex] = {
          ...nextCart[existingIndex],
          quantity: nextCart[existingIndex].quantity + quantity
        };
        return nextCart;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            productId: product.id,
            name: product.name,
            slug: product.slug,
            image: product.image,
            platform: product.platform,
            type: product.type,
            category: product.category,
            selectedPackage: pkg,
            unitPrice: pkg.price || product.price,
            unitOldPrice: pkg.oldPrice || product.oldPrice,
            quantity: quantity,
            maxStock: product.stock
          }
        ];
      }
    });

    return true;
  };

  /**
   * Buy now: adds to cart and returns true for navigation to /checkout
   */
  const buyNow = (product, selectedPackage = null, quantity = 1) => {
    addToCart(product, selectedPackage, quantity);
    return true;
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          const clampedQty = item.maxStock ? Math.min(newQuantity, item.maxStock) : newQuantity;
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

  const originalTotal = cart.reduce((sum, item) => {
    const price = item.unitOldPrice || item.unitPrice;
    return sum + (price * item.quantity);
  }, 0);

  const totalSavings = Math.max(0, originalTotal - subtotal);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        buyNow,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        originalTotal,
        totalSavings
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
