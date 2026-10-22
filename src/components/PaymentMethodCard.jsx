import React from 'react';
import { Check, ShieldCheck, CreditCard, Smartphone, Zap } from 'lucide-react';

export const paymentMethods = [
  {
    id: 'fastpay',
    name: 'FastPay',
    subtitle: 'Mobile Wallet Transfer',
    icon: Smartphone,
    color: 'emerald',
    badge: 'Instant Transfer',
    accountNumber: '+964 750 XXX XXXX'
  },
  {
    id: 'korek',
    name: 'Korek',
    subtitle: 'Korek Cash / Balance',
    icon: Zap,
    color: 'cyan',
    badge: 'Popular in Kurdistan',
    accountNumber: '+964 750 XXX XXXX'
  },
  {
    id: 'mastercard',
    name: 'MasterCard',
    subtitle: 'Direct Card Transfer / FIB',
    icon: CreditCard,
    color: 'amber',
    badge: 'Bank Card / FIB',
    accountNumber: '5358 **** **** 8821'
  }
];

export const PaymentMethodCard = ({ selectedMethod, onSelectMethod }) => {
  return (
    <div className="space-y-3">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
        Select Manual Payment Method <span className="text-rose-500">*</span>
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {paymentMethods.map((method) => {
          const IconComponent = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <div
              key={method.id}
              onClick={() => onSelectMethod(method.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col justify-between relative ${
                isSelected
                  ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg bg-slate-800 text-cyan-400`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                {isSelected ? (
                  <div className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-bold">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-700" />
                )}
              </div>

              <div>
                <h4 className="font-extrabold text-sm text-slate-100">{method.name}</h4>
                <p className="text-[11px] text-slate-400 font-medium">{method.subtitle}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                <span className="text-cyan-400 font-bold">{method.badge}</span>
                <span className="text-slate-500 uppercase">Manual</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
