import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'blue' }) {
  const colorsMap = {
    blue: {
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/20'
    },
    cyan: {
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-400',
      border: 'border-cyan-500/20'
    },
    purple: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      border: 'border-purple-500/20'
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/20'
    }
  };

  const c = colorsMap[color] || colorsMap.blue;

  return (
    <div className={`p-5 rounded-xl bg-[#0c0d12] border ${c.border} flex items-center justify-between shadow-xl`}>
      <div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-white mt-1.5 tracking-tight">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${c.bg} ${c.text}`}>
        {Icon && <Icon size={22} />}
      </div>
    </div>
  );
}
