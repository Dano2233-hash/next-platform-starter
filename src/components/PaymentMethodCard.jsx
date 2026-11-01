import React from 'react';
import { CheckCircle2, Wallet, Phone, CreditCard } from 'lucide-react';

export default function PaymentMethodCard({ method, isSelected, onSelect }) {
  const getIcon = () => {
    switch (method.id) {
      case 'fastpay':
        return <Wallet className="w-5 h-5 text-cyan-400" />;
      case 'korek':
        return <Phone className="w-5 h-5 text-yellow-400" />;
      case 'mastercard':
        return <CreditCard className="w-5 h-5 text-red-400" />;
      default:
        return <Wallet className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative cursor-pointer rounded-xl p-4 border transition-all ${
        isSelected
          ? 'bg-[#0e172e] border-cyan-500 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-950/40'
          : 'bg-[#090e1d] hover:bg-[#0c1428] border-slate-800'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            {getIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-white text-sm">{method.name}</h4>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                Manual Transfer
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{method.description}</p>
          </div>
        </div>

        <div className="flex-shrink-0 ml-2">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
              isSelected
                ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                : 'border-slate-700 bg-slate-900'
            }`}
          >
            {isSelected && <CheckCircle2 className="w-4 h-4 fill-current text-slate-950" />}
          </div>
        </div>
      </div>

      {isSelected && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs">
          <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-800 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Account / Phone:</span>
              <span className="font-mono font-bold text-cyan-300">{method.accountNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Recipient Name:</span>
              <span className="font-medium text-slate-200">{method.accountName}</span>
            </div>
            <div className="pt-1 text-[11px] text-slate-400">
              <span className="text-amber-400 font-semibold">Note: </span>
              {method.instructions}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
