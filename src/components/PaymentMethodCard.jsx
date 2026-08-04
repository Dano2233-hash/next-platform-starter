import React from 'react';
import { CreditCard, Wallet, Smartphone } from 'lucide-react';

export default function PaymentMethodCard({ id, name, selected, onClick }) {
  const getIcon = () => {
    switch (id) {
      case 'fastpay':
        return <Wallet className="text-[#e2136e]" size={20} />;
      case 'korek':
        return <Smartphone className="text-[#00e5ff]" size={20} />;
      case 'mastercard':
        return <CreditCard className="text-[#ff5f00]" size={20} />;
      default:
        return <CreditCard size={20} />;
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
        selected
          ? 'bg-[#0066ff]/10 border-[#0066ff] shadow-lg shadow-[#0066ff]/10'
          : 'bg-[#0c0d12] border-[#1a1e29] hover:border-gray-700'
      }`}
    >
      <div className={`p-2.5 rounded-lg ${selected ? 'bg-[#0066ff]/20' : 'bg-[#151824]'}`}>
        {getIcon()}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-white">{name}</h4>
        <p className="text-[11px] text-gray-400 mt-0.5">Manual Payment</p>
      </div>
      <div className="ml-auto">
        <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
          selected ? 'border-[#00e5ff] bg-[#00e5ff]/20' : 'border-gray-600'
        }`}>
          {selected && <div className="w-2 h-2 rounded-full bg-[#00e5ff]" />}
        </div>
      </div>
    </button>
  );
}
