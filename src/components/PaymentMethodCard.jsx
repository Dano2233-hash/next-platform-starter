import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function PaymentMethodCard({ id, name, description, icon, isSelected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(id)}
      className={`relative cursor-pointer p-4 rounded-xl border transition-all duration-200 flex items-start gap-3 ${
        isSelected
          ? 'bg-slate-900 border-cyan-500 ring-1 ring-cyan-500/50'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
      }`}
    >
      <div className={`p-2.5 rounded-lg border shrink-0 ${isSelected ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
        {icon}
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-sm text-slate-100">{name}</h4>
          {isSelected && <CheckCircle className="w-5 h-5 text-cyan-400" />}
        </div>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
