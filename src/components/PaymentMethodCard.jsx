import React from 'react';
import { CreditCard, Smartphone, CheckCircle2 } from 'lucide-react';

/**
 * Payment Methods allowed: ONLY FastPay, Korek, MasterCard.
 * Qi Card, AsiaPay, ZainCash, Google Pay are explicitly forbidden.
 */
export const ALLOWED_PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    type: 'Mobile Wallet',
    description: 'Instant manual transfer via FastPay account or QR code.',
    phone: '0750 XXX XXXX',
    tag: 'Fast & Instant',
    color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400'
  },
  {
    id: 'korek',
    name: 'Korek Telecom',
    type: 'Mobile Balance',
    description: 'Direct Korek telecom balance transfer or recharge PIN.',
    phone: '0750 XXX XXXX',
    tag: 'Popular in Kurdistan',
    color: 'from-blue-600/20 to-cyan-500/10 border-cyan-500/30 text-cyan-400'
  },
  {
    id: 'mastercard',
    name: 'MasterCard',
    type: 'Card Transfer',
    description: 'Manual direct card transfer / FIB / Iraqi bank transfer.',
    phone: 'IBAN / Card Number provided upon order',
    tag: 'Direct Transfer',
    color: 'from-purple-600/20 to-indigo-500/10 border-purple-500/30 text-purple-400'
  }
];

export function PaymentMethodCard({ method, isSelected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative cursor-pointer p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
        isSelected
          ? 'bg-slate-800/90 border-cyan-500 ring-2 ring-cyan-500/40 shadow-lg shadow-cyan-950/30'
          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/60 text-slate-200">
            {method.id === 'mastercard' ? (
              <CreditCard className="w-5 h-5 text-purple-400" />
            ) : (
              <Smartphone className="w-5 h-5 text-cyan-400" />
            )}
          </div>
          <div>
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              {method.name}
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {method.type}
              </span>
            </h4>
            <span className="text-[11px] text-cyan-400/90 font-medium">
              {method.tag}
            </span>
          </div>
        </div>
        <div className="pt-0.5">
          <CheckCircle2
            className={`w-5 h-5 transition-colors ${
              isSelected ? 'text-cyan-400 fill-cyan-400/20' : 'text-slate-600'
            }`}
          />
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
        {method.description}
      </p>
    </div>
  );
}

export default PaymentMethodCard;
