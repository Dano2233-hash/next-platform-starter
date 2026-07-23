import React from 'react';
import { Check } from 'lucide-react';

/**
 * Clickable checkout payment method card component.
 * Supports manual payment modes: FastPay, Korek, and MasterCard.
 */
export function PaymentMethodCard({ id, name, details, activeId, onClick }) {
  const isActive = activeId === id;

  const getMethodStyle = (methodId) => {
    switch (methodId) {
      case 'fastpay':
        return 'border-pink-500/20 hover:border-pink-500/50 text-pink-400 bg-pink-950/5';
      case 'korek':
        return 'border-yellow-500/20 hover:border-yellow-500/50 text-yellow-400 bg-yellow-950/5';
      case 'mastercard':
        return 'border-blue-500/20 hover:border-blue-500/50 text-cyan-400 bg-blue-950/5';
      default:
        return 'border-brand-border hover:border-brand-blue/50 text-gray-300';
    }
  };

  return (
    <div
      onClick={() => onClick(id)}
      className={`relative p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between h-24 ${
        isActive
          ? 'bg-brand-blue/15 border-brand-cyan shadow-md text-white'
          : `bg-[#0d0d15] ${getMethodStyle(id)}`
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-black uppercase tracking-wider">{name}</span>
        {isActive && (
          <span className="h-5 w-5 rounded-full bg-brand-cyan flex items-center justify-center">
            <Check className="h-3 w-3 text-[#050505] stroke-[4]" />
          </span>
        )}
      </div>
      <span className="text-[10px] text-gray-500 leading-tight">
        {details}
      </span>
    </div>
  );
}

export default PaymentMethodCard;
