import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import CheckoutForm from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';

export default function Checkout() {
  const { cart, cartTotal } = useCart();

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            <span>Checkout & Payment</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Complete your customer details and select your local payment method in Kurdistan / Iraq.
          </p>
        </div>

        <Link
          to="/cart"
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cart</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Form Column */}
        <div className="lg:col-span-8">
          <CheckoutForm />
        </div>

        {/* Right Order Summary Mini-Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-[#0a0e1c] p-5 rounded-2xl border border-slate-800 space-y-4 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-extrabold uppercase text-slate-200 tracking-wider flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-cyan-400" />
                <span>Order Summary</span>
              </h3>
              <span className="text-xs font-bold text-cyan-400">
                {cart.length} item{cart.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center justify-between gap-2 text-xs">
                  <div className="min-w-0">
                    <p className="font-bold text-slate-200 truncate">{item.name}</p>
                    <p className="text-[10px] text-cyan-400">
                      {item.packageName} x {item.quantity}
                    </p>
                  </div>
                  <span className="font-extrabold text-white shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Delivery Fee</span>
                <span className="text-emerald-400 font-bold">FREE</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between font-black text-sm text-white">
                <span>Total Amount</span>
                <span className="text-cyan-400 text-base">{formatPrice(cartTotal)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
