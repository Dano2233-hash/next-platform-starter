import React from 'react';
import { Check, Smartphone, CreditCard, ShieldCheck } from 'lucide-react';

export default function PaymentMethodCard({ method, selected, onSelect }) {
  const getPaymentDetails = (id) => {
    switch (id) {
      case 'FastPay':
        return {
          name: 'FastPay',
          badge: 'Popular in Kurdistan',
          desc: 'Manual mobile wallet transfer via FastPay number',
          icon: <Smartphone className="w-5 h-5 text-cyan-400" />,
          color: 'from-cyan-500/10 to-blue-500/10 border-cyan-500/40'
        };
      case 'Korek':
        return {
          name: 'Korek Telecom',
          badge: 'Fast Local',
          desc: 'Korek Telecom direct balance transfer / card',
          icon: <Smartphone className="w-5 h-5 text-amber-400" />,
          color: 'from-amber-500/10 to-orange-500/10 border-amber-500/40'
        };
      case 'MasterCard':
        return {
          name: 'MasterCard',
          badge: 'Bank Card',
          desc: 'MasterCard / FIB / National Bank card transfer',
          icon: <CreditCard className="w-5 h-5 text-blue-400" />,
          color: 'from-blue-500/10 to-indigo-500/10 border-blue-500/40'
        };
      default:
        return {
          name: method,
          badge: 'Manual Payment',
          desc: 'Manual payment processing',
          icon: <CreditCard className="w-5 h-5 text-slate-400" />,
          color: 'border-slate-800'
        };
    }
  };

  const info = getPaymentDetails(method);

  return (
    <div
      onClick={() => onSelect(method)}
      className={`relative p-4 rounded-xl cursor-pointer border transition-all ${
        selected
          ? `bg-gradient-to-r ${info.color} border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg`
          : 'bg-[#0b0f19] hover:bg-[#111726] border-slate-800'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700/60">
            {info.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-slate-100 text-sm">{info.name}</h4>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {info.badge}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{info.desc}</p>
          </div>
        </div>

        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
          selected ? 'bg-cyan-500 border-cyan-400 text-white' : 'border-slate-700 bg-slate-900'
        }`}>
          {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>
      </div>
    </div>
  );
}
