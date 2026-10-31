import React from 'react';
import { CheckCircle2, Smartphone, CreditCard, Building2 } from 'lucide-react';

export default function PaymentMethodCard({ method, isSelected, onSelect }) {
  const getIcon = () => {
    switch (method.id) {
      case 'fastpay':
        return <Smartphone className="w-5 h-5 text-emerald-400" />;
      case 'korek':
        return <Smartphone className="w-5 h-5 text-blue-400" />;
      case 'mastercard':
        return <CreditCard className="w-5 h-5 text-purple-400" />;
      default:
        return <Building2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative cursor-pointer p-4 rounded-xl border transition-all duration-200 select-none ${
        isSelected
          ? 'bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-900 border-cyan-500 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500'
          : 'bg-[#090e1c] border-slate-800 hover:border-slate-700 hover:bg-[#0c1428]'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center">
            {getIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-white text-sm">{method.name}</h4>
              {method.badge && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {method.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{method.description}</p>
          </div>
        </div>

        <div className="shrink-0">
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
              isSelected ? 'bg-cyan-500 border-cyan-400' : 'border-slate-700 bg-slate-900'
            }`}
          >
            {isSelected && <CheckCircle2 className="w-4 h-4 text-slate-950" />}
          </div>
        </div>
      </div>

      {isSelected && (
        <div className="mt-3 pt-3 border-t border-cyan-900/30 text-xs bg-cyan-950/20 p-2.5 rounded-lg border border-cyan-800/20">
          <div className="flex justify-between items-center text-slate-300">
            <span className="font-medium">Transfer Account / Number:</span>
            <span className="font-mono font-bold text-cyan-300">{method.accountNumber}</span>
          </div>
          <div className="flex justify-between items-center text-slate-400 mt-1">
            <span>Account Title:</span>
            <span className="font-medium text-slate-200">{method.accountName}</span>
          </div>
        </div>
      )}
    </div>
  );
}
