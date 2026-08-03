import React from 'react';
import { CreditCard, Wallet, Smartphone } from 'lucide-react';

export default function PaymentMethodCard({ id, name, details, active, onSelect }) {
  const getIcon = () => {
    switch (id) {
      case 'fastpay':
        return <Smartphone className="w-5 h-5 text-pink-500" />;
      case 'korek':
        return <Smartphone className="w-5 h-5 text-red-500" />;
      case 'mastercard':
        return <CreditCard className="w-5 h-5 text-amber-500" />;
      default:
        return <Wallet className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBorderColor = () => {
    if (active) {
      switch (id) {
        case 'fastpay':
          return 'border-pink-500 bg-pink-950/20';
        case 'korek':
          return 'border-red-500 bg-red-950/20';
        case 'mastercard':
          return 'border-amber-500 bg-amber-950/20';
        default:
          return 'border-[#00e5ff] bg-[#00e5ff]/5';
      }
    }
    return 'border-[#121225] hover:border-[#0066ff]/40';
  };

  return (
    <div
      onClick={() => onSelect(id)}
      className={`border-2 rounded-xl p-4 cursor-pointer transition-premium flex items-start gap-4 ${getBorderColor()}`}
    >
      <div className="p-2.5 bg-black/40 rounded-lg border border-white/5 shrink-0">
        {getIcon()}
      </div>
      <div>
        <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">{name}</h4>
        <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">{details}</p>
      </div>
    </div>
  );
}
