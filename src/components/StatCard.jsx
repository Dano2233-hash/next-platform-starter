import React from 'react';

export default function StatCard({ label, value, icon: Icon, color = 'cyan', subtext }) {
  const colorMap = {
    cyan: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    purple: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
    emerald: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    amber: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
  };

  const style = colorMap[color] || colorMap.cyan;

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${style} bg-slate-900/90 border backdrop-blur-md flex items-center justify-between shadow-lg`}>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</span>
        <span className="text-2xl font-black text-white">{value}</span>
        {subtext && <span className="text-[11px] text-slate-400">{subtext}</span>}
      </div>
      {Icon && (
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 shrink-0">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
