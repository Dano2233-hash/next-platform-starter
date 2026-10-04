import React from 'react';
import { Zap, PhoneCall, CreditCard, CheckCircle2 } from 'lucide-react';

export default function PaymentMethodCard({ method, selected, onSelect }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'PhoneCall':
        return <PhoneCall className="w-5 h-5 text-red-400" />;
      case 'CreditCard':
      default:
        return <CreditCard className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start gap-3.5 relative overflow-hidden ${
        selected
          ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/10'
          : 'bg-slate-950/80 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
      }`}
    >
      <div className={`p-2.5 rounded-xl border shrink-0 ${method.badgeColor || 'bg-slate-800 text-slate-300'}`}>
        {getIcon(method.icon)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="font-heading font-bold text-sm text-slate-100 flex items-center gap-2">
            {method.name}
          </h4>
          {selected && (
            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
          )}
        </div>

        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
          {method.description}
        </p>

        {method.accountNumber && (
          <div className="mt-2.5 inline-block bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-xs font-mono font-bold text-slate-300">
            Send to: <span className="text-cyan-400">{method.accountNumber}</span>
          </div>
        )}
      </div>
    </div>
  );
}
