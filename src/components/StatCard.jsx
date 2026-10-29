import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'cyan' }) {
  const colorMap = {
    cyan: 'from-cyan-500/20 to-blue-900/30 border-cyan-500/30 text-cyan-400',
    blue: 'from-blue-500/20 to-indigo-900/30 border-blue-500/30 text-blue-400',
    purple: 'from-purple-500/20 to-fuchsia-900/30 border-purple-500/30 text-purple-400',
    emerald: 'from-emerald-500/20 to-teal-900/30 border-emerald-500/30 text-emerald-400',
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${colorMap[color] || colorMap.cyan} border shadow-lg flex items-center justify-between`}>
      <div className="space-y-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>
        <div className="text-2xl font-black text-white tracking-tight">{value}</div>
        {subtitle && <span className="text-[11px] text-slate-400 block">{subtitle}</span>}
      </div>
      {Icon && (
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
