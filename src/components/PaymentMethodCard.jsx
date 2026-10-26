import React from 'react';
import { CheckCircle2, CreditCard, Smartphone, ShieldCheck } from 'lucide-react';

export default function PaymentMethodCard({ id, name, details, isSelected, onSelect }) {
  let Icon = CreditCard;
  let accentBorder = "hover:border-slate-700";
  let activeBorder = "border-cyan-500 bg-cyan-500/10";

  if (id === "fastpay") {
    Icon = Smartphone;
    activeBorder = "border-cyan-400 bg-cyan-500/10";
  } else if (id === "korek") {
    Icon = Smartphone;
    activeBorder = "border-blue-500 bg-blue-500/10";
  } else if (id === "mastercard") {
    Icon = CreditCard;
    activeBorder = "border-purple-500 bg-purple-500/10";
  }

  return (
    <div
      onClick={() => onSelect(id)}
      className={`relative cursor-pointer p-4 rounded-xl border transition-all duration-200 flex items-start space-x-3.5 ${
        isSelected
          ? `${activeBorder} shadow-lg shadow-cyan-500/5`
          : `bg-[#0b1022] border-slate-800 ${accentBorder}`
      }`}
    >
      <div className={`p-2.5 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-900 text-slate-400'}`}>
        <Icon className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white">{name}</h4>
          {isSelected && (
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          )}
        </div>
        <p className="text-xs text-slate-400 mt-0.5">{details}</p>
      </div>
    </div>
  );
}
