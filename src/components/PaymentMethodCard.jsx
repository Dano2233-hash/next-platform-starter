import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export const PAYMENT_METHODS = [
  {
    id: 'FastPay',
    name: 'FastPay Wallet',
    description: 'Instant transfer via FastPay Mobile App (Kurdistan / Iraq)',
    color: 'from-pink-900/40 to-rose-900/40 border-pink-500/50 text-pink-300',
    badge: 'FastPay'
  },
  {
    id: 'Korek',
    name: 'Korek Telecom Balance',
    description: 'Transfer directly using Korek Mobile credit / code',
    color: 'from-amber-900/40 to-yellow-900/40 border-amber-500/50 text-amber-300',
    badge: 'Korek'
  },
  {
    id: 'MasterCard',
    name: 'MasterCard / FIB Transfer',
    description: 'Direct MasterCard payment / First Iraqi Bank card transfer',
    color: 'from-blue-900/40 to-indigo-900/40 border-blue-500/50 text-blue-300',
    badge: 'MasterCard'
  }
];

export default function PaymentMethodCard({ selectedMethod, onSelectMethod }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
          Select Payment Method *
        </label>
        <span className="text-[11px] text-cyan-400 font-medium flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Manual Transfer
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;

          return (
            <div
              key={method.id}
              onClick={() => onSelectMethod(method.id)}
              className={`cursor-pointer rounded-xl p-3.5 border transition-all flex items-start gap-3 bg-gradient-to-r ${
                isSelected
                  ? 'bg-slate-900 border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="pt-0.5">
                <CheckCircle2
                  className={`w-5 h-5 ${
                    isSelected ? 'text-cyan-400 fill-cyan-400/20' : 'text-slate-600'
                  }`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-100">{method.name}</h4>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border uppercase tracking-wider bg-slate-950/80 ${method.color}`}>
                    {method.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{method.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
