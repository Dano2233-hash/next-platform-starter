import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { CheckoutForm } from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import { ArrowLeft, ShieldCheck, ShoppingBag } from 'lucide-react';

export const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">No Items to Checkout</h2>
        <p className="text-slate-400 text-xs sm:text-sm">Please add products to your cart before proceeding.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Catalog
        </Link>
      </div>
    );
  }

  const handleOrderSubmit = (customerData) => {
    setIsSubmitting(true);

    const newOrderId = generateOrderId();
    const newOrder = {
      orderId: newOrderId,
      createdAt: new Date().toISOString(),
      customer: customerData,
      items: [...cart],
      totalAmount: getCartTotal(),
      status: 'Pending Payment'
    };

    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      localStorage.setItem('dano_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (e) {
      console.error('Error saving order to localStorage:', e);
    }

    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      navigate(`/order-success/${newOrderId}`, { state: { order: newOrder } });
    }, 500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-white">Order Checkout</h1>
        <p className="text-xs text-slate-400">Complete your information to finalize your manual payment order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleOrderSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Right Column: Order Summary Box */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="font-bold text-sm text-white uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Order Items ({cart.length})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center justify-between text-xs border-b border-slate-800/60 pb-2">
                  <div className="min-w-0 flex-1 pr-2">
                    <p className="font-bold text-slate-200 truncate">{item.name}</p>
                    {item.package && (
                      <span className="text-[10px] text-cyan-400 font-semibold">{item.package}</span>
                    )}
                    <span className="text-[10px] text-slate-500 block">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-black text-slate-100">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Subtotal:</span>
                <span className="font-bold text-slate-200">{formatPrice(getCartTotal())}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Manual Payment Fee:</span>
                <span className="font-bold text-emerald-400">0 IQD</span>
              </div>
              <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
                <span>Total Due:</span>
                <span className="text-cyan-400">{formatPrice(getCartTotal())}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Safe Kurdistan Manual Payment</span>
            </div>
            <p>
              After placing your order, you will receive payment details (FastPay / Korek / MasterCard) and contact links to confirm your payment with our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
