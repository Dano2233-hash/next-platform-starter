import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';
import CheckoutForm from '../components/CheckoutForm';
import { ShoppingBag, ShieldCheck, Lock } from 'lucide-react';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handlePlaceOrder = (customerData) => {
    setIsSubmitting(true);

    const newOrder = {
      orderId: generateOrderId(),
      date: new Date().toISOString(),
      customer: customerData,
      items: cartItems,
      totalAmount: cartTotal,
      status: 'Pending Payment'
    };

    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      localStorage.setItem('dano_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (e) {
      console.error('Failed to save order to localStorage', e);
    }

    // Clear cart and navigate
    clearCart();
    setIsSubmitting(false);
    navigate('/order-success', { state: { order: newOrder } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-screen">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2">
          <Lock className="w-6 h-6 text-cyan-400" />
          <span>Checkout & Manual Payment</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete your customer details to generate your order number for FastPay / Korek / MasterCard.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmitOrder={handlePlaceOrder} isSubmitting={isSubmitting} />
        </div>

        {/* Right Col: Order Items Summary */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 sticky top-24">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <span>Items in Order</span>
            </h3>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="flex justify-between items-center text-xs">
                  <div>
                    <h4 className="font-bold text-slate-200">{item.product.name}</h4>
                    <p className="text-[11px] text-cyan-400">
                      {item.package?.name} x {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-slate-100">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Manual Payment Fee</span>
                <span className="text-emerald-400 font-bold">0 IQD</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-100 pt-2 border-t border-slate-800">
                <span>Total Amount</span>
                <span className="text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Your contact details are encrypted and saved securely for verification.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
