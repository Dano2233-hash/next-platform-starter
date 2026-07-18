import { useState, useEffect } from 'react';

export function useCart() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('dano_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse dano_cart from localstorage", e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('dano_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, selectedPackage = null, quantity = 1) => {
    setCart((prevCart) => {
      // Create a unique key based on product id and package id
      const packageId = selectedPackage ? selectedPackage.id : 'base';
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedPackage?.id === selectedPackage?.id
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { product, selectedPackage, quantity }];
      }
    });
  };

  const removeFromCart = (productId, packageId = 'base') => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(item.product.id === productId && (item.selectedPackage?.id || 'base') === packageId)
      )
    );
  };

  const updateQuantity = (productId, packageId, newQty) => {
    if (newQty < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) => {
        const itemPkgId = item.selectedPackage?.id || 'base';
        if (item.product.id === productId && itemPkgId === packageId) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.selectedPackage ? item.selectedPackage.price : item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  };
}
