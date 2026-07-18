import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function PaymentMethodCard({ method, isSelected, onSelect }) {
  // Configs for the 3 allowed manual payment methods
  const configs = {
    FastPay: {
      name: "FastPay Cash Wallet",
      number: "0750 123 4567",
      color: "from-pink-600 to-rose-600",
      textColor: "text-rose-400",
      bgBorder: "border-rose-500/20",
      activeBg: "bg-rose-950/20",
      description: "Transfer money instantly using the FastPay application on your phone."
    },
    Korek: {
      name: "Korek Pay / Balance",
      number: "0750 987 6543",
      color: "from-purple-600 to-indigo-600",
      textColor: "text-purple-400",
      bgBorder: "border-purple-500/20",
      activeBg: "bg-purple-950/20",
      description: "Send Korek balance transfer or Korek Pay instantly."
    },
    MasterCard: {
      name: "MasterCard manual transfer",
      number: "5123 4567 8901 2345",
      color: "from-blue-600 to-cyan-500",
      textColor: "text-blue-400",
      bgBorder: "border-blue-500/20",
      activeBg: "bg-blue-950/20",
      description: "Transfer funds manually into our authorized FIB or MasterCard Account."
    }
  };

  const current = configs[method];
  if (!current) return null;

  return (
    <div
      onClick={onSelect}
      className={`relative cursor-pointer p-4 rounded-xl border transition-all duration-300 ${
        isSelected
          ? `${current.bgBorder} ${current.activeBg} ring-1 ring-cyan-400`
          : 'border-white/[0.04] bg-[#0a0f1d]/40 hover:bg-[#0a0f1d]/70 hover:border-white/10'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-black text-white">{current.name}</span>
        {isSelected ? (
          <CheckCircle2 className="h-5 w-5 text-cyan-400 fill-cyan-400/10" />
        ) : (
          <div className="h-5 w-5 rounded-full border border-white/10" />
        )}
      </div>

      <p className="text-xs text-gray-400 leading-relaxed mb-3">
        {current.description}
      </p>

      <div className="flex items-center justify-between pt-2 border-t border-white/[0.03]">
        <span className="text-[10px] uppercase font-bold text-gray-500">Account / Phone</span>
        <span className={`text-xs font-mono font-black ${current.textColor} tracking-wider`}>
          {current.number}
        </span>
      </div>
    </div>
  );
}
