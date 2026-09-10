import React from 'react';

export default function StatCard({ title, value, icon: Icon, trend, color = 'cyan' }) {
  const colorMap = {
    cyan: 'from-cyan-500/10 to-cyan-500/5 text-cyan-400 border-cyan-500/30',
    purple: 'from-purple-500/10 to-purple-500/5 text-purple-400 border-purple-500/30',
    emerald: 'from-emerald-500/10 to-emerald-500/5 text-emerald-400 border-emerald-500/30',
    amber: 'from-amber-500/10 to-amber-500/5 text-amber-400 border-amber-500/30'
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${colorMap[color]} border shadow-xl flex items-center justify-between`}>
      <div className="space-y-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <h4 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
          {value}
        </h4>
        {trend && (
          <p className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
            <span>↑ {trend}</span>
          </p>
        )}
      </div>

      <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
