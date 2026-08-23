import { useState, useEffect } from 'react';

export function useCart() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_cart');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading cart from local storage:', e);
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('dano_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to local storage:', e);
    }
  }, [cartItems]);

  const addToCart = (product, selectedPackage = null, quantity = 1) => {
    const pkg = selectedPackage || (product.packages && product.packages.length > 0 ? product.packages[0] : { id: 'default', name: 'Standard', price: product.price });
    const cartItemId = `${product.id}_${pkg.id || pkg.name}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          productName: product.name,
          platform: product.platform,
          category: product.category,
          type: product.type,
          image: product.image,
          selectedPackage: pkg,
          unitPrice: pkg.price || product.price,
          quantity
        }
      ];
    });
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice
  };
}
