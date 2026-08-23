import React from 'react';

export function StatCard({ title, value, icon: Icon, color = 'cyan', subtitle }) {
  const colorMap = {
    cyan: 'from-cyan-500/10 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    purple: 'from-purple-500/10 to-indigo-500/10 border-purple-500/30 text-purple-400',
    emerald: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    amber: 'from-amber-500/10 to-orange-500/10 border-amber-500/30 text-amber-400',
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${colorMap[color] || colorMap.cyan} border backdrop-blur-md flex items-center justify-between`}>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-black text-white mt-1">{value}</h3>
        {subtitle && <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
