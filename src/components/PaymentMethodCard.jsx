import React from 'react';
import { Check } from 'lucide-react';

export default function PaymentMethodCard({ method, selected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative p-4 rounded-2xl border cursor-pointer transition-all ${
        selected
          ? 'bg-slate-900/90 border-cyan-500 shadow-lg shadow-cyan-500/10'
          : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-100 text-sm">{method.name}</span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-[10px] font-bold text-cyan-400">
              {method.badge}
            </span>
          </div>
          <p className="text-xs text-slate-400">{method.description}</p>
          <div className="text-xs font-mono font-bold text-cyan-300 pt-1">
            Account: {method.accountNumber}
          </div>
        </div>

        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
            selected
              ? 'bg-cyan-500 border-cyan-500 text-slate-950'
              : 'border-slate-700 bg-slate-950'
          }`}
        >
          {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>
      </div>
    </div>
  );
}
