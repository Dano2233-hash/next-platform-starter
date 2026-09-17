import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ShieldCheck, Lock, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import CheckoutForm from '../components/CheckoutForm';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotalPrice, totalItemsCount, createOrder } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleFormSubmit = (formData) => {
    setIsSubmitting(true);
    const orderId = generateOrderId();

    const orderData = {
      orderId,
      customerName: formData.customerName,
      phoneNumber: formData.phoneNumber,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote || '',
      items: cart,
      totalAmount: cartTotalPrice,
      status: 'Pending Payment',
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      const created = createOrder(orderData);
      setIsSubmitting(false);
      navigate('/order-success', { state: { order: created } });
    }, 400);
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <button
            onClick={() => navigate('/cart')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </button>
          <h1 className="text-2xl font-black text-white font-sans flex items-center gap-2">
            <Lock className="w-5 h-5 text-cyan-400" />
            <span>Manual Payment Checkout</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete your information to request code delivery via FastPay, Korek, or MasterCard.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Form Column */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Right Order Summary Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#090d18] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              <span>Order Summary ({totalItemsCount} items)</span>
            </h3>

            {/* Item Mini List */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1 scrollbar-none">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center justify-between gap-3 text-xs py-1 border-b border-slate-800/60 last:border-0">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 overflow-hidden shrink-0 border border-slate-800">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-200 truncate">{item.name}</p>
                      <p className="text-[11px] text-slate-400">
                        {item.packageName} × <span className="text-cyan-400 font-bold">{item.quantity}</span>
                      </p>
                    </div>
                  </div>
                  <span className="font-extrabold text-slate-200 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Breakdown */}
            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-slate-200 font-bold">{formatPrice(cartTotalPrice)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Digital Delivery</span>
                <span className="text-emerald-400 font-bold">0 IQD (FREE)</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Total Amount</span>
                <span className="text-xl font-black text-cyan-300">{formatPrice(cartTotalPrice)}</span>
              </div>
            </div>

            <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl flex items-start gap-2.5 text-xs text-cyan-300">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Manual Payment Security</p>
                <p className="text-[11px] text-slate-400 leading-normal mt-0.5">
                  No automated credit card charge will happen online. After creating your order, transfer the total via FastPay/Korek/MasterCard to receive your code.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
