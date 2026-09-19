import React from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import { Check, Copy, Wallet, CreditCard, Phone } from 'lucide-react';

export const PaymentMethodCard = ({ selectedMethod, onSelectMethod }) => {
  const [copiedId, setCopiedId] = React.useState(null);

  const handleCopy = (e, method) => {
    e.stopPropagation();
    navigator.clipboard.writeText(method.number);
    setCopiedId(method.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <div
              key={method.id}
              onClick={() => onSelectMethod(method.id)}
              className={`relative cursor-pointer rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#0f172a] border-cyan-500 shadow-lg shadow-cyan-500/10'
                  : 'bg-[#0a0e1a] border-slate-800 hover:border-slate-700 hover:bg-[#0d1324]'
              }`}
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md text-white bg-gradient-to-r ${method.iconColor}`}
                >
                  {method.badge}
                </span>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-cyan-500 border-cyan-400 text-black'
                      : 'border-slate-700 bg-slate-900'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>

              {/* Method Title */}
              <div>
                <h4 className="text-sm font-bold text-slate-100">{method.name}</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {method.description}
                </p>
              </div>

              {/* Details & Copy */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Account / Number
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    {method.number}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => handleCopy(e, method)}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
                  title="Copy Number"
                >
                  {copiedId === method.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
