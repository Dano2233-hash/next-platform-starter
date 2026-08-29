import React from 'react';
import { CheckCircle2, Circle, CreditCard, Smartphone, ShieldCheck } from 'lucide-react';

export default function PaymentMethodCard({ method, isSelected, onSelect }) {
  const getIcon = (id) => {
    switch (id) {
      case 'fastpay':
        return <Smartphone className="w-5 h-5 text-pink-400" />;
      case 'korek':
        return <Smartphone className="w-5 h-5 text-yellow-400" />;
      case 'mastercard':
        return <CreditCard className="w-5 h-5 text-blue-400" />;
      default:
        return <CreditCard className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-200 select-none ${
        isSelected
          ? 'bg-gradient-to-r from-blue-950/40 via-cyan-950/30 to-slate-900 border-cyan-400 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/50'
          : 'bg-[#0c101c] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
            {getIcon(method.id)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-white font-extrabold text-sm">{method.name}</h4>
              {method.badge && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                  {method.badge}
                </span>
              )}
            </div>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed">
              {method.description}
            </p>
            <div className="mt-2 text-xs font-mono font-semibold text-cyan-300 bg-slate-900/80 px-2.5 py-1 rounded-md inline-block border border-slate-800">
              Account: {method.accountNumber}
            </div>
          </div>
        </div>

        <div className="shrink-0 mt-0.5">
          {isSelected ? (
            <CheckCircle2 className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
          ) : (
            <Circle className="w-5 h-5 text-slate-600" />
          )}
        </div>
      </div>
    </div>
  );
}
