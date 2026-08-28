import React from 'react';

export function StatCard({ title, value, icon: Icon, color = 'cyan', subtext }) {
  const colorMap = {
    cyan: 'from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30',
    purple: 'from-purple-500/20 to-indigo-500/10 text-purple-400 border-purple-500/30',
    emerald: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
    amber: 'from-amber-500/20 to-yellow-500/10 text-amber-400 border-amber-500/30',
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${colorMap[color] || colorMap.cyan} border bg-slate-900/90 shadow-xl flex items-center justify-between`}>
      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</span>
        <h3 className="text-2xl sm:text-3xl font-black text-white">{value}</h3>
        {subtext && <p className="text-[11px] text-slate-400">{subtext}</p>}
      </div>
      {Icon && (
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 shadow-inner">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}

export default StatCard;
