import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export default function PaymentMethodCard({
  id,
  name,
  description,
  accountDetails,
  isSelected,
  onSelect,
  colorClass = 'from-blue-600 to-cyan-500'
}) {
  return (
    <div
      onClick={() => onSelect(id)}
      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
        isSelected
          ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/10'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full bg-gradient-to-r ${colorClass}`}
            />
            <h4 className="font-extrabold text-slate-100 text-sm md:text-base">
              {name}
            </h4>
          </div>
          {isSelected ? (
            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-slate-700 shrink-0" />
          )}
        </div>

        <p className="text-xs text-slate-400 leading-relaxed mb-3">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between text-[11px] font-semibold pt-2 border-t border-slate-800">
        <span className="text-cyan-400 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Fast Verification
        </span>
        <span className="text-slate-500">MANUAL TRANSFER</span>
      </div>

      {isSelected && accountDetails && (
        <div className="mt-3 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1 animate-in fade-in">
          <p className="text-slate-400 font-medium">Transfer to account / number:</p>
          <p className="font-mono font-bold text-cyan-300 select-all">{accountDetails}</p>
        </div>
      )}
    </div>
  );
}
