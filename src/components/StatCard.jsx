import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'cyan', subtext }) {
  const colorStyles = {
    cyan: 'from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30',
    purple: 'from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/30',
    emerald: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
    amber: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30',
  }[color] || 'from-slate-800 to-slate-900 text-slate-200 border-slate-700';

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${colorStyles} border backdrop-blur-md flex items-center justify-between shadow-lg`}>
      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">{title}</span>
        <h3 className="text-2xl font-black text-white tracking-tight">{value}</h3>
        {subtext && <p className="text-[11px] text-slate-400">{subtext}</p>}
      </div>
      {Icon && (
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 shrink-0">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
