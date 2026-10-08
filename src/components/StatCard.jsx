import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'cyan', subtext }) {
  const colorStyles = {
    cyan: 'bg-cyan-950/40 border-cyan-800/50 text-cyan-400',
    blue: 'bg-blue-950/40 border-blue-800/50 text-blue-400',
    purple: 'bg-purple-950/40 border-purple-800/50 text-purple-400',
    emerald: 'bg-emerald-950/40 border-emerald-800/50 text-emerald-400',
  };

  return (
    <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
          {title}
        </span>
        <h3 className="text-2xl font-extrabold text-slate-100 mt-1">{value}</h3>
        {subtext && <p className="text-[11px] text-slate-500 mt-0.5">{subtext}</p>}
      </div>
      <div className={`p-3 rounded-xl border ${colorStyles[color] || colorStyles.cyan}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
