import React from 'react';
import { Zap, PhoneCall, CreditCard, CheckCircle2 } from 'lucide-react';

export default function PaymentMethodCard({ method, selected, onSelect }) {
  const isSelected = selected === method.id;

  const getIcon = () => {
    switch (method.id) {
      case 'fastpay':
        return <Zap className="w-5 h-5 text-cyan-400" />;
      case 'korek':
        return <PhoneCall className="w-5 h-5 text-blue-400" />;
      case 'mastercard':
        return <CreditCard className="w-5 h-5 text-purple-400" />;
      default:
        return <Zap className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'bg-gradient-to-r from-[#0c1530] to-[#121c3d] border-cyan-400 shadow-lg shadow-cyan-500/10'
          : 'bg-[#090e1f] border-slate-800/80 hover:border-slate-700 hover:bg-[#0c1228]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
              isSelected
                ? 'bg-cyan-500/10 border-cyan-500/30'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            {getIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white">{method.name}</h4>
              {method.badge && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-extrabold border border-cyan-500/30">
                  {method.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{method.description}</p>
          </div>
        </div>

        <div className="pt-0.5">
          <CheckCircle2
            className={`w-5 h-5 transition-colors ${
              isSelected ? 'text-cyan-400 fill-cyan-400/20' : 'text-slate-700'
            }`}
          />
        </div>
      </div>

      {isSelected && method.accountNumber && (
        <div className="mt-3 pt-3 border-t border-cyan-500/20 text-xs flex items-center justify-between text-slate-300 bg-cyan-950/20 px-3 py-2 rounded-xl">
          <span className="text-slate-400">Transfer Number / ID:</span>
          <span className="font-mono font-bold text-cyan-400 select-all">
            {method.accountNumber}
          </span>
        </div>
      )}
    </div>
  );
}
