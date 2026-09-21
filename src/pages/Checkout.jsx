import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { CheckoutForm } from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import { ShieldCheck, ShoppingBag, Zap, CreditCard } from 'lucide-react';

export const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { addOrder } = useProducts();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleFormSubmit = (customerData) => {
    setIsSubmitting(true);

    const orderId = generateOrderId();
    const newOrder = {
      orderId,
      customer: customerData,
      items: cart,
      totalAmount: cartTotal,
      status: 'Pending Payment',
      createdAt: new Date().toISOString()
    };

    // Save order & clear cart
    addOrder(newOrder);
    clearCart();

    // Redirect to Order Success page with orderId state
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/order-success', { state: { order: newOrder } });
    }, 400);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="bg-[#090f1e] border border-slate-800 rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Manual Payment Checkout</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Complete your information and choose your preferred local Kurdistan payment method (FastPay, Korek, or MasterCard).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Checkout Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Order Summary Side Panel */}
        <div className="lg:col-span-5 bg-[#090f1e] border border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              <span>Order Summary</span>
            </div>
            <span className="text-xs text-cyan-400 font-extrabold">{cart.length} Items</span>
          </h3>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {cart.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs border-b border-slate-800/50 pb-2.5">
                <div className="w-12 h-12 rounded-lg bg-slate-950 overflow-hidden shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-cyan-400 text-[10px]">
                      DS
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white truncate">{item.name}</p>
                  <p className="text-[11px] text-cyan-400">
                    {item.selectedPackage?.name} x {item.quantity}
                  </p>
                </div>
                <span className="font-extrabold text-slate-200 shrink-0">
                  {formatPrice(item.cartUnitPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-slate-200">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-bold text-cyan-400">0 IQD (Instant)</span>
            </div>
            <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
              <span>Total IQD</span>
              <span className="text-cyan-400">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 font-bold text-slate-200">
              <CreditCard className="w-4 h-4 text-cyan-400" />
              <span>Manual Payment Instructions</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              After confirming, you will receive our FastPay / Korek / MasterCard account details and direct WhatsApp / Discord contact buttons to complete payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
