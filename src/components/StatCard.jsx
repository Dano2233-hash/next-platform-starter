import React from 'react';

export default function StatCard({ title, value, subtext, icon: Icon, color = 'cyan' }) {
  const colorStyles = {
    cyan: 'from-cyan-500/10 to-blue-500/10 text-cyan-400 border-cyan-500/30',
    purple: 'from-purple-500/10 to-pink-500/10 text-purple-400 border-purple-500/30',
    amber: 'from-amber-500/10 to-orange-500/10 text-amber-400 border-amber-500/30',
    emerald: 'from-emerald-500/10 to-teal-500/10 text-emerald-400 border-emerald-500/30',
  }[color] || 'from-cyan-500/10 to-blue-500/10 text-cyan-400 border-cyan-500/30';

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${colorStyles} border bg-[#0d1322] shadow-lg flex items-center justify-between`}>
      <div className="space-y-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>
        <div className="text-2xl font-black text-white font-sans">{value}</div>
        {subtext && <p className="text-[11px] text-slate-400 font-mono">{subtext}</p>}
      </div>
      {Icon && (
        <div className={`p-3 rounded-xl bg-slate-900/80 border border-slate-800`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
