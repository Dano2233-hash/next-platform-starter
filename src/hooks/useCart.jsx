import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('dano_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedPackage = null, quantity = 1, openDrawer = true) => {
    const packageItem = selectedPackage || (product.packages && product.packages.length > 0 ? product.packages[0] : null);
    const cartItemId = packageItem ? `${product.id}-${packageItem.id}` : product.id;
    const priceToUse = packageItem ? packageItem.price : product.price;
    const oldPriceToUse = packageItem ? packageItem.oldPrice : product.oldPrice;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            cartItemId,
            productId: product.id,
            productName: product.name,
            productImage: product.image,
            platform: product.platform,
            type: product.type,
            category: product.category,
            selectedPackage: packageItem ? packageItem.name : null,
            packageId: packageItem ? packageItem.id : null,
            unitPrice: priceToUse,
            unitOldPrice: oldPriceToUse,
            quantity: quantity,
          },
        ];
      }
    });

    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const updateQuantity = (cartItemId, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const cartTotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
