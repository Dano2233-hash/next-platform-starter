import React from 'react';
import { CheckCircle2, Smartphone, CreditCard, Building2 } from 'lucide-react';

/**
 * Payment method selection card.
 * Only FastPay, Korek, and MasterCard are allowed.
 */
export default function PaymentMethodCard({ method, isSelected, onSelect }) {
  const getIcon = () => {
    switch (method.id) {
      case 'fastpay':
        return <Smartphone className="w-5 h-5 text-[#00c389]" />;
      case 'korek':
        return <Smartphone className="w-5 h-5 text-[#ffc107]" />;
      case 'mastercard':
        return <CreditCard className="w-5 h-5 text-[#eb001b]" />;
      default:
        return <Building2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative p-4 rounded-2xl cursor-pointer border transition-all duration-200 ${
        isSelected
          ? 'bg-slate-900/90 border-cyan-400 shadow-lg shadow-cyan-500/10'
          : 'bg-[#080c1a]/70 border-white/5 hover:border-white/20 hover:bg-slate-900/50'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center">
            {getIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-white text-sm">{method.name}</h4>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/5 text-slate-300 border border-white/10">
                {method.badge}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{method.subtitle}</p>
          </div>
        </div>

        <div className="pt-1">
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
              isSelected
                ? 'border-cyan-400 bg-cyan-400 text-slate-950'
                : 'border-slate-600 bg-transparent'
            }`}
          >
            {isSelected && <CheckCircle2 className="w-4 h-4 fill-cyan-400 text-slate-950" />}
          </div>
        </div>
      </div>

      {isSelected && (
        <div className="mt-3 pt-3 border-t border-white/10 text-xs text-slate-300 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Account / Number:</span>
            <span className="font-mono font-bold text-cyan-300">{method.accountNumber}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Account Holder:</span>
            <span className="font-semibold text-white">{method.accountHolder}</span>
          </div>
          <p className="text-[11px] text-slate-400 pt-1 leading-relaxed">
            {method.instructions}
          </p>
        </div>
      )}
    </div>
  );
}
