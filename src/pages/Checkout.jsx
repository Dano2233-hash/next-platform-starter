import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import CheckoutForm from '../components/CheckoutForm';
import { ShoppingBag, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function Checkout() {
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const { createOrder } = useProducts();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto space-y-4">
        <h2 className="text-2xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">Add games or top-ups before heading to checkout.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const handleCheckoutSubmit = (formData) => {
    setIsSubmitting(true);

    const orderId = generateOrderId();
    const orderData = {
      orderId,
      customerName: formData.customerName,
      phoneNumber: formData.phoneNumber,
      city: formData.city,
      paymentMethod: formData.paymentMethod, // 'fastpay', 'korek', or 'mastercard'
      orderNote: formData.orderNote || '',
      items: cartItems,
      totalAmount: cartSubtotal,
      currency: 'IQD',
      status: 'Pending Payment',
      createdAt: new Date().toISOString()
    };

    // Save order in context and Local Storage
    createOrder(orderData);

    // Clear cart after successful creation
    clearCart();

    // Navigate to Order Success with state
    navigate('/order-success', {
      state: { order: orderData }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Manual Payment Checkout</h1>
          <p className="text-xs text-slate-400 mt-1">
            Fill in your delivery details and choose your preferred local Iraqi payment channel.
          </p>
        </div>
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cart</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Checkout Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleCheckoutSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Right: Order Summary Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#090d1c] border border-slate-800 rounded-2xl p-6 space-y-4 sticky top-24">
            <h3 className="font-bold text-base text-white flex items-center justify-between pb-3 border-b border-slate-800">
              <span>Order Summary</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 font-mono">
                {cartItems.length} items
              </span>
            </h3>

            {/* List of items */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="flex items-center justify-between gap-3 text-xs">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-200 truncate">{item.name}</p>
                    {item.packageName && (
                      <p className="text-[11px] text-cyan-400 font-mono">{item.packageName}</p>
                    )}
                    <span className="text-slate-500 font-mono">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-300">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="font-mono text-slate-200">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Delivery Charge</span>
                <span className="text-emerald-400 font-bold">FREE Instant Delivery</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
              <span className="font-bold text-sm text-white">Total Due</span>
              <span className="text-xl font-extrabold text-cyan-300 font-mono">
                {formatPrice(cartSubtotal)}
              </span>
            </div>

            {/* Trust Notice */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-1.5">
              <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Notice on Iraqi Manual Payments</span>
              </div>
              <p>
                No online credit card charges will occur. After placing the order, you will contact us on WhatsApp, Discord, or TikTok to provide the transaction reference for instant code delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
