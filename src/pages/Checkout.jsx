import React from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CheckoutForm from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleCreateOrder = (formData) => {
    const orderNumber = generateOrderId();
    const newOrder = {
      orderNumber,
      createdAt: new Date().toISOString(),
      customerName: formData.customerName,
      phone: formData.phone,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote,
      items: cartItems,
      totalAmount: cartTotal,
      status: 'Pending Payment'
    };

    // Save order to Local Storage
    const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
    localStorage.setItem('dano_orders', JSON.stringify([newOrder, ...existingOrders]));

    // Clear cart and redirect to order success page
    clearCart();
    navigate('/order-success', { state: { order: newOrder } });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Checkout Page Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white">Manual Payment Checkout</h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete customer information to create your order for FastPay, Korek, or MasterCard.
          </p>
        </div>
        <Link
          to="/cart"
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>
      </div>

      {/* Cart Summary Header Banner */}
      <div className="bg-[#0c1021] border border-[#1a223e] rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-200">
              Ordering {cartItems.reduce((a, b) => a + b.quantity, 0)} digital item(s)
            </h4>
            <p className="text-xs text-slate-400">Review items in cart or edit before submitting.</p>
          </div>
        </div>

        <span className="text-lg font-black text-cyan-400">{formatPrice(cartTotal)}</span>
      </div>

      {/* Form Component */}
      <CheckoutForm
        onSubmitOrder={handleCreateOrder}
        cartTotal={cartTotal}
        cartItems={cartItems}
      />
    </div>
  );
}
