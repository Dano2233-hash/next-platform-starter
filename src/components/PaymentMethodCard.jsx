import React from 'react';
import { Check } from 'lucide-react';

export default function PaymentMethodCard({ method, isSelected, onSelect }) {
  // Configs for FastPay, Korek, MasterCard
  const methodConfigs = {
    FastPay: {
      name: 'FastPay',
      desc: 'Mobile Wallet Instant Transfer (IQD)',
      logoColor: 'text-pink-500',
      bgColor: 'hover:border-pink-500/50',
      selectedBg: 'border-pink-500 bg-pink-950/20 shadow-pink-500/10',
    },
    Korek: {
      name: 'Korek Pay / Transfer',
      desc: 'Korek Mobile Balance or Korek Pay',
      logoColor: 'text-blue-500',
      bgColor: 'hover:border-blue-500/50',
      selectedBg: 'border-blue-500 bg-blue-950/20 shadow-blue-500/10',
    },
    MasterCard: {
      name: 'MasterCard / Visa',
      desc: 'Manual card details or Transfer (IQD)',
      logoColor: 'text-amber-500',
      bgColor: 'hover:border-amber-500/50',
      selectedBg: 'border-amber-500 bg-amber-950/20 shadow-amber-500/10',
    },
  };

  const config = methodConfigs[method] || {
    name: method,
    desc: 'Manual Payment Method',
    logoColor: 'text-cyan-500',
    bgColor: 'hover:border-cyan-500/50',
    selectedBg: 'border-cyan-500 bg-cyan-950/20',
  };

  return (
    <div
      onClick={() => onSelect(method)}
      className={`relative cursor-pointer flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
        isSelected
          ? `border-2 ${config.selectedBg} shadow-lg scale-102`
          : 'bg-[#0d0d12] border-white/5 hover:bg-white/[0.02]'
      } ${config.bgColor}`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black ${config.logoColor}`}>
          {method[0]}
        </div>
        <div className="text-left">
          <h4 className="text-sm font-black text-white">{config.name}</h4>
          <p className="text-[11px] text-zinc-500 mt-0.5">{config.desc}</p>
        </div>
      </div>

      <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-300 ${
        isSelected
          ? 'bg-gradient-to-r from-blue-600 to-cyan-500 border-transparent text-white'
          : 'border-white/10 text-transparent'
      }`}>
        <Check className="w-3 h-3" />
      </div>
    </div>
  );
}
