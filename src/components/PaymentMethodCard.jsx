import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export const PAYMENT_METHODS = [
  {
    id: 'FastPay',
    name: 'FastPay Wallet',
    tagline: 'Instant mobile wallet transfer in Kurdistan & Iraq',
    account: '+964 750 XXX XXXX',
    badge: 'Popular & Instant',
    color: 'from-cyan-500/10 to-blue-600/10 border-cyan-500/50 text-cyan-400'
  },
  {
    id: 'Korek',
    name: 'Korek Cash / Top-Up',
    tagline: 'Fast Korek balance or card code payment',
    account: '+964 770 XXX XXXX',
    badge: 'Direct Korek',
    color: 'from-amber-500/10 to-orange-600/10 border-amber-500/50 text-amber-400'
  },
  {
    id: 'MasterCard',
    name: 'FIB / MasterCard',
    tagline: 'Direct card & First Iraqi Bank transfer',
    account: 'FIB Account: 964750XXXXXXX',
    badge: 'Bank Transfer',
    color: 'from-purple-500/10 to-indigo-600/10 border-purple-500/50 text-purple-400'
  }
];

export default function PaymentMethodCard({ selectedMethod, onSelectMethod }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
        <span className="font-semibold text-slate-300">Select Manual Payment Method *</span>
        <span className="text-[11px] text-cyan-400">IQD Only</span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <div
              key={method.id}
              onClick={() => onSelectMethod(method.id)}
              className={`relative cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'border-cyan-400 bg-cyan-500/20' : 'border-slate-700'
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-100 text-sm">{method.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950 border ${method.color}`}>
                      {method.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{method.tagline}</p>
                </div>
              </div>

              <div className="hidden sm:block text-right">
                <span className="text-[11px] font-bold text-slate-300 block">Manual Transfer</span>
                <span className="text-[10px] text-emerald-400">Fast Verification</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 mt-2">
        <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p>
          Payment instructions will be provided on the order confirmation screen. No online payment processing fee is charged.
        </p>
      </div>
    </div>
  );
}
