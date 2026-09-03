import React from 'react';
import { CheckCircle2, Wallet, CreditCard, PhoneCall } from 'lucide-react';

export const PaymentMethodCard = ({ method, selected, onSelect }) => {
  const getIcon = () => {
    switch (method.id) {
      case 'fastpay':
        return <Wallet className="w-5 h-5 text-emerald-400" />;
      case 'korek':
        return <PhoneCall className="w-5 h-5 text-cyan-400" />;
      case 'mastercard':
        return <CreditCard className="w-5 h-5 text-purple-400" />;
      default:
        return <Wallet className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-start gap-3 relative ${
        selected
          ? 'bg-cyan-950/30 border-cyan-500 shadow-md shadow-cyan-950/50'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
      }`}
    >
      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex-shrink-0">
        {getIcon()}
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-sm text-white">{method.name}</h4>
          {selected && <CheckCircle2 className="w-5 h-5 text-cyan-400" />}
        </div>
        <p className="text-xs text-slate-400 mt-0.5">{method.description}</p>
      </div>
    </div>
  );
};
