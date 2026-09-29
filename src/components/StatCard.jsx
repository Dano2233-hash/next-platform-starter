import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'cyan' }) {
  const colorMap = {
    cyan: 'from-cyan-500/20 via-blue-500/10 to-transparent border-cyan-500/40 text-cyan-400',
    purple: 'from-purple-500/20 via-indigo-500/10 to-transparent border-purple-500/40 text-purple-400',
    amber: 'from-amber-500/20 via-orange-500/10 to-transparent border-amber-500/40 text-amber-400',
    emerald: 'from-emerald-500/20 via-teal-500/10 to-transparent border-emerald-500/40 text-emerald-400',
  };

  return (
    <div className={`rounded-2xl p-5 border bg-gradient-to-br ${colorMap[color] || colorMap.cyan} shadow-lg relative overflow-hidden flex items-center justify-between`}>
      <div className="space-y-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
          {title}
        </span>
        <h3 className="text-2xl font-black text-slate-100">{value}</h3>
        {subtitle && <p className="text-[11px] text-slate-400">{subtitle}</p>}
      </div>

      {Icon && (
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md shrink-0">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
