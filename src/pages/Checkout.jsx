import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import { ArrowLeft, ShoppingBag, ShieldCheck, CreditCard } from 'lucide-react';

export default function Checkout({ cartItems = [], subtotal = 0, onAddOrder, onClearCart }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <ShoppingBag className="w-16 h-16 text-slate-700 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-200">No Items to Checkout</h2>
        <p className="text-xs text-slate-400">Your cart is currently empty. Please add products first.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Store
        </Link>
      </div>
    );
  }

  const handleFormSubmit = (customerData) => {
    setIsSubmitting(true);
    const orderNumber = generateOrderId();
    const orderPayload = {
      orderNumber,
      customerName: customerData.customerName,
      phoneNumber: customerData.phoneNumber,
      city: customerData.city,
      paymentMethod: customerData.paymentMethod,
      orderNote: customerData.orderNote,
      items: cartItems,
      subtotal,
      currency: 'IQD',
      createdAt: new Date().toISOString()
    };

    onAddOrder(orderPayload);
    onClearCart();
    setIsSubmitting(false);

    navigate('/order-success', { state: { order: orderPayload } });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <button
            onClick={() => navigate('/cart')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Cart
          </button>
          <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider">
            Manual Checkout
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete customer information to generate your order invoice
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Manual Transfer Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Right Column: Summary */}
        <div className="lg:col-span-5">
          <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-6 space-y-6 sticky top-24">
            <h3 className="font-extrabold text-slate-100 text-base uppercase tracking-wider border-b border-slate-800 pb-3">
              Order Preview ({cartItems.reduce((a, b) => a + b.quantity, 0)} items)
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex items-center justify-between text-xs bg-slate-900/60 p-2.5 rounded-lg border border-slate-800"
                >
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-slate-200 truncate">{item.productName}</p>
                    <p className="text-[11px] text-cyan-400">{item.packageName} x {item.quantity}</p>
                  </div>
                  <span className="font-bold text-slate-100 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="font-bold text-slate-200">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Processing Fee</span>
                <span className="font-bold text-emerald-400">FREE</span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                <span>Total Amount:</span>
                <span className="text-cyan-400">{formatPrice(subtotal)}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 text-[11px] text-slate-300 space-y-1">
              <p className="font-bold text-cyan-400 flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5" /> Next Steps After Creation
              </p>
              <p className="text-slate-400 leading-relaxed">
                After clicking confirm, an official order invoice will be generated. You can send payment confirmation to our team via WhatsApp, Discord, or TikTok for instant code release.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
