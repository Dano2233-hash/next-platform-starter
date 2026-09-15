import React from 'react';
import { Check, Wallet, Phone, CreditCard } from 'lucide-react';

const PaymentMethodCard = ({ method, selected, onSelect }) => {
  const getIcon = () => {
    switch (method.id) {
      case 'fastpay':
        return <Wallet className="w-5 h-5 text-cyan-400" />;
      case 'korek':
        return <Phone className="w-5 h-5 text-purple-400" />;
      case 'mastercard':
        return <CreditCard className="w-5 h-5 text-blue-400" />;
      default:
        return <Wallet className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 ${
        selected
          ? 'bg-blue-600/15 border-cyan-400 shadow-lg shadow-cyan-500/10'
          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className={`p-2.5 rounded-xl bg-slate-950 border border-slate-800 shrink-0`}>
        {getIcon()}
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="font-extrabold text-sm text-slate-100">{method.name}</h4>
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
              selected
                ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                : 'border-slate-700 bg-slate-950'
            }`}
          >
            {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
        </div>

        <p className="text-xs text-slate-400">{method.description}</p>

        {method.accountNumber && (
          <div className="pt-1 font-mono text-xs text-cyan-300 font-semibold">
            Account: {method.accountNumber}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodCard;
