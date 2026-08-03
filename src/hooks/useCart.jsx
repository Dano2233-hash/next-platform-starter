import { useState, useEffect } from 'react';

export function useCart() {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem('dano_cart');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Error reading dano_cart from localStorage", e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('dano_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, selectedPackage, quantity = 1) => {
    setCart((prevCart) => {
      // Find item with same id AND same selected package
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedPackage === selectedPackage
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, selectedPackage, quantity }];
      }
    });
  };

  const removeFromCart = (productId, selectedPackage) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedPackage === selectedPackage)
      )
    );
  };

  const updateQuantity = (productId, selectedPackage, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId && item.selectedPackage === selectedPackage) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: Math.max(1, nextQty) };
          }
          return item;
        })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemCount
  };
}
