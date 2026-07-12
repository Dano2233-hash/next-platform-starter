import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('dano_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('dano_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedPackage) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.selectedPackage.name === selectedPackage.name
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      }
      return [...prevItems, { ...product, selectedPackage, quantity: 1 }];
    });
  };

  const removeFromCart = (productId, packageName) => {
    setCartItems(prevItems => prevItems.filter(
      item => !(item.id === productId && item.selectedPackage.name === packageName)
    ));
  };

  const updateQuantity = (productId, packageName, delta) => {
    setCartItems(prevItems => prevItems.map(item => {
      if (item.id === productId && item.selectedPackage.name === packageName) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce((total, item) => total + (item.selectedPackage.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount };
};
