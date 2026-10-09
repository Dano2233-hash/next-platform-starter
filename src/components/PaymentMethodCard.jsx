import React from 'react';
import { CheckCircle2, CreditCard, PhoneCall, Wallet } from 'lucide-react';

export const PAYMENT_METHODS = [
  {
    id: 'FastPay',
    name: 'FastPay',
    description: 'FastPay Wallet Transfer (Kurdistan & Iraq)',
    accountInfo: 'FastPay Number: 0750 XXX XXXX',
    icon: Wallet,
    badgeColor: 'border-yellow-500/40 text-yellow-400'
  },
  {
    id: 'Korek',
    name: 'Korek Telecom',
    description: 'Korek Cash / Balance Transfer',
    accountInfo: 'Korek Line: 0750 XXX XXXX',
    icon: PhoneCall,
    badgeColor: 'border-red-500/40 text-red-400'
  },
  {
    id: 'MasterCard',
    name: 'MasterCard',
    description: 'Local MasterCard / Bank Transfer',
    accountInfo: 'Card Number provided upon order submission',
    icon: CreditCard,
    badgeColor: 'border-blue-500/40 text-blue-400'
  }
];

export default function PaymentMethodCard({ selectedMethod, onSelectMethod }) {
  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
        Select Manual Payment Method *
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          const Icon = method.icon;

          return (
            <div
              key={method.id}
              onClick={() => onSelectMethod(method.id)}
              className={`cursor-pointer p-4 rounded-xl border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-cyan-950/40 to-blue-950/40 border-cyan-500 shadow-md shadow-cyan-950/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg bg-slate-950 border ${method.badgeColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-cyan-400 bg-cyan-500' : 'border-slate-700'}`}>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-slate-950 fill-cyan-400" />}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-slate-100">{method.name}</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  {method.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
