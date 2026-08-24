import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function PaymentMethodCard({ method, isSelected, onSelect }) {
  const { id, name, accountNumber, accountName, description, badgeColor } = method;

  return (
    <div
      onClick={() => onSelect(id)}
      className={`relative p-4 rounded-xl cursor-pointer border transition-all duration-200 ${
        isSelected
          ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${badgeColor}`} />
          <div>
            <h4 className="font-bold text-slate-100 text-sm">{name}</h4>
            <p className="text-xs text-slate-400 mt-0.5">{description}</p>
          </div>
        </div>
        {isSelected && <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0" />}
      </div>

      {isSelected && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300 space-y-1 bg-slate-950/60 p-2.5 rounded-lg">
          <div className="flex justify-between">
            <span className="text-slate-400">Account Number:</span>
            <span className="font-mono font-bold text-cyan-300">{accountNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Account Name:</span>
            <span className="font-semibold text-slate-200">{accountName}</span>
          </div>
        </div>
      )}
    </div>
  );
}
