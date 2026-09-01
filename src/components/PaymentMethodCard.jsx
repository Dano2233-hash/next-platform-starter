import React from 'react';
import { Check, Wallet, Smartphone, CreditCard } from 'lucide-react';

export const PaymentMethodCard = ({ id, name, description, selected, onSelect, badge }) => {
  const getIcon = () => {
    switch (id) {
      case 'fastpay': return <Wallet className="w-5 h-5 text-cyan-400" />;
      case 'korek': return <Smartphone className="w-5 h-5 text-blue-400" />;
      case 'mastercard': return <CreditCard className="w-5 h-5 text-indigo-400" />;
      default: return <Wallet className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(id)}
      className={`relative cursor-pointer p-4 rounded-xl border transition-all duration-200 flex items-center gap-3.5 ${
        selected
          ? 'bg-gradient-to-r from-[#0a1845] to-[#081236] border-cyan-400 shadow-lg shadow-cyan-500/10'
          : 'bg-[#060a21] border-cyan-900/30 hover:border-cyan-700/50 hover:bg-[#091032]'
      }`}
    >
      <div className={`p-2.5 rounded-lg ${selected ? 'bg-cyan-950 border border-cyan-500/40' : 'bg-slate-900'}`}>
        {getIcon()}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-slate-100 text-sm">{name}</h4>
          {badge && (
            <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 mt-0.5">{description}</p>
      </div>

      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
        selected ? 'bg-cyan-500 border-cyan-400 text-black' : 'border-slate-700 bg-slate-900'
      }`}>
        {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
      </div>
    </div>
  );
};
