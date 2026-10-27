import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse cart from local storage:', e);
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('dano_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to local storage:', e);
    }
  }, [cartItems]);

  const addToCart = (product, selectedPackage = null, quantity = 1) => {
    const pkgName = selectedPackage ? selectedPackage.name : (product.packages && product.packages[0] ? product.packages[0].name : 'Default');
    const pkgPrice = selectedPackage ? selectedPackage.price : (product.packages && product.packages[0] ? product.packages[0].price : product.price);
    const pkgOldPrice = selectedPackage ? selectedPackage.oldPrice : (product.packages && product.packages[0] ? product.packages[0].oldPrice : product.oldPrice);

    const cartItemId = `${product.id}_${pkgName}`;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.cartItemId === cartItemId);
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
            cartItemId,
            productId: product.id,
            name: product.name,
            image: product.image,
            platform: product.platform,
            category: product.category,
            type: product.type,
            packageName: pkgName,
            price: pkgPrice,
            oldPrice: pkgOldPrice,
            quantity: quantity
          }
        ];
      }
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, delta) => {
    setCartItems((prevItems) =>
      prevItems
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
    setCartItems([]);
  };

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        cartTotalAmount
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
