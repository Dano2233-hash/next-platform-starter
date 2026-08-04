import { useState, useEffect } from 'react';

export default function useCart() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('dano_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('dano_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, selectedPackage, quantity = 1) => {
    setCart((prevCart) => {
      const cartItemId = `${product.id}-${selectedPackage.id}`;
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            cartItemId,
            product,
            selectedPackage,
            quantity
          }
        ];
      }
    });
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.selectedPackage.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
    setCart
  };
}
