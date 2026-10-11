import React from 'react';
import { Smartphone, CreditCard, ShieldCheck } from 'lucide-react';

export default function PaymentMethodCard({ id, name, description, selected, onSelect, badge }) {
  return (
    <div
      onClick={() => onSelect(id)}
      className={`relative p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-start gap-4 ${
        selected
          ? 'bg-gradient-to-r from-slate-900 via-slate-900 to-[#0c1836] border-cyan-500 ring-1 ring-cyan-500 shadow-lg shadow-cyan-950/40'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
      }`}
    >
      {/* Radio Circle */}
      <div className="mt-1">
        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
            selected ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600 bg-slate-950'
          }`}
        >
          {selected && <div className="w-2 h-2 rounded-full bg-slate-950" />}
        </div>
      </div>

      {/* Payment Details */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-heading font-bold text-slate-100 text-sm flex items-center gap-2">
            {name}
          </h4>
          {badge && (
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-cyan-950/80 border border-cyan-800/60 text-cyan-300">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
