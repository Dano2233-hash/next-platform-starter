import React from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import { Check, ShieldCheck } from 'lucide-react';

export const PaymentMethodCard = ({ selectedMethod, onSelectMethod }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
          Select Manual Payment Method *
        </label>
        <span className="text-[11px] text-cyan-400 font-medium flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Direct Transfer Only
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <div
              key={method.id}
              onClick={() => onSelectMethod(method.id)}
              className={`relative cursor-pointer p-4 rounded-xl border transition-all ${
                isSelected
                  ? 'bg-slate-900 border-cyan-400 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-500'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className={`inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded text-white bg-gradient-to-r ${method.color} mb-1.5`}>
                    {method.badge}
                  </span>
                  <h4 className="font-bold text-slate-100 text-sm">{method.name}</h4>
                  <p className="text-[11px] text-slate-400">{method.type}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-cyan-500 border-cyan-400 text-slate-950 font-black'
                      : 'border-slate-700 bg-slate-950'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-slate-800/60">
                <p className="text-[11px] text-slate-400 font-mono">
                  Account: <span className="text-slate-200 font-bold">{method.accountNumber}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
