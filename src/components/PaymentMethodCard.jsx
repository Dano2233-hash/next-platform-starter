import React from 'react';
import { Check } from 'lucide-react';

export default function PaymentMethodCard({ method, selected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-start justify-between gap-3 ${
        selected
          ? 'bg-gradient-to-r ' + method.color + ' bg-opacity-30 border-cyan-400 shadow-lg shadow-cyan-500/10'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
            selected ? 'border-cyan-400 bg-cyan-500 text-black' : 'border-slate-600 bg-slate-800'
          }`}
        >
          {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>

        <div>
          <h4 className="font-bold text-slate-100 text-sm">{method.name}</h4>
          <p className="text-slate-400 text-xs mt-0.5">{method.description}</p>
          {selected && (
            <div className="mt-2 text-xs font-mono bg-slate-950/80 px-2.5 py-1 rounded text-cyan-300 border border-cyan-500/30 inline-block">
              {method.accountDetails}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
