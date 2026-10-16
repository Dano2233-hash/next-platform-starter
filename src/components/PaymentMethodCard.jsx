import React from 'react';
import { CheckCircle } from 'lucide-react';

export const PaymentMethodCard = ({ method, selected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
        selected
          ? 'bg-slate-900/90 border-cyan-500 ring-1 ring-cyan-500 shadow-lg shadow-cyan-950/30'
          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${method.color}`} />
        <div>
          <h4 className="text-sm font-bold text-slate-100">{method.name}</h4>
          <p className="text-xs text-slate-400 mt-0.5">{method.description}</p>
        </div>
      </div>

      <div className="flex items-center">
        {selected ? (
          <CheckCircle className="w-5 h-5 text-cyan-400" />
        ) : (
          <div className="w-5 h-5 rounded-full border border-slate-700" />
        )}
      </div>
    </div>
  );
};
