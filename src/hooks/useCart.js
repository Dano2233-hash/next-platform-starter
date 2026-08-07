import { useState, useEffect } from 'react';

export function useCart() {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('dano_cart');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing stored cart', e);
      }
    }
    return [];
  });

  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('dano_cart', JSON.stringify(updatedCart));
  };

  const addToCart = (product, selectedPackage, quantity = 1) => {
    // Determine package details
    const pkgId = selectedPackage ? selectedPackage.id : 'standard';
    const pkgName = selectedPackage ? selectedPackage.name : 'Standard';
    const pkgPrice = selectedPackage ? selectedPackage.price : product.price;

    const existingIndex = cart.findIndex(
      (item) => item.productId === product.id && item.packageId === pkgId
    );

    let updated;
    if (existingIndex > -1) {
      updated = [...cart];
      updated[existingIndex].quantity += quantity;
    } else {
      updated = [
        ...cart,
        {
          productId: product.id,
          productName: product.name,
          slug: product.slug,
          packageId: pkgId,
          packageName: pkgName,
          packagePrice: pkgPrice,
          quantity: quantity,
          image: product.image,
          platform: product.platform,
          type: product.type
        }
      ];
    }
    saveCart(updated);
  };

  const removeFromCart = (productId, packageId) => {
    const updated = cart.filter(
      (item) => !(item.productId === productId && item.packageId === packageId)
    );
    saveCart(updated);
  };

  const updateQuantity = (productId, packageId, delta) => {
    const updated = cart
      .map((item) => {
        if (item.productId === productId && item.packageId === packageId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.packagePrice * item.quantity, 0);
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
