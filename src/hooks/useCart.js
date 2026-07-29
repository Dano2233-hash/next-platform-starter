import { useState, useEffect } from 'react';

export function useCart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('dano_cart');
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch (e) {
        setCart([]);
      }
    }
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('dano_cart', JSON.stringify(newCart));
  };

  const addToCart = (product, selectedPackage, quantity = 1) => {
    // If no package provided but packages exist, fallback to the first package
    const pkg = selectedPackage || (product.packages && product.packages[0]) || { name: 'Standard', price: product.price };

    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.selectedPackage.name === pkg.name
    );

    let updated;
    if (existingIndex > -1) {
      updated = [...cart];
      updated[existingIndex].quantity += quantity;
    } else {
      updated = [...cart, { product, selectedPackage: pkg, quantity }];
    }
    saveCart(updated);
  };

  const removeFromCart = (productId, packageName) => {
    const updated = cart.filter(
      (item) => !(item.product.id === productId && item.selectedPackage.name === packageName)
    );
    saveCart(updated);
  };

  const updateQuantity = (productId, packageName, delta) => {
    const updated = cart.map((item) => {
      if (item.product.id === productId && item.selectedPackage.name === packageName) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    });
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((acc, item) => acc + item.selectedPackage.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
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
