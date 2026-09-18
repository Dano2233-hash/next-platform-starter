import React from 'react';
import { CreditCard, Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function PaymentMethodCard({ method, selectedMethod, onSelect }) {
  const isSelected = selectedMethod === method.id;

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
        isSelected
          ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-950/50'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
            isSelected
              ? 'bg-cyan-500 text-black'
              : 'bg-slate-800 text-cyan-400 border border-slate-700'
          }`}
        >
          {method.icon === 'fastpay' && <Smartphone className="w-5 h-5" />}
          {method.icon === 'korek' && <Smartphone className="w-5 h-5" />}
          {method.icon === 'mastercard' && <CreditCard className="w-5 h-5" />}
        </div>

        <div>
          <h4 className="font-bold text-sm text-white flex items-center gap-2">
            {method.name}
            {method.tag && (
              <span className="text-[10px] bg-slate-800 text-cyan-400 border border-cyan-500/20 px-1.5 py-0.2 rounded font-bold">
                {method.tag}
              </span>
            )}
          </h4>
          <p className="text-xs text-slate-400">{method.description}</p>
        </div>
      </div>

      <div
        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
          isSelected
            ? 'border-cyan-400 bg-cyan-500 text-slate-950'
            : 'border-slate-700 bg-slate-900'
        }`}
      >
        {isSelected && <CheckCircle2 className="w-4 h-4 fill-cyan-400 text-slate-950" />}
      </div>
    </div>
  );
}
