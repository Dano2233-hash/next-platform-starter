import React from 'react';

export default function StatCard({ title, value, icon: Icon, trend = null, color = 'cyan' }) {
  const colorMap = {
    cyan: 'from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30',
    purple: 'from-purple-500/20 to-indigo-500/10 text-purple-400 border-purple-500/30',
    amber: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30',
    emerald: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30'
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${colorMap[color] || colorMap.cyan} border shadow-lg backdrop-blur-md`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        {Icon && <Icon className="w-5 h-5" />}
      </div>
      <div className="text-2xl font-black text-slate-100 tracking-tight">{value}</div>
      {trend && <div className="text-[11px] text-slate-400 mt-1 font-medium">{trend}</div>}
    </div>
  );
}
