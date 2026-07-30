import React from 'react';

export default function StatCard({ title, value, icon: Icon, colorClass = 'text-cyan-400' }) {
  return (
    <div className="bg-[#0d0d12] border border-white/5 p-6 rounded-2xl flex items-center justify-between shadow-lg">
      <div className="text-left">
        <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-black text-white mt-1.5 tracking-tight">{value}</h3>
      </div>
      <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${colorClass}`}>
        {Icon && <Icon className="w-6 h-6" />}
      </div>
    </div>
  );
}
