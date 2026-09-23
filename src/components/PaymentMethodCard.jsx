import React from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import { CheckCircle2, Zap, PhoneCall, CreditCard } from 'lucide-react';

const iconMap = {
  Zap: Zap,
  PhoneCall: PhoneCall,
  CreditCard: CreditCard
};

export default function PaymentMethodCard({ selectedMethod, onSelect }) {
  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
        Select Payment Method <span className="text-red-400">*</span>
      </label>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          const IconComponent = iconMap[method.icon] || CreditCard;

          return (
            <div
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 text-cyan-400">
                  <CheckCircle2 className="w-5 h-5 fill-cyan-400 text-slate-950" />
                </div>
              )}

              <div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-3 border`}>
                  <IconComponent className="w-5 h-5" />
                </div>

                <h4 className="font-extrabold text-sm text-white mb-1">{method.name}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  {method.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Account Info:</span>
                <span className="font-bold text-cyan-300 font-mono">{method.accountNumber}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
