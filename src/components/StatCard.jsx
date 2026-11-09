import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'cyan' }) {
  const colorMap = {
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
  };

  const selectedTheme = colorMap[color] || colorMap.cyan;

  return (
    <div className="p-5 rounded-2xl bg-[#090d1e] border border-white/5 flex items-start justify-between">
      <div>
        <p className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">{title}</p>
        <h4 className="text-2xl font-black text-white font-heading">{value}</h4>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {Icon && (
        <div className={`p-3 rounded-xl border ${selectedTheme}`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
