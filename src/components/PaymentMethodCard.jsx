import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export const PAYMENT_METHODS = [
  {
    id: 'FastPay',
    name: 'FastPay Mobile Wallet',
    description: 'Instant transfer via FastPay account number in Iraq / Kurdistan.',
    accountInfo: 'FastPay Wallet: 0750 000 0000',
    color: 'from-amber-500/20 to-orange-600/10 border-amber-500/50',
    iconText: 'FP',
  },
  {
    id: 'Korek',
    name: 'Korek Telecom Balance',
    description: 'Direct Korek credit transfer or card code payment.',
    accountInfo: 'Korek Number: 0750 000 0000',
    color: 'from-blue-500/20 to-cyan-600/10 border-blue-500/50',
    iconText: 'KOREK',
  },
  {
    id: 'MasterCard',
    name: 'MasterCard / Visa Card',
    description: 'Manual MasterCard bank transfer / FIB / Card code payment.',
    accountInfo: 'Card Transfer: FIB / MasterCard 0750 000 0000',
    color: 'from-purple-500/20 to-indigo-600/10 border-purple-500/50',
    iconText: 'MC',
  },
];

export default function PaymentMethodCard({ selectedMethod, onSelect }) {
  return (
    <div className="space-y-3">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-cyan-400" />
        Select Manual Payment Method
      </h4>

      <div className="grid grid-cols-1 gap-3">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <div
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={`relative p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                isSelected
                  ? `bg-gradient-to-r ${method.color} border-cyan-400 shadow-md shadow-cyan-950/40`
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-700/80 flex items-center justify-center font-extrabold text-xs text-cyan-400 shrink-0">
                  {method.iconText}
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-100">{method.name}</h5>
                  <p className="text-xs text-slate-400 mt-0.5">{method.description}</p>
                  <p className="text-[11px] font-semibold text-cyan-300 mt-1 bg-slate-950/60 inline-block px-2 py-0.5 rounded border border-slate-800">
                    {method.accountInfo}
                  </p>
                </div>
              </div>

              <div className="shrink-0 mt-0.5">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected
                      ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                      : 'border-slate-700 bg-slate-900'
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
