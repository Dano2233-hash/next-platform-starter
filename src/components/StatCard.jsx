import React from 'react';

export function StatCard({ title, value, icon: Icon, color = 'cyan', subtext }) {
  const colorMap = {
    cyan: 'from-cyan-500/10 to-blue-500/5 border-cyan-500/20 text-cyan-400',
    purple: 'from-purple-500/10 to-indigo-500/5 border-purple-500/20 text-purple-400',
    emerald: 'from-emerald-500/10 to-teal-500/5 border-emerald-500/20 text-emerald-400',
    amber: 'from-amber-500/10 to-orange-500/5 border-amber-500/20 text-amber-400',
  };

  const selectedColor = colorMap[color] || colorMap.cyan;

  return (
    <div className={`bg-gradient-to-br ${selectedColor} border rounded-2xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4">
        <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">{value}</span>
        {subtext && (
          <p className="text-xs text-slate-400 font-medium mt-1">{subtext}</p>
        )}
      </div>
    </div>
  );
}
