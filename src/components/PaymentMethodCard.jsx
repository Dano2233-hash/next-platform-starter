import React from 'react';
import { CheckCircle2, ShieldCheck, Smartphone, CreditCard, Wallet } from 'lucide-react';

export default function PaymentMethodCard({ method, isSelected, onSelect }) {
  const getIcon = () => {
    switch (method.id) {
      case 'fastpay':
        return <Wallet className="w-5 h-5 text-amber-400" />;
      case 'korek':
        return <Smartphone className="w-5 h-5 text-blue-400" />;
      case 'mastercard':
        return <CreditCard className="w-5 h-5 text-purple-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`cursor-pointer rounded-2xl p-4 border transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
        isSelected
          ? 'bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 border-cyan-400 shadow-lg shadow-cyan-950/50 scale-[1.01]'
          : 'bg-[#090d1c] hover:bg-slate-900 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
            {getIcon()}
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-sm">{method.name}</h4>
            {method.badge && (
              <span className="text-[10px] font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-1.5 py-0.5 rounded inline-block mt-0.5">
                {method.badge}
              </span>
            )}
          </div>
        </div>

        <div className="shrink-0">
          {isSelected ? (
            <CheckCircle2 className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-slate-700" />
          )}
        </div>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed mt-1">
        {method.description}
      </p>
    </div>
  );
}
