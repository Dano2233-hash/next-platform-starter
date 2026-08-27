import React from 'react';
import { Smartphone, CreditCard, CheckCircle2 } from 'lucide-react';

export default function PaymentMethodCard({ method, isSelected, onSelect }) {
  const getIcon = () => {
    switch (method.id) {
      case 'fastpay':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'korek':
        return <Smartphone className="w-5 h-5 text-amber-400" />;
      case 'mastercard':
        return <CreditCard className="w-5 h-5 text-purple-400" />;
      default:
        return <CreditCard className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer select-none flex flex-col justify-between ${
        isSelected
          ? 'bg-gradient-to-br from-slate-900 to-blue-950/80 border-cyan-500 shadow-lg shadow-cyan-500/10'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
      }`}
    >
      {isSelected && (
        <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-cyan-400" />
      )}

      <div>
        <div className="flex items-center gap-2 mb-2">
          {getIcon()}
          <h4 className="font-bold text-white text-sm">{method.name}</h4>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
          {method.description}
        </p>
      </div>

      <div className="pt-2 border-t border-slate-800/80">
        <span className="text-[10px] text-slate-500 block uppercase font-bold">
          Account Number
        </span>
        <span className="text-xs font-mono font-bold text-cyan-300">
          {method.number}
        </span>
      </div>
    </div>
  );
}
