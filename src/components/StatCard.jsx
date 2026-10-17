import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'cyan' }) {
  const colorMap = {
    cyan: 'from-cyan-500/10 to-blue-500/10 border-cyan-500/20 text-cyan-400',
    purple: 'from-purple-500/10 to-indigo-500/10 border-purple-500/20 text-purple-400',
    emerald: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-400',
    amber: 'from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-400'
  };

  return (
    <div className={`p-5 rounded-2xl bg-slate-900 border ${colorMap[color] || colorMap.cyan} flex items-center justify-between`}>
      <div className="space-y-1">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        <div className="text-xl sm:text-2xl font-black text-white">{value}</div>
      </div>
      {Icon && (
        <div className={`w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
