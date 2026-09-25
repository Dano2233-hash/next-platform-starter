import React from 'react';
import { Check, ShieldCheck } from 'lucide-react';

export default function PaymentMethodCard({ method, selectedMethodId, onSelect }) {
  const isSelected = selectedMethodId === method.id;

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`cursor-pointer rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between relative overflow-hidden ${
        isSelected
          ? 'bg-gradient-to-r from-[#0d1733] to-[#091024] border-cyan-400 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/50'
          : 'bg-[#090d1a] border-slate-800 hover:border-slate-700 hover:bg-[#0c1224]'
      }`}
    >
      <div>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-slate-100">{method.name}</span>
            {method.tag && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-md uppercase">
                {method.tag}
              </span>
            )}
          </div>

          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
              isSelected
                ? 'bg-cyan-500 border-cyan-400 text-black'
                : 'border-slate-700 bg-slate-900'
            }`}
          >
            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed mb-3">
          {method.description}
        </p>
      </div>

      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1 font-medium text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Manual Transfer</span>
        </span>
        <span className="font-semibold text-cyan-300">{method.accountInfo}</span>
      </div>
    </div>
  );
}
