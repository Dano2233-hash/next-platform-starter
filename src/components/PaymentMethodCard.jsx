import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export function PaymentMethodCard({ id, name, details, selected, onSelect, badge }) {
  return (
    <div
      onClick={() => onSelect(id)}
      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
        selected
          ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-500/10'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 p-1 rounded-full ${selected ? 'text-cyan-400' : 'text-slate-600'}`}>
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-white">{name}</h4>
            {badge && (
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{details}</p>
        </div>
      </div>
    </div>
  );
}
