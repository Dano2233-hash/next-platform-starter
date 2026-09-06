import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';
import { ArrowLeft, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function Checkout({ cart = [], totalPrice = 0, onOrderSuccess }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto my-12 bg-[#090e1a] border border-slate-800 rounded-3xl p-10 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Your cart is empty</h2>
        <p className="text-xs text-slate-400">Add products to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-cyan-400 rounded-xl text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Products</span>
        </Link>
      </div>
    );
  }

  const handleFormSubmit = (formData) => {
    setIsSubmitting(true);

    const orderId = generateOrderId();
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      customerName: formData.name,
      phone: formData.phone,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      note: formData.note,
      items: cart,
      totalPrice,
      status: 'Pending Payment Verification'
    };

    setTimeout(() => {
      onOrderSuccess(newOrder);
      setIsSubmitting(false);
      navigate(`/order-success/${orderId}`, { state: { order: newOrder } });
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <button
          onClick={() => navigate('/cart')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-bold bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/80">
          <ShieldCheck className="w-4 h-4" />
          <span>Secure Manual Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7">
          <CheckoutForm
            onSubmit={handleFormSubmit}
            totalPrice={totalPrice}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-[#090e1a] border border-slate-800 rounded-2xl p-6 space-y-5 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              <span>Items in Order ({cart.length})</span>
            </h3>
            <span className="text-xs font-black text-cyan-400">{formatPrice(totalPrice)}</span>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="flex items-center justify-between gap-3 text-xs p-2.5 bg-[#0c1220] rounded-xl border border-slate-800"
              >
                <div className="min-w-0">
                  <h4 className="font-bold text-white truncate">{item.name}</h4>
                  <p className="text-[11px] text-cyan-400 truncate">{item.packageName} x {item.quantity}</p>
                </div>
                <span className="font-black text-slate-200 shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2 text-xs font-semibold">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="text-white">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Delivery</span>
              <span className="text-emerald-400">Free Digital Refill</span>
            </div>
            <div className="flex justify-between text-sm text-white font-black pt-2 border-t border-slate-800">
              <span>Total Payable</span>
              <span className="text-cyan-400">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl text-[11px] text-slate-400 font-medium">
            <span className="font-bold text-white block mb-0.5">Please Note:</span>
            After placing your order, you will receive an Order ID to complete payment via WhatsApp or Discord.
          </div>
        </div>
      </div>
    </div>
  );
}
