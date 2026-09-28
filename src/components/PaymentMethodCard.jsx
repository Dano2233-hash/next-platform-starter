import React from 'react';
import { Check } from 'lucide-react';

export const PaymentMethodCard = ({ method, selected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`cursor-pointer p-4 rounded-xl border transition-all ${
        selected
          ? 'bg-slate-900 border-cyan-500 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-500'
          : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
            {method.type}
          </span>
          <h4 className="font-extrabold text-sm text-white mt-0.5">{method.name}</h4>
          <p className="text-xs text-slate-400 mt-1">{method.description}</p>
        </div>

        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
            selected
              ? 'bg-cyan-500 border-cyan-400 text-slate-950'
              : 'border-slate-700 bg-slate-800'
          }`}
        >
          {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <span className="text-slate-400">Account / Wallet No:</span>
        <span className="font-mono font-bold text-slate-200 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
          {method.accountNumber}
        </span>
      </div>
    </div>
  );
};

export default PaymentMethodCard;
