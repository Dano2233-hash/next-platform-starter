import React from 'react';
import CheckoutForm from '../components/CheckoutForm';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Checkout() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link to="/cart" className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-cyan-300 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Cart
          </Link>
          <h1 className="text-2xl font-black text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-cyan-400" /> Secure Checkout
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete your order with local IQD payment methods in Kurdistan & Iraq.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-[#090d1c] border border-slate-800 px-3 py-1.5 rounded-xl">
          <span>Accepted:</span>
          <span className="text-amber-400">FastPay</span> •
          <span className="text-blue-400">Korek</span> •
          <span className="text-purple-400">MasterCard</span>
        </div>
      </div>

      <CheckoutForm />
    </div>
  );
}
