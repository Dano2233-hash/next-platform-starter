import React from 'react';
import { CreditCard, CheckCircle2 } from 'lucide-react';

export const PaymentMethodCard = ({ id, name, description, selected, onSelect }) => {
  const getPaymentIcon = () => {
    switch (id) {
      case 'FastPay':
        return (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white font-black text-xs shadow-md">
            FP
          </div>
        );
      case 'Korek':
        return (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-xs shadow-md">
            KRK
          </div>
        );
      case 'MasterCard':
        return (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-purple-600 flex items-center justify-center text-white font-black text-xs shadow-md">
            MC
          </div>
        );
      default:
        return <CreditCard className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(id)}
      className={`cursor-pointer p-4 rounded-xl border transition-all flex items-center justify-between ${
        selected
          ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-lg shadow-cyan-950/30'
          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
      }`}
    >
      <div className="flex items-center gap-3">
        {getPaymentIcon()}
        <div>
          <h4 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
            {name}
            {selected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
          </h4>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
      </div>

      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
        selected ? 'border-cyan-400 bg-cyan-500' : 'border-slate-700 bg-slate-950'
      }`}>
        {selected && <div className="w-2 h-2 rounded-full bg-black" />}
      </div>
    </div>
  );
};
