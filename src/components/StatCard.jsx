import React from 'react';

export const StatCard = ({ title, value, icon: Icon, color = 'cyan', subtitle }) => {
  const colorStyles = {
    cyan: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    purple: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
    emerald: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    amber: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${colorStyles[color]} border shadow-lg flex items-center justify-between`}>
      <div>
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">{title}</span>
        <h3 className="text-2xl font-extrabold text-white mt-1">{value}</h3>
        {subtitle && <p className="text-[11px] text-slate-400 mt-1">{subtitle}</p>}
      </div>
      {Icon && (
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};
