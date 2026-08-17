import React from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import { CheckCircle2, Circle, ShieldCheck } from 'lucide-react';

export default function PaymentMethodCard({ selectedMethod, onSelect }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;

          return (
            <div
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={`relative cursor-pointer p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between gap-3 ${
                isSelected
                  ? 'bg-slate-900 border-cyan-400 ring-1 ring-cyan-400/50 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="font-extrabold text-white text-sm">
                    {method.name}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5">
                    {method.description}
                  </span>
                </div>
                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-600 shrink-0" />
                )}
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">Account Info:</span>
                <span className="font-mono font-bold text-slate-200 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {method.accountNumber}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2 text-xs text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>
          Payment instructions will be shown after creating your order on the Order Success page.
        </span>
      </div>
    </div>
  );
}
