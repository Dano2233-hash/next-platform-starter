import React from 'react';
import { CheckCircle2, Wallet, PhoneCall, CreditCard } from 'lucide-react';

/**
 * Payment method requirements:
 * Only use:
 * - FastPay
 * - Korek
 * - MasterCard
 *
 * Do NOT show Qi Card, AsiaPay, ZainCash, Google Pay.
 */
export function PaymentMethodCard({ id, name, description, selected, onSelect, numberInfo }) {
  const renderIcon = () => {
    switch (id) {
      case 'fastpay':
        return <Wallet className="w-5 h-5 text-yellow-400" />;
      case 'korek':
        return <PhoneCall className="w-5 h-5 text-cyan-400" />;
      case 'mastercard':
        return <CreditCard className="w-5 h-5 text-orange-400" />;
      default:
        return <Wallet className="w-5 h-5 text-slate-300" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(id)}
      className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
        selected
          ? 'bg-slate-900 border-cyan-500 shadow-md shadow-cyan-950/40'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            {renderIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-white">{name}</h4>
              {selected && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800/80">
                  Selected
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{description}</p>
            {numberInfo && (
              <p className="text-xs font-mono font-semibold text-cyan-300 mt-1">
                Account/Number: {numberInfo}
              </p>
            )}
          </div>
        </div>

        <div className="mt-1">
          {selected ? (
            <CheckCircle2 className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
          ) : (
            <div className="w-5 h-5 rounded-full border border-slate-700" />
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentMethodCard;
