import { useState, useEffect } from 'react';

const STORAGE_KEY = 'dano_cart';

export function useCart() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse cart from localStorage', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (product, selectedPackage = null, quantity = 1) => {
    const pkg = selectedPackage || (product.packages && product.packages.length > 0 ? product.packages[0] : { name: 'Standard', price: product.price });
    const cartItemId = `${product.id}-${pkg.name.replace(/\s+/g, '-').toLowerCase()}`;
    const unitPrice = pkg.price !== undefined ? pkg.price : product.price;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          product: {
            id: product.id,
            name: product.name,
            slug: product.slug,
            image: product.image,
            category: product.category,
            platform: product.platform,
            type: product.type,
          },
          selectedPackage: pkg,
          price: unitPrice,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
  };
}

export default useCart;
