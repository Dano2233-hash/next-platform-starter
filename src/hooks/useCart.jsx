import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from local storage:', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('dano_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to local storage:', e);
    }
  }, [cart]);

  // Add product to cart with optional selected package
  const addToCart = (product, selectedPkg = null, quantity = 1) => {
    setCart((prevCart) => {
      const pkgName = selectedPkg ? selectedPkg.name : (product.packages && product.packages[0]?.name) || 'Default';
      const unitPrice = selectedPkg ? selectedPkg.price : product.price;

      const itemKey = `${product.id}_${pkgName}`;
      const existingIndex = prevCart.findIndex((item) => item.cartKey === itemKey);

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
            cartKey: itemKey,
            productId: product.id,
            name: product.name,
            slug: product.slug,
            image: product.image,
            category: product.category,
            platform: product.platform,
            type: product.type,
            selectedPackage: pkgName,
            price: unitPrice,
            quantity: quantity
          }
        ];
      }
    });
  };

  const removeFromCart = (cartKey) => {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const updateQuantity = (cartKey, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartKey);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartKey === cartKey ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
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
