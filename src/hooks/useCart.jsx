import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse dano_cart:', e);
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('dano_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save dano_cart:', e);
    }
  }, [cart]);

  const addToCart = (product, selectedPackage = null, quantity = 1, openDrawer = true) => {
    setCart((prev) => {
      // Determine package details
      const pkg = selectedPackage || (product.packages && product.packages.length > 0 ? product.packages[0] : null);
      const packageId = pkg ? pkg.id : 'default';
      const packageName = pkg ? pkg.name : '';
      const unitPrice = pkg ? pkg.price : product.price;

      // Unique cart item identifier combining product ID and package ID
      const cartItemId = `${product.id}-${packageId}`;

      const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }

      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          name: product.name,
          slug: product.slug,
          category: product.category,
          platform: product.platform,
          image: product.image,
          selectedPackage: pkg,
          packageName,
          price: unitPrice,
          oldPrice: pkg?.oldPrice || product.oldPrice,
          quantity
        }
      ];
    });

    if (openDrawer) {
      setIsDrawerOpen(true);
    }
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('dano_cart');
  };

  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        totalPrice,
        isDrawerOpen,
        setIsDrawerOpen
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
