import React from 'react';
import { Check } from 'lucide-react';

export default function PaymentMethodCard({ method, selected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative cursor-pointer p-5 rounded-2xl border transition-all duration-300 ${
        selected
          ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/10'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center font-black text-white text-xs shadow-md`}
          >
            {method.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-sm">{method.name}</h4>
            <p className="text-xs text-slate-400 mt-0.5">{method.description}</p>
          </div>
        </div>

        <div
          className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
            selected
              ? 'bg-cyan-400 border-cyan-400 text-slate-950'
              : 'border-slate-700 bg-slate-800'
          }`}
        >
          {selected && <Check className="w-4 h-4 stroke-[3]" />}
        </div>
      </div>
    </div>
  );
}
