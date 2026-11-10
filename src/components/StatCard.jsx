import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, trend, color = 'blue' }) {
  const colorMap = {
    blue: 'from-blue-600/20 to-blue-900/10 border-blue-500/30 text-blue-400',
    cyan: 'from-cyan-600/20 to-cyan-900/10 border-cyan-500/30 text-cyan-400',
    purple: 'from-purple-600/20 to-purple-900/10 border-purple-500/30 text-purple-400',
    emerald: 'from-emerald-600/20 to-emerald-900/10 border-emerald-500/30 text-emerald-400'
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${colorMap[color] || colorMap.blue} border bg-[#0b101e] relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</span>
        {Icon && (
          <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="text-2xl font-black text-white tracking-tight">{value}</div>
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );
}
