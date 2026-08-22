import React from 'react';
import { CheckCircle2, ShieldCheck, Wallet, CreditCard, PhoneCall } from 'lucide-react';

export const PaymentMethodCard = ({ method, isSelected, onSelect }) => {
  if (!method) return null;

  const getIcon = () => {
    if (method.id === 'fastpay') return <Wallet className="w-5 h-5 text-cyan-400" />;
    if (method.id === 'korek') return <PhoneCall className="w-5 h-5 text-purple-400" />;
    return <CreditCard className="w-5 h-5 text-blue-400" />;
  };

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative p-4 rounded-2xl cursor-pointer border transition-all duration-200 select-none ${
        isSelected
          ? 'bg-[#0f1738] border-cyan-500 ring-2 ring-cyan-500/30 shadow-xl shadow-cyan-500/10'
          : 'bg-[#080d1f] hover:bg-[#0c132c] border-slate-800/90 hover:border-slate-700'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${method.color || 'from-blue-600 to-cyan-500'} p-[1px] flex items-center justify-center shrink-0 shadow-md`}
          >
            <div className="w-full h-full bg-[#080d1f] rounded-[11px] flex items-center justify-center">
              {getIcon()}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-heading font-bold text-sm text-white">{method.name}</h4>
              <span className="text-[10px] font-extrabold uppercase bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded">
                Manual IQD
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{method.description}</p>
          </div>
        </div>

        <div className="shrink-0 mt-1">
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
              isSelected
                ? 'border-cyan-400 bg-cyan-500 text-slate-950'
                : 'border-slate-700 bg-slate-900/80'
            }`}
          >
            {isSelected && <CheckCircle2 className="w-4 h-4 fill-slate-950 text-cyan-400" />}
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <span className="text-slate-400 font-medium">Account / Ref:</span>
        <span className="font-mono font-bold text-slate-200 bg-[#060a17] px-2.5 py-1 rounded border border-slate-800">
          {method.accountNumber}
        </span>
      </div>
    </div>
  );
};

export default PaymentMethodCard;
