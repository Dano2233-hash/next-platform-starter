import React from 'react';
import { CreditCard, CheckCircle2 } from 'lucide-react';

export default function PaymentMethodCard({ method, isSelected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`p-4 rounded-lg border transition-all duration-200 flex items-start gap-3 cursor-pointer select-none ${
        isSelected
          ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
          : 'bg-[#050507] border-white/5 hover:border-white/10 hover:bg-white/5'
      }`}
    >
      <div className="mt-0.5">
        <CreditCard className={`h-5 w-5 ${isSelected ? 'text-cyan-400' : 'text-white/40'}`} />
      </div>
      <div className="flex-1">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">{method.name}</h4>
        <p className="text-[11px] text-white/50 mt-1 leading-relaxed">{method.description}</p>
      </div>
      <div className="flex items-center justify-center">
        <CheckCircle2 className={`h-5 w-5 transition-transform duration-200 ${isSelected ? 'text-cyan-400 scale-110' : 'text-white/10'}`} />
      </div>
    </div>
  );
}
