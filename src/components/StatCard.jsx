import React from 'react';

export const StatCard = ({ title, value, icon: Icon, colorClass = "text-cyan-400", bgClass = "bg-cyan-500/10 border-cyan-500/30" }) => {
  return (
    <div className="bg-[#0a0e1a] border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between shadow-lg">
      <div className="space-y-1">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        <div className="text-2xl font-extrabold text-white">{value}</div>
      </div>
      <div className={`p-3.5 rounded-xl border ${bgClass} ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};
