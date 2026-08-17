import { useState, useEffect } from 'react';

const CART_KEY = 'dano_cart';
const ORDERS_KEY = 'dano_orders';

export function useCart() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from local storage', e);
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load orders from local storage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to local storage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to local storage', e);
    }
  }, [orders]);

  const addToCart = (product, selectedPackage = null, quantity = 1) => {
    const pkg = selectedPackage || (product.packages && product.packages.length > 0 ? product.packages[0] : { name: 'Standard', price: product.price });
    const cartItemId = `${product.id}__${pkg.name}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartItemId,
            productId: product.id,
            productName: product.name,
            platform: product.platform,
            type: product.type,
            image: product.image,
            packageName: pkg.name,
            price: pkg.price,
            oldPrice: pkg.oldPrice || product.oldPrice,
            quantity,
          },
        ];
      }
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart((prevCart) =>
      prevCart
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

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_KEY);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const createOrder = (orderData) => {
    const newOrder = {
      id: orderData.orderId,
      customerName: orderData.customerName,
      phone: orderData.phone,
      city: orderData.city,
      paymentMethod: orderData.paymentMethod,
      orderNote: orderData.orderNote || '',
      items: orderData.items || cart,
      totalAmount: orderData.totalAmount || cartTotal,
      createdAt: new Date().toISOString(),
      status: 'Pending Payment',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return {
    cart,
    orders,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    totalItemCount,
    createOrder,
  };
}
