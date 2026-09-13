import React from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import { Smartphone, Phone, CreditCard, CheckCircle } from 'lucide-react';

export const PaymentMethodCard = ({ method, selected, onSelect }) => {
  const isSelected = selected === method.id;

  const getIcon = () => {
    switch (method.id) {
      case 'fastpay':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'korek':
        return <Phone className="w-5 h-5 text-emerald-400" />;
      case 'mastercard':
        return <CreditCard className="w-5 h-5 text-blue-400" />;
      default:
        return <CreditCard className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative cursor-pointer p-4 rounded-xl border transition-all duration-200 flex items-start justify-between ${
        isSelected
          ? 'bg-blue-600/10 border-cyan-400 shadow-md shadow-cyan-500/10'
          : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
      }`}
    >
      <div className="flex items-start gap-3.5">
        <div className={`p-2.5 rounded-xl border ${isSelected ? 'bg-cyan-500/20 border-cyan-500/40' : 'bg-slate-950 border-slate-800'}`}>
          {getIcon()}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-sm text-white">{method.name}</h4>
            {method.badge && (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-800 text-cyan-400 border border-slate-700">
                {method.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">{method.description}</p>
          <div className="mt-2 text-xs font-mono text-cyan-300 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800 inline-block">
            Number: {method.accountNumber}
          </div>
        </div>
      </div>

      <div className="shrink-0 pt-1">
        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
            isSelected ? 'border-cyan-400 bg-cyan-400 text-slate-950' : 'border-slate-700 bg-slate-950'
          }`}
        >
          {isSelected && <CheckCircle className="w-4 h-4" />}
        </div>
      </div>
    </div>
  );
};
