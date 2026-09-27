import React from 'react';
import { CheckCircle2, CreditCard, Smartphone, ShieldCheck } from 'lucide-react';

export default function PaymentMethodCard({ method, selected, onSelect }) {
  if (!method) return null;

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
        selected
          ? 'bg-gradient-to-br from-blue-950/80 via-indigo-950/80 to-slate-900 border-cyan-400 shadow-lg shadow-cyan-950/50 scale-[1.01]'
          : 'bg-[#090d1a] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
      }`}
    >
      {/* Selected Indicator */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${method.color} p-[1px] shadow-md`}
          >
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-black text-cyan-400 text-xs tracking-wider">
              {method.logoText}
            </div>
          </div>
          <div>
            <h4 className="text-slate-100 font-extrabold text-base">{method.name}</h4>
            <span className="text-xs text-slate-400 font-mono">Account: {method.account}</span>
          </div>
        </div>

        <div className="mt-1">
          {selected ? (
            <div className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4 text-black stroke-[3]" />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full border-2 border-slate-700" />
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400 leading-relaxed flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>{method.instructions}</span>
      </div>
    </div>
  );
}
