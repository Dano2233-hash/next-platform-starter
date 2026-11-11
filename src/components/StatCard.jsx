import React from 'react';

export function StatCard({ title, value, change, icon: Icon, color = 'cyan' }) {
  const colorMap = {
    cyan: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    purple: 'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400',
    emerald: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    amber: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400'
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${colorMap[color]} border bg-slate-900/90 shadow-sm flex items-center justify-between`}>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
        <h4 className="text-2xl font-black text-white mt-1">{value}</h4>
        {change && <span className="text-[11px] text-slate-400 mt-1 block">{change}</span>}
      </div>
      <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}

export default StatCard;
