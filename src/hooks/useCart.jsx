import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_KEY = 'dano_cart';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(CART_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, selectedPackage = null, quantity = 1) => {
    setCart((prevCart) => {
      const packageKey = selectedPackage ? selectedPackage.name : 'default';
      const existingIndex = prevCart.findIndex(
        (item) => item.productId === product.id && item.packageKey === packageKey
      );

      const unitPrice = selectedPackage ? selectedPackage.price : product.price;

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartItemId: `${product.id}-${packageKey}`,
            productId: product.id,
            name: product.name,
            slug: product.slug,
            image: product.image,
            platform: product.platform,
            type: product.type,
            category: product.category,
            selectedPackage: selectedPackage ? selectedPackage.name : null,
            packageKey,
            unitPrice,
            quantity,
          },
        ];
      }
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
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

export default useCart;
