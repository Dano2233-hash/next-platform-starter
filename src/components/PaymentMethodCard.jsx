import React from 'react';
import { Smartphone, CreditCard, Building2, CheckCircle2 } from 'lucide-react';

export default function PaymentMethodCard({ id, name, description, selected, onSelect, badge }) {
  const getIcon = () => {
    switch (id) {
      case 'FastPay':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'Korek':
        return <Building2 className="w-5 h-5 text-blue-400" />;
      case 'MasterCard':
        return <CreditCard className="w-5 h-5 text-purple-400" />;
      default:
        return <CreditCard className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(id)}
      className={`cursor-pointer rounded-2xl p-4 border transition-all duration-200 flex items-start gap-4 relative ${
        selected
          ? 'bg-[#0d162a] border-cyan-400 shadow-lg shadow-cyan-500/10'
          : 'bg-[#090d18] hover:bg-[#0c1222] border-slate-800/80 hover:border-slate-700'
      }`}
    >
      <div className={`p-2.5 rounded-xl border ${selected ? 'bg-cyan-950/80 border-cyan-500/40' : 'bg-slate-900 border-slate-800'}`}>
        {getIcon()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-slate-100 text-sm">{name}</h4>
          {badge && (
            <span className="text-[10px] font-extrabold bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded uppercase">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{description}</p>
      </div>

      <div className="shrink-0 pt-0.5">
        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
            selected
              ? 'border-cyan-400 bg-cyan-500 text-black'
              : 'border-slate-700 bg-slate-900'
          }`}
        >
          {selected && <CheckCircle2 className="w-4 h-4 fill-black text-cyan-400" />}
        </div>
      </div>
    </div>
  );
}
