import React from 'react';
import { CheckCircle2, Shield, Smartphone, CreditCard } from 'lucide-react';

export default function PaymentMethodCard({ method, selected = false, onSelect }) {
  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-200 select-none ${
        selected
          ? 'bg-slate-900 border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.15)] ring-1 ring-cyan-400'
          : 'bg-[#0a0f1d] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white shadow"
            style={{ backgroundColor: method.color }}
          >
            {method.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-white text-sm">{method.name}</h4>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {method.badge}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{method.tagline}</p>
          </div>
        </div>

        <div className="pt-0.5">
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
              selected ? 'border-cyan-400 bg-cyan-500' : 'border-slate-600'
            }`}
          >
            {selected && <CheckCircle2 className="w-4 h-4 text-black stroke-[3]" />}
          </div>
        </div>
      </div>

      {/* Account Info Details shown when selected */}
      {selected && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs space-y-1.5 animate-in fade-in duration-200">
          <div className="flex justify-between items-center text-slate-300">
            <span className="text-slate-400">Recipient Name:</span>
            <span className="font-semibold text-white">{method.accountName}</span>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span className="text-slate-400">Account / Phone:</span>
            <span className="font-mono font-bold text-cyan-400 bg-black/40 px-2 py-0.5 rounded border border-cyan-900/40">
              {method.accountNumber}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 bg-slate-950/60 p-2 rounded border border-slate-800">
            {method.description}
          </p>
        </div>
      )}
    </div>
  );
}
