import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ShoppingBag, Lock, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import CheckoutForm from '../components/CheckoutForm';

export const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-24 space-y-4">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-slate-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-100">Your Cart is Empty</h2>
        <p className="text-slate-400 text-sm">Please add digital products or top-ups before proceeding to checkout.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Go To Catalog
        </Link>
      </div>
    );
  }

  const handleOrderSubmit = (customerDetails) => {
    setIsSubmitting(true);
    const orderId = generateOrderId();
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: customerDetails,
      items: cart,
      totalPrice,
      status: 'Pending Payment'
    };

    // Save order to Local Storage
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      localStorage.setItem('dano_orders', JSON.stringify([newOrder, ...savedOrders]));
      sessionStorage.setItem('dano_latest_order', JSON.stringify(newOrder));
    } catch (e) {
      console.error('Failed to save order to localStorage', e);
    }

    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      navigate(`/order-success/${orderId}`);
    }, 600);
  };

  return (
    <div className="space-y-8 pb-16 pt-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Lock className="w-6 h-6 text-cyan-400" />
            Checkout & Order Processing
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manual local payment for Kurdistan & Iraq gamers. FastPay, Korek, and MasterCard only.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmitOrder={handleOrderSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4 sticky top-20">
            <h3 className="text-base font-extrabold text-slate-100 border-b border-slate-800 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Order Summary ({cart.length} items)
            </h3>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-slate-200">{item.name}</div>
                    <div className="text-[11px] text-cyan-400">Pkg: {item.selectedPackageName} × {item.quantity}</div>
                  </div>
                  <div className="font-extrabold text-slate-300">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-200">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Digital Delivery Fee</span>
                <span className="font-semibold text-emerald-400">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-100 pt-2 border-t border-slate-800">
                <span>Total Amount Due</span>
                <span className="text-cyan-300 text-base">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
