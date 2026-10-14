import React from 'react';
import { CheckCircle2, Zap } from 'lucide-react';

export default function PaymentMethodCard({
  id,
  title,
  subtitle,
  icon: Icon = Zap,
  badge,
  selected,
  onSelect,
}) {
  return (
    <div
      onClick={() => onSelect(id)}
      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between gap-3 ${
        selected
          ? 'bg-cyan-950/30 border-cyan-500 shadow-md shadow-cyan-500/10'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
      }`}
    >
      <div className="flex items-center gap-3.5">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
            selected
              ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 border-cyan-300'
              : 'bg-slate-950 text-slate-400 border-slate-800'
          }`}
        >
          <Icon className="w-6 h-6" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-white">{title}</h4>
            {badge && (
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
        </div>
      </div>

      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${
          selected
            ? 'bg-cyan-500 text-slate-950 border-cyan-400'
            : 'border-slate-700 bg-slate-950 text-transparent'
        }`}
      >
        <CheckCircle2 className="w-5 h-5 fill-current" />
      </div>
    </div>
  );
}
