import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function PaymentMethodCard({
  id,
  name,
  description,
  accountNumber,
  accountHolder,
  colorScheme = 'emerald',
  isSelected,
  onSelect,
}) {
  const colorMap = {
    emerald: {
      activeBorder: 'border-emerald-500 bg-emerald-950/20 text-emerald-400',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      radio: 'bg-emerald-500',
    },
    amber: {
      activeBorder: 'border-amber-500 bg-amber-950/20 text-amber-400',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      radio: 'bg-amber-500',
    },
    rose: {
      activeBorder: 'border-rose-500 bg-rose-950/20 text-rose-400',
      badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      radio: 'bg-rose-500',
    },
  };

  const scheme = colorMap[colorScheme] || colorMap.emerald;

  return (
    <div
      onClick={() => onSelect(id)}
      className={`relative cursor-pointer p-4 rounded-2xl border transition-all duration-200 select-none ${
        isSelected
          ? `${scheme.activeBorder} shadow-lg shadow-black/40`
          : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80 text-slate-300'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
              isSelected
                ? 'border-cyan-400 bg-cyan-500'
                : 'border-slate-600 bg-slate-800'
            }`}
          >
            {isSelected && <div className="w-2 h-2 rounded-full bg-slate-950" />}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-white text-sm">{name}</h4>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${scheme.badge}`}>
                Manual
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{description}</p>
          </div>
        </div>
      </div>

      {/* Account Info Box (Displayed when selected) */}
      {isSelected && (
        <div className="mt-3.5 pt-3 border-t border-slate-800/80 text-xs space-y-1 text-slate-300">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Send to Number/ID:</span>
            <span className="font-mono font-bold text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              {accountNumber}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Account Name:</span>
            <span className="font-semibold text-slate-200">{accountHolder}</span>
          </div>
        </div>
      )}
    </div>
  );
}
