import React from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const PaymentMethodCard = ({ method, selectedMethod, onSelect }) => {
  const isSelected = selectedMethod === method.id;

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
        isSelected
          ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-950/40'
          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
            isSelected ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'
          }`}>
            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-sm">{method.name}</h4>
            <p className="text-xs text-slate-400 mt-0.5">{method.description}</p>
          </div>
        </div>

        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/80">
          {method.badge}
        </span>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span className="font-mono text-[11px] text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
          Account: {method.accountNumber}
        </span>
        <span className="text-[10px] text-cyan-400 font-medium">Kurdistan / Iraq</span>
      </div>
    </div>
  );
};
