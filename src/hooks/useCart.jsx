import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'dano_cart';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (product, selectedPackage = null, quantity = 1) => {
    const pkgName = selectedPackage ? selectedPackage.name : null;
    const itemPrice = selectedPackage ? selectedPackage.price : product.price;
    const itemId = pkgName ? `${product.id}-${pkgName}` : product.id;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: itemId,
            productId: product.id,
            productName: product.name,
            slug: product.slug,
            image: product.image,
            category: product.category,
            platform: product.platform,
            type: product.type,
            packageName: pkgName,
            price: itemPrice,
            quantity: quantity
          }
        ];
      }
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotalPrice = cartItems.reduce(
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
        cartTotalCount,
        cartTotalPrice,
        isCartOpen,
        setIsCartOpen
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
