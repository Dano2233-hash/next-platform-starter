import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export const PaymentMethodCard = ({ method, selected, onSelect }) => {
  const isSelected = selected === method.id;

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'bg-gradient-to-r from-cyan-950/60 to-slate-900 border-cyan-400 ring-1 ring-cyan-400 shadow-lg shadow-cyan-500/10'
          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg border flex items-center justify-center font-black text-xs ${method.logoBg}`}>
            {method.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-slate-100 text-sm">{method.name}</h4>
              {method.badge && (
                <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded bg-slate-800 text-cyan-300 border border-slate-700">
                  {method.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{method.description}</p>
          </div>
        </div>

        <div className="flex-shrink-0 mt-0.5">
          <CheckCircle2
            className={`w-5 h-5 transition-colors ${
              isSelected ? 'text-cyan-400 fill-cyan-400/20' : 'text-slate-700'
            }`}
          />
        </div>
      </div>

      {isSelected && (
        <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-300 flex items-center justify-between bg-slate-950/50 p-2.5 rounded-lg border border-cyan-500/20">
          <span className="text-slate-400 font-medium">Payment Transfer Number / Account:</span>
          <span className="font-mono font-bold text-cyan-300">{method.accountNumber}</span>
        </div>
      )}
    </div>
  );
};
