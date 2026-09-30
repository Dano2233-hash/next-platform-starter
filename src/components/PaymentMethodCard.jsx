import React from 'react';
import { CheckCircle2, Copy, Check } from 'lucide-react';
import { PAYMENT_METHODS } from '../data/categories';

export function PaymentMethodCard({ selectedMethod, onSelectMethod }) {
  const [copiedId, setCopiedId] = React.useState(null);

  const handleCopy = (e, text, id) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
          Select Manual Payment Method *
        </label>
        <span className="text-[11px] text-cyan-400 font-semibold">Kurdistan / Iraq Local</span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <div
              key={method.id}
              onClick={() => onSelectMethod(method.id)}
              className={`relative p-4 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/60 border-cyan-400 ring-1 ring-cyan-400 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-cyan-400 bg-cyan-400 text-slate-950' : 'border-slate-600'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-4 h-4 fill-cyan-400 text-slate-950" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{method.name}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-slate-800 text-cyan-300 border border-slate-700">
                        {method.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{method.description}</p>
                  </div>
                </div>

                {/* Account Details Box */}
                <div className="shrink-0 flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block font-mono uppercase">Number</span>
                    <span className="text-xs font-mono font-bold text-cyan-300">{method.accountNumber}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleCopy(e, method.accountNumber, method.id)}
                    className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    title="Copy payment number"
                  >
                    {copiedId === method.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PaymentMethodCard;
