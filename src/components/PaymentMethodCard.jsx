import React from 'react';
import { CheckCircle2, CreditCard, Smartphone, ShieldCheck } from 'lucide-react';

export const paymentMethods = [
  {
    id: 'fastpay',
    name: 'FastPay',
    type: 'Mobile Wallet',
    description: 'Direct transfer via FastPay account number in Iraq & Kurdistan.',
    badge: 'Popular in Kurdistan',
    color: 'from-cyan-600 to-blue-600',
    icon: Smartphone
  },
  {
    id: 'korek',
    name: 'Korek',
    type: 'Mobile Cash & Balance',
    description: 'Pay using Korek Telecom mobile transfer or cash voucher.',
    badge: 'Fast Reload',
    color: 'from-blue-600 to-indigo-600',
    icon: Smartphone
  },
  {
    id: 'mastercard',
    name: 'MasterCard',
    type: 'Credit / Debit Card',
    description: 'Manual transfer or card receipt verification.',
    badge: 'Secure',
    color: 'from-purple-600 to-pink-600',
    icon: CreditCard
  }
];

export const PaymentMethodCard = ({ method, selected, onSelect }) => {
  const Icon = method.icon;

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative cursor-pointer p-4 rounded-2xl border transition-all duration-200 ${
        selected
          ? 'bg-[#0d162a] border-cyan-400 shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-400/40'
          : 'bg-[#090e1a] border-slate-800 hover:border-slate-700 hover:bg-[#0b1222]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${method.color} p-0.5 shrink-0 flex items-center justify-center text-white shadow-md`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-extrabold text-white">{method.name}</h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                {method.badge}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{method.type}</p>
          </div>
        </div>

        <div className="shrink-0 mt-0.5">
          <CheckCircle2
            className={`w-5 h-5 transition-colors ${
              selected ? 'text-cyan-400 fill-cyan-400/20' : 'text-slate-600'
            }`}
          />
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-3 border-t border-slate-800/80 pt-2 leading-relaxed">
        {method.description}
      </p>
    </div>
  );
};
