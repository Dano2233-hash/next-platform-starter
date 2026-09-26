import { useState, useEffect, createContext, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from local storage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dano_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to local storage', e);
    }
  }, [cartItems]);

  const addToCart = (product, selectedPkg = null, quantity = 1) => {
    setCartItems((prev) => {
      const pkg = selectedPkg || (product.packages && product.packages.length > 0 ? product.packages[0] : null);
      const pkgId = pkg ? pkg.id : 'default';
      const itemKey = `${product.id}-${pkgId}`;
      const itemPrice = pkg ? pkg.price : product.price;
      const itemOldPrice = pkg ? pkg.oldPrice : product.oldPrice;

      const existingIndex = prev.findIndex((item) => item.cartItemId === itemKey);

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId: itemKey,
            productId: product.id,
            productName: product.name,
            productImage: product.image,
            category: product.category,
            platform: product.platform,
            type: product.type,
            packageId: pkgId,
            packageName: pkg ? pkg.name : 'Standard',
            price: itemPrice,
            oldPrice: itemOldPrice,
            quantity: quantity,
          },
        ];
      }
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
