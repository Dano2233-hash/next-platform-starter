import React from 'react';
import { CheckCircle2, ShieldCheck, Copy } from 'lucide-react';

export default function PaymentMethodCard({
  method,
  isSelected,
  onSelect
}) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyAccount = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(method.accountNumber.replace(/\s+/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-200 select-none ${
        isSelected
          ? 'bg-gradient-to-r from-slate-900 via-[#0a1224] to-slate-900 border-cyan-500 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-950/40'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center text-white font-extrabold text-sm shadow-md`}>
            {method.id[0]}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-white text-sm sm:text-base">{method.name}</h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/40 font-semibold">
                {method.badge}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{method.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
            isSelected
              ? 'border-cyan-500 bg-cyan-500 text-black'
              : 'border-slate-700 bg-slate-950'
          }`}>
            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 fill-current" />}
          </div>
        </div>
      </div>

      {/* Account Info Box */}
      <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div>
          <span className="text-slate-400">Account / Number: </span>
          <span className="font-mono font-bold text-cyan-300">{method.accountNumber}</span>
        </div>

        <button
          type="button"
          onClick={handleCopyAccount}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-cyan-400 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60 self-start sm:self-auto cursor-pointer"
        >
          <Copy className="w-3 h-3" />
          <span>{copied ? 'Copied!' : 'Copy Info'}</span>
        </button>
      </div>

      {isSelected && (
        <div className="mt-3 p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200 leading-relaxed">
          <strong className="text-white">Payment Instruction: </strong>
          {method.instructions}
        </div>
      )}
    </div>
  );
}
