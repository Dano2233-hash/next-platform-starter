import React from 'react';
import { Check } from 'lucide-react';

export default function PaymentMethodCard({ method, selectedMethod, onSelect }) {
  const isSelected = selectedMethod === method.id;

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
        isSelected
          ? 'bg-blue-950/40 border-cyan-500 shadow-lg shadow-cyan-950/30'
          : 'bg-[#0a0f24] border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-extrabold text-xs ${method.badgeClass || 'bg-slate-800 text-slate-200'}`}>
          {method.shortName}
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">{method.name}</h4>
          <p className="text-xs text-slate-400">{method.description}</p>
        </div>
      </div>

      <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
        isSelected ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700 text-transparent'
      }`}>
        <Check className="w-4 h-4 stroke-[3]" />
      </div>
    </div>
  );
}
