import React from 'react';
import { Check } from 'lucide-react';

export default function PaymentMethodCard({ method, selected, onSelect }) {
  const isSelected = selected === method.id;

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative border rounded-xl p-4 cursor-pointer transition-all ${
        isSelected
          ? 'bg-cyan-500/10 border-cyan-400 shadow-md shadow-cyan-500/10'
          : 'bg-slate-900/80 border-slate-800/80 hover:border-slate-700'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg font-bold text-xs ${method.badgeClass}`}>
            {method.badgeText}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100">{method.name}</h4>
            <p className="text-xs text-slate-400 mt-0.5">{method.description}</p>
          </div>
        </div>

        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
            isSelected
              ? 'bg-cyan-400 border-cyan-400 text-slate-950'
              : 'border-slate-700 bg-slate-950'
          }`}
        >
          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>
      </div>
    </div>
  );
}
