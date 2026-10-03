import React from 'react';
import { Check } from 'lucide-react';

export const PaymentMethodCard = ({ method, selectedMethod, onSelect }) => {
  const isSelected = selectedMethod === method.id;

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
        isSelected
          ? 'bg-gradient-to-r from-blue-950/40 via-cyan-950/30 to-slate-900 border-cyan-500 shadow-lg shadow-cyan-950/30'
          : 'bg-[#0a0e1a] hover:bg-[#0e1426] border-slate-800'
      }`}
    >
      <div className="flex items-center gap-3.5">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${method.bgClass} text-white border ${method.borderClass}`}>
          {method.iconText}
        </div>
        <div>
          <h4 className="font-bold text-sm text-white">{method.name}</h4>
          <p className="text-xs text-slate-400">{method.description}</p>
        </div>
      </div>

      <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
        isSelected ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700 bg-slate-900'
      }`}>
        {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
      </div>
    </div>
  );
};
