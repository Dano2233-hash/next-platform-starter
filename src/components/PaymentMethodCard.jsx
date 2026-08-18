import React from 'react';
import { CheckCircle2, Wallet, CreditCard, PhoneCall } from 'lucide-react';

export function PaymentMethodCard({ method, isSelected, onSelect }) {
  const getIcon = (id) => {
    switch (id) {
      case 'fastpay':
        return <Wallet className="w-5 h-5 text-cyan-400" />;
      case 'korek':
        return <PhoneCall className="w-5 h-5 text-purple-400" />;
      case 'mastercard':
        return <CreditCard className="w-5 h-5 text-blue-400" />;
      default:
        return <Wallet className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
        isSelected
          ? 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-950/40'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-lg border ${
              isSelected
                ? 'bg-cyan-950/80 border-cyan-500/40'
                : 'bg-slate-800 border-slate-700/60'
            }`}
          >
            {getIcon(method.id)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-white">{method.name}</h3>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                {method.badge}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{method.type}</p>
          </div>
        </div>

        <div className="mt-1">
          <CheckCircle2
            className={`w-5 h-5 ${
              isSelected ? 'text-cyan-400 fill-cyan-400/20' : 'text-slate-700'
            }`}
          />
        </div>
      </div>

      {isSelected && (
        <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
          <p className="font-semibold text-cyan-400 mb-1">Payment Instructions:</p>
          <p>{method.instructions}</p>
        </div>
      )}
    </div>
  );
}
