import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('dano_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (product, selectedPackage = null, quantity = 1) => {
    setCart((prevCart) => {
      // Determine unique item identifier based on product id and selected package id
      const packageId = selectedPackage ? selectedPackage.id : 'default';
      const packageName = selectedPackage ? selectedPackage.name : null;
      const unitPrice = selectedPackage ? selectedPackage.price : product.price;
      const oldPrice = selectedPackage ? selectedPackage.oldPrice : product.oldPrice;

      const existingIndex = prevCart.findIndex(
        (item) => item.productId === product.id && item.packageId === packageId
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: `${product.id}-${packageId}`,
            productId: product.id,
            name: product.name,
            slug: product.slug,
            image: product.image,
            platform: product.platform,
            type: product.type,
            packageId: packageId,
            packageName: packageName,
            price: unitPrice,
            oldPrice: oldPrice,
            quantity: quantity,
            maxStock: product.stock
          }
        ];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('dano_cart');
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
        isDrawerOpen,
        setIsDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false)
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
