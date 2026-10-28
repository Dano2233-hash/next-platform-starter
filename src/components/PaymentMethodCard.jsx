import React from 'react';
import { CheckCircle2, Wallet, CreditCard, Smartphone } from 'lucide-react';

export function PaymentMethodCard({ method, selected, onSelect }) {
  const isSelected = selected === method.id;

  const getIcon = (id) => {
    switch (id) {
      case 'fastpay':
        return <Wallet className="w-5 h-5 text-amber-400" />;
      case 'korek':
        return <Smartphone className="w-5 h-5 text-rose-400" />;
      case 'mastercard':
        return <CreditCard className="w-5 h-5 text-blue-400" />;
      default:
        return <Wallet className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative cursor-pointer rounded-2xl p-4 border transition-all duration-200 flex items-center justify-between ${
        isSelected
          ? 'bg-[#0f172a] border-cyan-400 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400'
          : 'bg-[#0a0f20] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
      }`}
    >
      <div className="flex items-center gap-3.5">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${method.badgeColor} p-0.5 shrink-0`}>
          <div className="w-full h-full bg-[#070b18] rounded-[10px] flex items-center justify-center">
            {getIcon(method.id)}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-sm text-slate-100">{method.name}</h4>
          <p className="text-xs text-slate-400 mt-0.5">{method.description}</p>
        </div>
      </div>

      <div className="shrink-0 pl-2">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
            isSelected
              ? 'bg-cyan-500 border-cyan-400 text-white'
              : 'border-slate-700 bg-slate-900 text-transparent'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
