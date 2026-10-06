import React from 'react';
import { CheckCircle2, Smartphone, CreditCard, Radio } from 'lucide-react';

export const PAYMENT_METHODS = [
  {
    id: 'FastPay',
    name: 'FastPay',
    description: 'FastPay Wallet Transfer (Erbil, Sulaymaniyah, Duhok & Iraq)',
    icon: Smartphone,
    color: 'from-cyan-600/20 to-blue-600/20 border-cyan-500/40 text-cyan-400',
    number: '+964 750 XXX XXXX'
  },
  {
    id: 'Korek',
    name: 'Korek Cash / Balance',
    description: 'Korek Telecom Balance / Mobile Transfer',
    icon: Radio,
    color: 'from-amber-600/20 to-orange-600/20 border-amber-500/40 text-amber-400',
    number: '+964 750 XXX XXXX'
  },
  {
    id: 'MasterCard',
    name: 'MasterCard / Visa',
    description: 'MasterCard & First Iraqi Bank (FIB) Card Transfer',
    icon: CreditCard,
    color: 'from-blue-600/20 to-indigo-600/20 border-blue-500/40 text-blue-400',
    number: 'XXXX-XXXX-XXXX-XXXX'
  }
];

export const PaymentMethodCard = ({ selectedMethod, onSelect }) => {
  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
        Select Payment Method <span className="text-rose-500">*</span>
      </label>

      <div className="grid grid-cols-1 gap-3">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          const Icon = method.icon;

          return (
            <div
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                isSelected
                  ? `bg-gradient-to-r ${method.color} shadow-lg shadow-cyan-950/20 ring-1 ring-cyan-500`
                  : 'bg-[#090d1a] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`p-2.5 rounded-xl border ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{method.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{method.description}</p>
                </div>
              </div>

              <div className="ml-3 shrink-0">
                <CheckCircle2
                  className={`w-5 h-5 ${
                    isSelected ? 'text-cyan-400 fill-cyan-950' : 'text-slate-700'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
