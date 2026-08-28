import React from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import { CheckCircle2, Circle } from 'lucide-react';

export function PaymentMethodCard({ selectedMethod, onSelectMethod }) {
  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
        Select Local Payment Method <span className="text-rose-500">*</span>
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <div
              key={method.id}
              onClick={() => onSelectMethod(method.id)}
              className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-950/40'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{method.name}</h4>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-cyan-400 border border-slate-700">
                    {method.badge}
                  </span>
                </div>
                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-600 shrink-0" />
                )}
              </div>

              <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 space-y-1">
                <p className="font-mono text-slate-300 font-medium">{method.accountNumber}</p>
                <p className="line-clamp-2 leading-relaxed">{method.instructions}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PaymentMethodCard;
