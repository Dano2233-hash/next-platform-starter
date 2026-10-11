import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'cyan', subtext }) {
  const colorMap = {
    cyan: 'border-cyan-500/30 text-cyan-400 bg-cyan-950/20',
    blue: 'border-blue-500/30 text-blue-400 bg-blue-950/20',
    purple: 'border-purple-500/30 text-purple-400 bg-purple-950/20',
    emerald: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/20'
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 relative overflow-hidden flex items-center justify-between">
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">{value}</h3>
        {subtext && <p className="text-[11px] text-slate-500 mt-1">{subtext}</p>}
      </div>

      {Icon && (
        <div className={`p-3.5 rounded-2xl border ${colorMap[color] || colorMap.cyan}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
