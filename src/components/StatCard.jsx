import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'cyan', subtitle }) {
  const colorMap = {
    cyan: 'from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/30',
    blue: 'from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/30',
    purple: 'from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/30',
    emerald: 'from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30'
  };

  const selectedColor = colorMap[color] || colorMap.cyan;

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${selectedColor} border backdrop-blur flex items-center justify-between shadow-lg`}>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1">{value}</h3>
        {subtitle && <p className="text-[11px] text-slate-400 mt-1">{subtitle}</p>}
      </div>
      {Icon && (
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
