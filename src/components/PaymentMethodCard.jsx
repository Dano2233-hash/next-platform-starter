import React from 'react';
import { CreditCard, Wallet, Smartphone } from 'lucide-react';

export default function PaymentMethodCard({ id, name, details, selectedId, onSelect }) {
  const isSelected = selectedId === id;

  const getIcon = () => {
    switch (id) {
      case 'FastPay':
        return <Wallet className="w-5 h-5 text-cyan-400" />;
      case 'Korek':
        return <Smartphone className="w-5 h-5 text-blue-400" />;
      case 'MasterCard':
        return <CreditCard className="w-5 h-5 text-purple-400" />;
      default:
        return null;
    }
  };

  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`w-full p-4 rounded-xl border text-left flex items-start gap-4 transition-all duration-300 ${
        isSelected
          ? 'bg-[#0f0f1f] border-cyan-500 shadow-lg shadow-cyan-500/10'
          : 'bg-[#090911] border-white/5 hover:border-white/10'
      }`}
    >
      <div className={`p-2.5 rounded-lg ${isSelected ? 'bg-cyan-950/40 border border-cyan-800/40' : 'bg-white/5'} flex-shrink-0`}>
        {getIcon()}
      </div>
      <div>
        <h4 className="text-white font-bold text-sm tracking-wide">{name}</h4>
        <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{details}</p>
      </div>
    </button>
  );
}
