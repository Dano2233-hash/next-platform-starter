import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_cart');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading cart from LocalStorage:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('dano_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to LocalStorage:', e);
    }
  }, [cart]);

  const addToCart = (product, selectedPackage = null, quantity = 1) => {
    const qty = Math.max(1, parseInt(quantity) || 1);
    const itemPrice = selectedPackage ? selectedPackage.price : product.price;
    const pkgName = selectedPackage ? selectedPackage.name : null;
    const cartItemId = selectedPackage ? `${product.id}-${selectedPackage.id}` : product.id;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartItemId,
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: itemPrice,
            selectedPackage: selectedPackage ? { id: selectedPackage.id, name: selectedPackage.name, price: selectedPackage.price } : null,
            quantity: qty,
            image: product.image,
            platform: product.platform,
            category: product.category,
            type: product.type
          }
        ];
      }
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, quantity) => {
    const num = parseInt(quantity);
    if (isNaN(num) || num <= 0) {
      removeFromCart(cartItemId);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: num } : item))
      );
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('dano_cart');
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
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
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
