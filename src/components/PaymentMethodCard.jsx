import React from 'react';
import { CheckCircle, Zap, Phone, CreditCard } from 'lucide-react';

export default function PaymentMethodCard({ method, selected, onSelect }) {
  const isSelected = selected === method.id;

  const getIcon = () => {
    switch (method.id) {
      case 'fastpay':
        return <Zap className="w-6 h-6 text-cyan-400" />;
      case 'korek':
        return <Phone className="w-6 h-6 text-emerald-400" />;
      case 'mastercard':
        return <CreditCard className="w-6 h-6 text-purple-400" />;
      default:
        return <Zap className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative cursor-pointer p-4 rounded-2xl border transition-all duration-300 flex items-start space-x-3.5 ${
        isSelected
          ? 'bg-gradient-to-r from-slate-900 via-cyan-950/30 to-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/10'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
      }`}
    >
      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
        {getIcon()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-2">
            <h4 className="font-bold text-white text-sm">{method.name}</h4>
            {method.badge && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {method.badge}
              </span>
            )}
          </div>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
            isSelected ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700'
          }`}>
            {isSelected && <CheckCircle className="w-3.5 h-3.5" />}
          </div>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">{method.description}</p>
        <div className="mt-2 text-xs font-mono font-bold text-cyan-400 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 inline-block">
          Account: {method.accountNumber}
        </div>
      </div>
    </div>
  );
}
