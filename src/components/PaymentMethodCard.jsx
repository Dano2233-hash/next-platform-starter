import React from 'react';
import { CheckCircle, Shield } from 'lucide-react';

const PaymentMethodCard = ({ method, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-200 bg-gradient-to-br ${
        method.color
      } ${
        isSelected
          ? 'ring-2 ring-cyan-400 border-cyan-400 shadow-lg shadow-cyan-500/10'
          : 'border-slate-800 opacity-80 hover:opacity-100 hover:border-slate-700'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-extrabold text-slate-100 text-sm">{method.name}</h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950/80 text-cyan-300 border border-slate-700">
              {method.badge}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">{method.description}</p>
        </div>

        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
            isSelected
              ? 'bg-cyan-400 border-cyan-400 text-slate-950'
              : 'border-slate-600 bg-slate-900'
          }`}
        >
          {isSelected && <CheckCircle className="w-4 h-4" />}
        </div>
      </div>

      {isSelected && (
        <div className="mt-3 pt-3 border-t border-slate-700/60 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
          <p className="font-semibold text-cyan-300 mb-1 flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" /> Transfer Instructions:
          </p>
          <p className="text-[11px] text-slate-400 leading-normal">{method.instructions}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodCard;
