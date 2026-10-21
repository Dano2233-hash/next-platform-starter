import React from 'react';

export default function StatCard({ title, value, icon: Icon, change, isCurrency = false, color = 'blue' }) {
  const colorMap = {
    blue: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
    cyan: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
    purple: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
    amber: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
  };

  return (
    <div className="p-5 bg-[#0a0f24] border border-slate-800 rounded-2xl flex items-center justify-between shadow-lg shadow-black/20">
      <div className="space-y-1">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-extrabold text-white tracking-tight">{value}</p>
        {change && (
          <p className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
            <span>↑ {change}</span>
            <span className="text-slate-500">vs last month</span>
          </p>
        )}
      </div>

      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${colorMap[color] || colorMap.blue}`}>
        {Icon && <Icon className="w-6 h-6" />}
      </div>
    </div>
  );
}
