import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('dano_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing dano_cart from localStorage', e);
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('dano_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, selectedPackage = null, quantity = 1) => {
    const pack = selectedPackage || (product.packages && product.packages.length > 0 ? product.packages[0] : null);
    const itemPrice = pack ? pack.price : product.price;
    const packageName = pack ? pack.name : 'Standard';

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.productId === product.id && item.packageName === packageName
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartItemId: `${product.id}-${packageName.replace(/\s+/g, '-')}`,
            productId: product.id,
            name: product.name,
            image: product.image,
            platform: product.platform,
            category: product.category,
            type: product.type,
            packageName: packageName,
            price: itemPrice,
            quantity: quantity
          }
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

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
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
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
