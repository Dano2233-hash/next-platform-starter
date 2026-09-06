import React from 'react';
import { Zap, PhoneCall, CreditCard, CheckCircle2 } from 'lucide-react';

export default function PaymentMethodCard({ method, selected, onSelect }) {
  const getIcon = () => {
    switch (method.id) {
      case 'fastpay':
        return <Zap className="w-5 h-5 text-cyan-400" />;
      case 'korek':
        return <PhoneCall className="w-5 h-5 text-blue-400" />;
      case 'mastercard':
        return <CreditCard className="w-5 h-5 text-purple-400" />;
      default:
        return <CreditCard className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`p-4 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
        selected
          ? 'bg-gradient-to-br from-[#0c162d] to-[#130d2e] border-cyan-500 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/50'
          : 'bg-[#090e1a] border-slate-800 hover:border-slate-700 hover:bg-[#0d1425]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg border ${selected ? 'bg-slate-900 border-cyan-500/50' : 'bg-slate-900/80 border-slate-800'}`}>
            {getIcon()}
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">{method.name}</h4>
            <p className="text-xs text-slate-400 mt-0.5">{method.description}</p>
          </div>
        </div>

        <div className="shrink-0 pt-0.5">
          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selected ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700 bg-slate-900'}`}>
            {selected && <CheckCircle2 className="w-4 h-4 fill-slate-950 text-cyan-400" />}
          </div>
        </div>
      </div>

      {selected && method.instructions && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-cyan-300/90 font-medium bg-cyan-950/30 p-2.5 rounded-lg border border-cyan-900/40">
          <span className="font-bold block text-cyan-200 mb-0.5">Payment Instructions:</span>
          {method.instructions}
        </div>
      )}
    </div>
  );
}
