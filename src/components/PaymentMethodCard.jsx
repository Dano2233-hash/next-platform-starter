import React from 'react';
import { Smartphone, CreditCard, Check, ShieldCheck } from 'lucide-react';

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    subtitle: 'Kurdistan & Iraq Mobile Wallet',
    badge: 'Instant Transfer',
    icon: Smartphone,
    color: 'from-cyan-500/20 to-blue-600/10 border-cyan-500/40 text-cyan-300'
  },
  {
    id: 'korek',
    name: 'Korek',
    subtitle: 'Korek Cash / Direct Balance Transfer',
    badge: 'Popular',
    icon: Smartphone,
    color: 'from-red-600/20 to-amber-600/10 border-red-500/40 text-red-300'
  },
  {
    id: 'mastercard',
    name: 'MasterCard',
    subtitle: 'FIB / Local Bank MasterCard',
    badge: 'Card Payment',
    icon: CreditCard,
    color: 'from-purple-600/20 to-blue-600/10 border-purple-500/40 text-purple-300'
  }
];

const PaymentMethodCard = ({ selectedMethod, onSelectMethod }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <span>Select Payment Method</span>
          <span className="text-red-400">*</span>
        </label>
        <span className="text-[11px] text-cyan-400 font-medium flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Manual Payment Instructions Provided
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          const IconComp = method.icon;

          return (
            <div
              key={method.id}
              onClick={() => onSelectMethod(method.id)}
              className={`relative cursor-pointer p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? `bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400`
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${method.color}`}>
                  <IconComp className="w-5 h-5" />
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {method.badge}
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-cyan-400 border-cyan-400 text-slate-950'
                        : 'border-slate-600 bg-slate-950'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-100 text-sm">{method.name}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{method.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethodCard;
