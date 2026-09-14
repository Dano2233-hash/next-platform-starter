import React from 'react';
import { Zap, PhoneCall, CreditCard, CheckCircle } from 'lucide-react';

export default function PaymentMethodCard({ method, selectedMethod, onSelect }) {
  const isSelected = selectedMethod === method.id;

  const getIcon = () => {
    switch (method.id) {
      case 'fastpay':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'korek':
        return <PhoneCall className="w-5 h-5 text-cyan-400" />;
      case 'mastercard':
        return <CreditCard className="w-5 h-5 text-purple-400" />;
      default:
        return <CreditCard className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative cursor-pointer p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
        isSelected
          ? 'bg-slate-900 border-cyan-500 shadow-md shadow-cyan-500/10'
          : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
            {getIcon()}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100">{method.name}</h4>
            <span className="text-[10px] font-semibold text-cyan-400 block">{method.badge}</span>
          </div>
        </div>

        <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
          isSelected ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700 bg-slate-950'
        }`}>
          {isSelected && <CheckCircle className="w-3.5 h-3.5" />}
        </div>
      </div>

      {isSelected && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300 space-y-1">
          <p className="font-semibold text-slate-200">Account / Transfer Number:</p>
          <p className="font-mono text-cyan-300 font-bold text-sm bg-slate-950 p-2 rounded border border-slate-800 tracking-wider">
            {method.number}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">{method.instructions}</p>
        </div>
      )}
    </div>
  );
}
