import React from 'react';
import { CreditCard, Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-react';

const paymentMethods = [
  {
    id: 'FastPay',
    name: 'FastPay',
    description: 'Instant transfer via FastPay Wallet (Kurdistan / Iraq)',
    icon: Smartphone,
    color: 'from-emerald-600/20 to-teal-900/40 border-emerald-500/40 text-emerald-400',
    badge: 'Popular'
  },
  {
    id: 'Korek',
    name: 'Korek Telecom',
    description: 'Korek Cash / Balance transfer',
    icon: Smartphone,
    color: 'from-amber-600/20 to-orange-900/40 border-amber-500/40 text-amber-400',
    badge: 'Local'
  },
  {
    id: 'MasterCard',
    name: 'MasterCard',
    description: 'Direct Iraqi MasterCard bank transfer',
    icon: CreditCard,
    color: 'from-blue-600/20 to-cyan-900/40 border-blue-500/40 text-blue-400',
    badge: 'Direct'
  }
];

export default function PaymentMethodCard({ selectedMethod, onSelectMethod }) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-bold text-slate-200">
        Select Payment Method <span className="text-rose-400">*</span>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {paymentMethods.map((method) => {
          const isSelected = selectedMethod === method.id;
          const IconComponent = method.icon;

          return (
            <div
              key={method.id}
              onClick={() => onSelectMethod(method.id)}
              className={`relative cursor-pointer p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'bg-gradient-to-br from-blue-900/40 via-slate-900 to-cyan-950/40 border-cyan-400 ring-2 ring-cyan-400/30 shadow-lg'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-slate-950 border ${method.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
                ) : (
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800">
                    {method.badge}
                  </span>
                )}
              </div>

              <div>
                <h4 className="font-bold text-slate-100 text-sm">{method.name}</h4>
                <p className="text-[11px] text-slate-400 leading-tight mt-0.5">{method.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
