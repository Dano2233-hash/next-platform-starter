import React from 'react';
import { Check, CreditCard, Smartphone } from 'lucide-react';

export default function PaymentMethodCard({ id, name, description, selected, onSelect }) {
  const getIcon = () => {
    switch (id) {
      case 'FastPay':
        return <Smartphone className="w-5 h-5 text-emerald-400" />;
      case 'Korek':
        return <Smartphone className="w-5 h-5 text-amber-400" />;
      case 'MasterCard':
        return <CreditCard className="w-5 h-5 text-blue-400" />;
      default:
        return <CreditCard className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(id)}
      className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-start gap-3.5 ${
        selected
          ? 'bg-cyan-950/20 border-cyan-500 shadow-md shadow-cyan-950/40 ring-1 ring-cyan-500'
          : 'bg-[#0d1322] border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
      }`}
    >
      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0 mt-0.5">
        {getIcon()}
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-100">{name}</h4>
          {selected && (
            <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          )}
        </div>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
