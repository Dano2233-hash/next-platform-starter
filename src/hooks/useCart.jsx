import { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'dano_cart';

export function useCart() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading dano_cart from localStorage', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving dano_cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (product, pkg = null, qty = 1) => {
    const packageInfo = pkg || (product.packages && product.packages.length > 0 ? product.packages[0] : null);
    const itemPrice = packageInfo ? packageInfo.price : product.price;
    const itemKey = `${product.id}-${packageInfo ? packageInfo.id : 'default'}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.key === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        const currentItem = updated[existingIndex];
        const newQty = currentItem.quantity + qty;
        updated[existingIndex] = {
          ...currentItem,
          quantity: newQty,
          totalPrice: newQty * itemPrice,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            key: itemKey,
            productId: product.id,
            productName: product.name,
            productImage: product.image,
            category: product.category,
            platform: product.platform,
            package: packageInfo,
            unitPrice: itemPrice,
            quantity: qty,
            totalPrice: itemPrice * qty,
          },
        ];
      }
    });
  };

  const removeFromCart = (itemKey) => {
    setCartItems((prev) => prev.filter((item) => item.key !== itemKey));
  };

  const updateQuantity = (itemKey, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.key === itemKey) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: newQty * item.unitPrice,
            };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

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
