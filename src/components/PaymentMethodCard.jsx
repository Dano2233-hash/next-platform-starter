import React from 'react';
import { CreditCard, Smartphone, Check } from 'lucide-react';

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    subtitle: 'Mobile Wallet Transfer',
    iconColor: 'text-rose-400',
    borderColor: 'border-rose-500/40',
    bgGradient: 'from-rose-950/30 to-slate-900',
    details: 'Send payment via FastPay account number after checkout.',
  },
  {
    id: 'korek',
    name: 'Korek Telecom',
    subtitle: 'Balance Transfer',
    iconColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    bgGradient: 'from-cyan-950/30 to-slate-900',
    details: 'Transfer mobile balance via Korek phone number.',
  },
  {
    id: 'mastercard',
    name: 'MasterCard / FIB',
    subtitle: 'First Iraqi Bank & Cards',
    iconColor: 'text-purple-400',
    borderColor: 'border-purple-500/40',
    bgGradient: 'from-purple-950/30 to-slate-900',
    details: 'Direct card transfer or FIB digital account transfer.',
  },
];

export default function PaymentMethodCard({ selectedMethod, onSelect }) {
  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
        Select Payment Method *
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <div
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={`relative cursor-pointer p-4 rounded-xl border transition-all flex flex-col justify-between bg-gradient-to-b ${
                isSelected
                  ? `border-cyan-400 ${method.bgGradient} shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400`
                  : 'border-slate-800/90 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
              <div className="flex items-center gap-2.5 mb-2">
                {method.id === 'mastercard' ? (
                  <CreditCard className={`w-5 h-5 ${method.iconColor}`} />
                ) : (
                  <Smartphone className={`w-5 h-5 ${method.iconColor}`} />
                )}
                <span className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                  {method.name}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                {method.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
