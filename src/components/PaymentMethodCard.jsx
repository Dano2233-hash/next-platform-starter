import React from 'react';
import { Check } from 'lucide-react';

export default function PaymentMethodCard({
  id,
  title,
  subtitle,
  icon: Icon,
  isSelected,
  onSelect
}) {
  return (
    <div
      onClick={() => onSelect(id)}
      className={`cursor-pointer p-4 rounded-xl border transition-all flex items-center justify-between ${
        isSelected
          ? 'bg-gradient-to-r from-blue-950/60 to-cyan-950/40 border-cyan-400 shadow-lg shadow-cyan-500/10'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`p-2.5 rounded-lg border ${
            isSelected
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
              : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-white text-sm">{title}</h4>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
      </div>

      <div
        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
          isSelected
            ? 'bg-cyan-500 border-cyan-400 text-slate-950'
            : 'border-slate-700 bg-slate-950'
        }`}
      >
        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
      </div>
    </div>
  );
}
