import React from 'react';
import { CheckCircle2 } from 'lucide-react';

/**
 * Payment method selection limited strictly to:
 * - FastPay
 * - Korek
 * - MasterCard
 * (Qi Card, AsiaPay, ZainCash, Google Pay are EXCLUDED as per prompt instructions)
 */
export const PAYMENT_METHODS = [
  {
    id: 'FastPay',
    name: 'FastPay Iraq',
    account: '0750 123 4567',
    badge: 'Instant Transfer',
    description: 'Send manual payment using your FastPay app. Fast confirmation within minutes.',
    color: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-400',
    dot: 'bg-cyan-400',
  },
  {
    id: 'Korek',
    name: 'Korek Telecom',
    account: '0750 987 6543',
    badge: 'Korek Balance / Cash',
    description: 'Transfer balance to our Korek service number or top-up PIN voucher.',
    color: 'border-rose-500/50 bg-rose-950/20 text-rose-400',
    dot: 'bg-rose-400',
  },
  {
    id: 'MasterCard',
    name: 'MasterCard / Visa Iraq',
    account: 'IBAN: IQ44FIB00012345678901',
    badge: 'Iraqi Bank Transfer',
    description: 'Direct manual bank transfer to our First Iraqi Bank (FIB) / MasterCard account.',
    color: 'border-amber-500/50 bg-amber-950/20 text-amber-400',
    dot: 'bg-amber-400',
  },
];

export default function PaymentMethodCard({ selectedMethod, onSelect }) {
  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
        Select Payment Method *
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <div
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-500 shadow-md shadow-cyan-950/40'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${method.dot}`} />
                    <span className="font-bold text-sm text-white">{method.name}</span>
                  </div>
                  {isSelected && (
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                  )}
                </div>

                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 inline-block mb-2">
                  {method.badge}
                </span>

                <p className="text-xs text-slate-400 leading-relaxed mb-2">
                  {method.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/60 text-[11px] font-mono text-cyan-300">
                Number / Account: <span className="font-bold text-white">{method.account}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
