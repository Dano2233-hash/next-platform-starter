import React from 'react';

export function PaymentMethodCard({ method, selected, onSelect }) {
  // Config for each valid method
  const configs = {
    FastPay: {
      name: 'FastPay',
      desc: 'Mobile Wallet in Kurdistan/Iraq',
      badge: 'Popular',
      color: 'border-red-500/30 hover:border-red-500/60 bg-red-950/5',
      selectedColor: 'ring-2 ring-red-500 border-red-500 bg-red-950/20'
    },
    Korek: {
      name: 'Korek Telecom',
      desc: 'Pay via Korek Credit Balance',
      badge: 'Easy',
      color: 'border-blue-500/30 hover:border-blue-500/60 bg-blue-950/5',
      selectedColor: 'ring-2 ring-blue-500 border-blue-500 bg-blue-950/20'
    },
    MasterCard: {
      name: 'MasterCard',
      desc: 'Debit/Credit card manual transfer',
      badge: 'International',
      color: 'border-orange-500/30 hover:border-orange-500/60 bg-orange-950/5',
      selectedColor: 'ring-2 ring-orange-500 border-orange-500 bg-orange-950/20'
    }
  };

  const config = configs[method] || {
    name: method,
    desc: 'Manual Transfer',
    color: 'border-slate-800 hover:border-slate-700 bg-slate-900/40',
    selectedColor: 'ring-2 ring-cyan-500 border-cyan-500 bg-slate-900'
  };

  return (
    <div
      onClick={() => onSelect(method)}
      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 select-none ${
        selected ? config.selectedColor : config.color
      }`}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-black text-white uppercase tracking-wider">
          {config.name}
        </span>
        {config.badge && (
          <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
            {config.badge}
          </span>
        )}
      </div>
      <p className="text-xs text-slate-400">
        {config.desc}
      </p>
    </div>
  );
}
