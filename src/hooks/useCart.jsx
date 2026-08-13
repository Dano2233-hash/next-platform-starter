import { useState, useEffect } from 'react';

export function useCart() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('dano_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('dano_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, selectedPackage, quantity = 1) => {
    setCart((prevCart) => {
      // Find matching item by ID AND package name to allow different package options as separate items
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedPackage.name === selectedPackage.name
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            image: product.image,
            category: product.category,
            platform: product.platform,
            type: product.type,
            selectedPackage: selectedPackage,
            quantity: quantity,
          },
        ];
      }
    });
  };

  const updateQuantity = (productId, packageName, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId, packageName);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.selectedPackage.name === packageName
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId, packageName) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === productId && item.selectedPackage.name === packageName))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.selectedPackage.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  };
}
