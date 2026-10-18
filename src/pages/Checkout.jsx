import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import CheckoutForm from '../components/CheckoutForm';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export default function Checkout() {
  const { cart, cartTotal } = useCart();

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 font-bold mb-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Checkout & Manual Payment
          </h1>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4" />
          <span>Manual FastPay / Korek / MasterCard</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7">
          <CheckoutForm />
        </div>

        {/* Order Summary Right Column */}
        <div className="lg:col-span-5 bg-[#0b0f1d] border border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
            Selected Items ({cart.length})
          </h3>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.cartKey} className="flex items-center justify-between gap-3 text-xs border-b border-slate-800/60 pb-3">
                <div className="min-w-0">
                  <h4 className="font-bold text-white line-clamp-1">{item.name}</h4>
                  <p className="text-slate-400 text-[11px]">
                    Package: {item.selectedPackage} × {item.quantity}
                  </p>
                </div>
                <span className="font-extrabold text-cyan-400 shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-4 space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Subtotal</span>
              <span className="text-white font-bold">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Digital Processing Fee</span>
              <span className="text-emerald-400 font-bold">0 IQD</span>
            </div>
            <div className="border-t border-slate-800/80 pt-3 flex justify-between items-baseline">
              <span className="text-white font-black text-sm">Total Payable</span>
              <span className="text-cyan-400 font-black text-xl">{formatPrice(cartTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
