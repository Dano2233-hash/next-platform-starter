import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'cyan', subtext }) {
  const colorStyles = {
    cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400'
  };

  return (
    <div className="bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between shadow-md">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-extrabold text-slate-100 mt-1">{value}</h3>
        {subtext && <p className="text-[11px] text-slate-500 mt-0.5">{subtext}</p>}
      </div>
      {Icon && (
        <div className={`p-3 rounded-xl border ${colorStyles[color] || colorStyles.cyan}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
