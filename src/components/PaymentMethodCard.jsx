import React from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import { Check } from 'lucide-react';

export const PaymentMethodCard = ({ selectedMethod, onSelectMethod }) => {
  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
        Select Payment Method *
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;

          return (
            <div
              key={method.id}
              onClick={() => onSelectMethod(method.id)}
              className={`relative p-4 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-extrabold border ${method.badgeColor}`}>
                  {method.logoText}
                </span>

                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                    isSelected ? 'bg-cyan-400 border-cyan-400 text-slate-950' : 'border-slate-700'
                  }`}
                >
                  {isSelected && <Check size={12} strokeWidth={3} />}
                </div>
              </div>

              <h4 className="font-heading font-bold text-sm text-slate-100">{method.name}</h4>
              <p className="text-[11px] text-cyan-400 font-mono mt-1 font-bold">{method.accountNumber}</p>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {method.instructions}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethodCard;
