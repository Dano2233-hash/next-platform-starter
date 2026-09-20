import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export const PaymentMethodCard = ({ method, selected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`cursor-pointer rounded-xl p-4 border transition-all duration-200 relative flex flex-col justify-between ${
        selected
          ? 'bg-[#0f1a36] border-cyan-400 shadow-lg shadow-cyan-950/60 ring-1 ring-cyan-400'
          : 'bg-[#0b1021] hover:bg-[#0e162e] border-slate-800'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Custom Radio Indicator */}
        <div className="flex items-center gap-3">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
              selected
                ? 'border-cyan-400 bg-cyan-400 text-slate-950'
                : 'border-slate-600 bg-slate-900'
            }`}
          >
            {selected && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              {method.name}
            </h4>
            <span className="text-[11px] text-cyan-400 font-medium">{method.type}</span>
          </div>
        </div>

        <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
          Manual
        </span>
      </div>

      <p className="text-xs text-slate-400 mt-3 leading-relaxed">
        {method.description}
      </p>

      {/* Account Details Box when Selected */}
      {selected && (
        <div className="mt-4 p-3 rounded-lg bg-[#070d1d] border border-cyan-500/30 text-xs text-slate-300 space-y-1">
          <div className="text-[10px] uppercase font-bold text-cyan-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Transfer Account Info:
          </div>
          <div className="font-mono text-cyan-200 font-semibold select-all bg-slate-900/80 p-1.5 rounded border border-slate-800">
            {method.accountDetails}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodCard;
