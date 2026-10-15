import React from 'react';
import { CheckCircle, ShieldCheck } from 'lucide-react';

export const PaymentMethodCard = ({ method, selectedMethod, onSelect }) => {
  const isSelected = selectedMethod === method.id;

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 relative flex items-start gap-3 ${
        isSelected
          ? 'bg-[#0d1633] border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-950/50'
          : 'bg-[#090d1a] border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
      }`}
    >
      <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
        {method.icon}
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-sm text-white">{method.name}</h4>
          {isSelected && <CheckCircle className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />}
        </div>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{method.description}</p>

        {method.accountInfo && (
          <div className="mt-2 text-[11px] font-mono text-cyan-300 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
            {method.accountInfo}
          </div>
        )}
      </div>
    </div>
  );
};

export const PAYMENT_METHODS = [
  {
    id: 'FastPay',
    name: 'FastPay Wallet',
    description: 'Instant transfer via FastPay account or mobile number.',
    accountInfo: 'FastPay Account: 0750 XXX XXXX',
    icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />
  },
  {
    id: 'Korek',
    name: 'Korek Cash',
    description: 'Fast digital payment via Korek Telecom mobile wallet.',
    accountInfo: 'Korek Number: 0750 XXX XXXX',
    icon: <ShieldCheck className="w-5 h-5 text-purple-400" />
  },
  {
    id: 'MasterCard',
    name: 'MasterCard (Iraq)',
    description: 'Manual card transfer or local MasterCard payment confirmation.',
    accountInfo: 'Card Details provided after order creation',
    icon: <ShieldCheck className="w-5 h-5 text-amber-400" />
  }
];
