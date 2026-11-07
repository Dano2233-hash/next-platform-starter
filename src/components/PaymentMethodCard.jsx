import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export function PaymentMethodCard({ method, isSelected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-200 select-none ${
        isSelected
          ? 'bg-gradient-to-r from-blue-950/60 to-cyan-950/40 border-cyan-500 ring-1 ring-cyan-500 shadow-lg shadow-cyan-500/10'
          : 'bg-[#0d1222] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm bg-gradient-to-br ${method.color}`}>
            {method.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 text-sm sm:text-base">
                {method.name}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400 border border-slate-700">
                {method.badge}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              Account: <span className="text-slate-200 font-semibold">{method.accountNumber}</span>
            </p>
          </div>
        </div>

        <div className="pt-1">
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
              isSelected ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700 bg-slate-900'
            }`}
          >
            {isSelected && <CheckCircle2 className="w-4 h-4 fill-slate-950 text-cyan-400" />}
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-3 pt-2.5 border-t border-slate-800/80">
        {method.description}
      </p>
    </div>
  );
}

export default PaymentMethodCard;
