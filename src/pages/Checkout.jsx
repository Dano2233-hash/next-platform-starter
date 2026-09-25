import React from 'react';
import CheckoutForm from '../components/CheckoutForm';
import { ShieldCheck, Lock } from 'lucide-react';

export default function Checkout() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

      {/* Header */}
      <div className="border-b border-slate-800/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Checkout Order</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Complete your order details and choose your preferred local Kurdistan/Iraq payment method.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#090d1a] border border-cyan-500/30 rounded-xl text-xs font-semibold text-cyan-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Manual Payment Verification</span>
        </div>
      </div>

      {/* Main Checkout Form Component */}
      <CheckoutForm />

    </div>
  );
}
