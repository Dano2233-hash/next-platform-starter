import React from 'react';
import { Check, ShieldCheck, Zap } from 'lucide-react';

export const PaymentMethodCard = ({ id, name, description, selected, onSelect, badge }) => {
  return (
    <div
      onClick={() => onSelect(id)}
      className={`cursor-pointer rounded-xl p-4 border transition-all flex items-start gap-3.5 relative ${
        selected
          ? 'bg-cyan-950/30 border-cyan-500 shadow-md shadow-cyan-500/10'
          : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800'
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
          selected
            ? 'border-cyan-400 bg-cyan-400 text-black'
            : 'border-slate-600 bg-slate-950'
        }`}
      >
        {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-bold text-white">{name}</h4>
          {badge && (
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
