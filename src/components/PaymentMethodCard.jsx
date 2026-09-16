import React from 'react';
import { Check, ShieldCheck } from 'lucide-react';

export default function PaymentMethodCard({ method, selected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative cursor-pointer rounded-2xl p-4 border transition-all duration-200 ${
        selected
          ? 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-500/10'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center text-white font-black text-xs shadow-md`}
          >
            {method.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">{method.name}</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-cyan-400 border border-slate-700">
                {method.badge}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{method.description}</p>
          </div>
        </div>

        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
            selected ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700 bg-slate-800'
          }`}
        >
          {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>
      </div>

      {selected && (
        <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-cyan-200 bg-cyan-950/30 -mx-4 -mb-4 p-3 rounded-b-2xl border-cyan-500/20 flex items-center justify-between">
          <span>Account / Details: <strong className="font-mono text-cyan-400">{method.accountNumber}</strong></span>
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
        </div>
      )}
    </div>
  );
}
