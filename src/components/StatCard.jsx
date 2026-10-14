import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'cyan' }) {
  const colorMap = {
    cyan: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    purple: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
    emerald: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    amber: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
  };

  const style = colorMap[color] || colorMap.cyan;

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${style} border backdrop-blur-sm flex items-center justify-between gap-4 shadow-lg`}>
      <div className="space-y-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>
        <h3 className="text-2xl font-black text-white">{value}</h3>
        {subtitle && <p className="text-[11px] text-slate-400">{subtitle}</p>}
      </div>

      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
