import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

export default function PaymentMethodCard({
  id,
  title,
  description,
  badge,
  selected,
  onSelect
}) {
  return (
    <div
      onClick={() => onSelect(id)}
      className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
        selected
          ? 'bg-slate-900/90 border-cyan-500 shadow-md shadow-cyan-500/10'
          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
      }`}
    >
      <div className="mt-0.5">
        {selected ? (
          <CheckCircle className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
        ) : (
          <Circle className="w-5 h-5 text-slate-600" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-bold text-sm text-slate-100">{title}</h4>
          {badge && (
            <span className="bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
