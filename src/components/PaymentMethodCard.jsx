import React from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import { CheckCircle2, ShieldCheck, Copy, Check } from 'lucide-react';

export const PaymentMethodCard = ({ selectedMethod, onSelectMethod }) => {
  const [copiedId, setCopiedId] = React.useState(null);

  const handleCopy = (e, text, id) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
        Select Payment Method (Manual Transfer)
      </label>

      <div className="grid grid-cols-1 gap-3">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;

          return (
            <div
              key={method.id}
              onClick={() => onSelectMethod(method.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 ring-1 ring-cyan-500 shadow-lg shadow-cyan-950/50'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-400 text-slate-950'
                        : 'border-slate-600 bg-slate-800'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-4 h-4 fill-cyan-400 text-slate-950" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-100 text-sm">
                        {method.name}
                      </h4>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded text-white bg-gradient-to-r ${method.badgeColor}`}>
                        {method.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-300 font-mono bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                        {method.accountNumber}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleCopy(e, method.accountNumber, method.id)}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
                        title="Copy Account Number"
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
              </div>

              {isSelected && (
                <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-300 space-y-1.5 bg-slate-950/60 p-3 rounded-lg">
                  <p className="font-semibold text-cyan-400 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Account Holder: {method.accountHolder}
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    {method.instructions}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
