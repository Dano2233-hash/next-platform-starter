import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from local storage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dano_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to local storage', e);
    }
  }, [cart]);

  const addToCart = (product, selectedPackage = null, quantity = 1) => {
    setCart((prevCart) => {
      const pkgName = selectedPackage ? selectedPackage.name : (product.packages && product.packages[0] ? product.packages[0].name : 'Standard');
      const itemPrice = selectedPackage ? selectedPackage.price : (product.packages && product.packages[0] ? product.packages[0].price : product.price);

      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedPackageName === pkgName
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            image: product.image,
            platform: product.platform,
            category: product.category,
            type: product.type,
            selectedPackageName: pkgName,
            unitPrice: itemPrice,
            quantity: quantity,
          },
        ];
      }
    });
  };

  const removeFromCart = (productId, selectedPackageName) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === productId && item.selectedPackageName === selectedPackageName)
      )
    );
  };

  const updateQuantity = (productId, selectedPackageName, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId && item.selectedPackageName === selectedPackageName) {
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

  const cartTotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
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
