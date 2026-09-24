import React from 'react';
import { CheckCircle2, CreditCard } from 'lucide-react';

export default function PaymentMethodCard({ id, name, description, selected, onSelect, badge }) {
  return (
    <div
      onClick={() => onSelect(id)}
      className={`relative p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
        selected
          ? 'bg-slate-900/90 border-cyan-400 shadow-md shadow-cyan-500/10'
          : 'bg-[#0c1021] border-[#1a223e] hover:border-slate-700'
      }`}
    >
      <div
        className={`p-2.5 rounded-lg border ${
          selected
            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
            : 'bg-slate-900 text-slate-400 border-slate-800'
        }`}
      >
        <CreditCard className="w-5 h-5" />
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-sm text-slate-100">{name}</h4>
          {badge && (
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{description}</p>
      </div>

      {selected && (
        <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 self-center" />
      )}
    </div>
  );
}
