import React from 'react';

export const StatCard = ({ title, value, icon: Icon, color = 'cyan', subtitle }) => {
  const colorStyles = {
    cyan: 'from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30',
    purple: 'from-purple-500/20 to-fuchsia-500/10 text-purple-400 border-purple-500/30',
    emerald: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
    amber: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30'
  };

  return (
    <div className="bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden flex items-center justify-between">
      <div className="space-y-1 z-10">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          {title}
        </span>
        <div className="text-2xl font-black text-white tracking-tight">{value}</div>
        {subtitle && <p className="text-[11px] font-medium text-slate-500">{subtitle}</p>}
      </div>

      {Icon && (
        <div
          className={`p-3.5 rounded-2xl bg-gradient-to-br border shadow-md z-10 ${
            colorStyles[color] || colorStyles.cyan
          }`}
        >
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};
