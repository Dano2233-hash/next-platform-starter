import React from 'react';
import { CheckCircle2, CreditCard, Smartphone, ShieldCheck } from 'lucide-react';

export default function PaymentMethodCard({ method, selected, onSelect }) {
  const getIcon = (id) => {
    switch (id) {
      case 'fastpay':
        return <Smartphone className="w-5 h-5 text-purple-400" />;
      case 'korek':
        return <Smartphone className="w-5 h-5 text-blue-400" />;
      case 'mastercard':
        return <CreditCard className="w-5 h-5 text-amber-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`p-4 rounded-2xl border transition-all cursor-pointer relative flex items-center justify-between ${
        selected
          ? 'bg-gradient-to-r from-blue-950/60 to-purple-950/60 border-cyan-400 shadow-lg shadow-cyan-500/10'
          : 'bg-[#090d18] border-gray-800 hover:border-gray-700 hover:bg-[#0d1324]'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2.5 rounded-xl border ${selected ? 'bg-cyan-500/20 border-cyan-400/40' : 'bg-[#050811] border-gray-800'}`}>
          {getIcon(method.id)}
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">{method.name}</h4>
          <p className="text-xs text-gray-400">{method.description}</p>
          <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30 inline-block mt-1">
            {method.numberInfo}
          </span>
        </div>
      </div>

      <div className="ml-3">
        {selected ? (
          <CheckCircle2 className="w-6 h-6 text-cyan-400 fill-cyan-400/20" />
        ) : (
          <div className="w-5 h-5 rounded-full border border-gray-700" />
        )}
      </div>
    </div>
  );
}
