import { useState, useEffect } from 'react';

const STORAGE_KEY = 'dano_cart';

// Global listeners for the cart to keep navbar counter and other views in sync
const listeners = new Set();
const notify = () => listeners.forEach(listener => listener());

export function useCart() {
  const [cart, setCart] = useState(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    const handleSync = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setCart(JSON.parse(stored));
        } catch (e) {}
      } else {
        setCart([]);
      }
    };
    listeners.add(handleSync);
    return () => {
      listeners.delete(handleSync);
    };
  }, []);

  const saveToStorage = (updatedCart) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCart));
    setCart(updatedCart);
    notify();
  };

  const addToCart = (product, selectedPackage, quantity = 1) => {
    const qty = Number(quantity) || 1;
    const existingIndex = cart.findIndex(item =>
      item.productId === product.id &&
      item.selectedPackage.name === selectedPackage.name
    );

    let updated;
    if (existingIndex > -1) {
      updated = [...cart];
      updated[existingIndex].quantity += qty;
    } else {
      updated = [
        ...cart,
        {
          productId: product.id,
          name: product.name,
          slug: product.slug,
          image: product.image,
          selectedPackage: {
            name: selectedPackage.name,
            price: Number(selectedPackage.price)
          },
          quantity: qty,
          platform: product.platform,
          type: product.type
        }
      ];
    }
    saveToStorage(updated);
  };

  const removeFromCart = (productId, packageName) => {
    const updated = cart.filter(item =>
      !(item.productId === productId && item.selectedPackage.name === packageName)
    );
    saveToStorage(updated);
  };

  const updateQuantity = (productId, packageName, newQty) => {
    const qty = Math.max(1, Number(newQty) || 1);
    const updated = cart.map(item => {
      if (item.productId === productId && item.selectedPackage.name === packageName) {
        return { ...item, quantity: qty };
      }
      return item;
    });
    saveToStorage(updated);
  };

  const clearCart = () => {
    saveToStorage([]);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.selectedPackage.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
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
