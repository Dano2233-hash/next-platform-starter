import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'dano_cart';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed reading cart from localStorage', e);
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed saving cart to localStorage', e);
    }
  }, [cartItems]);

  /**
   * Add product to cart with chosen package
   * @param {Object} product
   * @param {Object|null} selectedPackage
   * @param {number} quantity
   */
  const addToCart = (product, selectedPackage = null, quantity = 1) => {
    const pkg = selectedPackage || (product.packages && product.packages.length > 0 ? product.packages[0] : null);
    const cartItemId = `${product.id}-${pkg ? pkg.id : 'default'}`;
    const itemPrice = pkg ? pkg.price : product.price;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const next = [...prevItems];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }

      return [
        ...prevItems,
        {
          cartItemId,
          productId: product.id,
          name: product.name,
          slug: product.slug,
          image: product.image,
          category: product.category,
          platform: product.platform,
          type: product.type,
          packageName: pkg ? pkg.name : null,
          packageId: pkg ? pkg.id : null,
          price: itemPrice,
          quantity: quantity,
          stock: product.stock
        }
      ];
    });
  };

  /**
   * Update quantity
   */
  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  /**
   * Remove item
   */
  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  /**
   * Clear entire cart (e.g., upon successful checkout)
   */
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        cartSubtotal,
        isDrawerOpen,
        setIsDrawerOpen
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

export default useCart;
