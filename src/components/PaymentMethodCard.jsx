import React from 'react';
import { Check } from 'lucide-react';

export default function PaymentMethodCard({ id, name, details, icon, isSelected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(id)}
      className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
        isSelected
          ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-950/50'
          : 'bg-[#090e1f] border-slate-800/80 hover:border-slate-700 hover:bg-[#0c1224]'
      }`}
    >
      <div className="flex items-center gap-3.5">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
          isSelected
            ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950'
            : 'bg-slate-900 text-slate-400 border border-slate-800'
        }`}>
          {icon}
        </div>
        <div>
          <h4 className="font-orbitron font-semibold text-sm text-slate-100">{name}</h4>
          <p className="text-xs text-slate-400 mt-0.5">{details}</p>
        </div>
      </div>

      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
        isSelected
          ? 'border-cyan-400 bg-cyan-400 text-slate-950'
          : 'border-slate-700 bg-slate-900'
      }`}>
        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
      </div>
    </div>
  );
}
