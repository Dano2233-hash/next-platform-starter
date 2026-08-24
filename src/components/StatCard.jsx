import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'cyan' }) {
  const colorMap = {
    cyan: 'from-cyan-500/10 to-blue-500/10 border-cyan-500/20 text-cyan-400',
    green: 'from-emerald-500/10 to-green-500/10 border-emerald-500/20 text-emerald-400',
    purple: 'from-purple-500/10 to-indigo-500/10 border-purple-500/20 text-purple-400',
    amber: 'from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-400',
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${colorMap[color] || colorMap.cyan} border backdrop-blur-sm flex items-center justify-between`}>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-extrabold text-slate-100 mt-1">{value}</p>
      </div>
      {Icon && (
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
