import React from 'react';
import { Check, CreditCard, Smartphone, ShieldCheck } from 'lucide-react';

export default function PaymentMethodCard({ method, selected, onSelect }) {
  const getIcon = (id) => {
    switch (id) {
      case 'fastpay':
        return <Smartphone className="w-6 h-6 text-cyan-400" />;
      case 'korek':
        return <Smartphone className="w-6 h-6 text-purple-400" />;
      case 'mastercard':
        return <CreditCard className="w-6 h-6 text-emerald-400" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative p-4 rounded-xl cursor-pointer border transition-all duration-200 flex flex-col justify-between ${
        selected
          ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
            {getIcon(method.id)}
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-sm">{method.name}</h4>
            <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 inline-block mt-0.5">
              {method.badge}
            </span>
          </div>
        </div>

        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
            selected
              ? 'bg-cyan-500 border-cyan-400 text-black'
              : 'border-slate-700 bg-slate-950'
          }`}
        >
          {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-3 leading-relaxed">
        {method.description}
      </p>

      {selected && method.accountNumber && (
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400">Transfer Account:</span>
          <span className="font-mono font-bold text-cyan-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
            {method.accountNumber}
          </span>
        </div>
      )}
    </div>
  );
}
