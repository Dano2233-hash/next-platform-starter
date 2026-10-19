import React from 'react';

export default function StatCard({ title, value, subtext, icon: Icon, color = 'cyan' }) {
  const colorMap = {
    cyan: 'from-cyan-500/10 to-blue-600/10 border-cyan-500/30 text-cyan-400',
    purple: 'from-purple-500/10 to-pink-600/10 border-purple-500/30 text-purple-400',
    green: 'from-green-500/10 to-emerald-600/10 border-green-500/30 text-green-400',
    amber: 'from-amber-500/10 to-orange-600/10 border-amber-500/30 text-amber-400',
  };

  return (
    <div
      className={`p-5 rounded-2xl bg-gradient-to-br ${colorMap[color] || colorMap.cyan} border flex items-center justify-between shadow-lg`}
    >
      <div>
        <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">{title}</p>
        <p className="text-2xl font-black text-white mt-1 font-mono">{value}</p>
        {subtext && <p className="text-[11px] text-slate-400 mt-1 font-medium">{subtext}</p>}
      </div>

      {Icon && (
        <div className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
