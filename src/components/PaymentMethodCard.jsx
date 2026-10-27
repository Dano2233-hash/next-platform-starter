import React from 'react';
import { CheckCircle2, CreditCard, Smartphone, Zap } from 'lucide-react';

const PaymentMethodCard = ({ method, selected, onSelect }) => {
  const getIcon = () => {
    switch (method.id) {
      case 'fastpay':
        return <Zap className="w-5 h-5 text-emerald-400" />;
      case 'korek':
        return <Smartphone className="w-5 h-5 text-amber-400" />;
      case 'mastercard':
        return <CreditCard className="w-5 h-5 text-cyan-400" />;
      default:
        return <CreditCard className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
        selected
          ? 'bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/60 border-cyan-500 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/50'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
      }`}
    >
      <div className="flex items-center gap-3.5">
        <div className={`p-2.5 rounded-lg border ${
          selected ? 'bg-cyan-950 border-cyan-500/50' : 'bg-slate-950 border-slate-800'
        }`}>
          {getIcon()}
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-100 flex items-center gap-2">
            {method.name}
            {selected && (
              <span className="text-[10px] text-cyan-400 font-bold bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-500/30">
                Selected
              </span>
            )}
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5">{method.description}</p>
        </div>
      </div>

      <div className="shrink-0">
        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
          selected ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700 bg-slate-950'
        }`}>
          {selected && <CheckCircle2 className="w-3.5 h-3.5 fill-slate-950 text-cyan-400" />}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodCard;
