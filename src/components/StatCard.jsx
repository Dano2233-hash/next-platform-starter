import React from 'react';

export const StatCard = ({ title, value, icon: Icon, color = 'cyan', subtitle }) => {
  const colorMap = {
    cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
    blue: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    purple: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    amber: 'bg-amber-500/10 border-amber-500/30 text-amber-400'
  };

  return (
    <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-black text-slate-100 mt-1">{value}</h3>
        {subtitle && <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {Icon && (
        <div className={`p-3.5 rounded-2xl border ${colorMap[color] || colorMap.cyan}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};
