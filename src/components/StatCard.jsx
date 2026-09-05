import React from 'react';

export const StatCard = ({ title, value, subtitle, icon: Icon, color = 'cyan' }) => {
  const colorClasses = {
    cyan: 'from-cyan-500/20 to-blue-600/10 border-cyan-500/30 text-cyan-400',
    purple: 'from-purple-500/20 to-indigo-600/10 border-purple-500/30 text-purple-400',
    green: 'from-emerald-500/20 to-teal-600/10 border-emerald-500/30 text-emerald-400',
    amber: 'from-amber-500/20 to-orange-600/10 border-amber-500/30 text-amber-400'
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${colorClasses[color] || colorClasses.cyan} border backdrop-blur-md flex items-center justify-between`}>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-2xl font-black text-white tracking-tight">{value}</h3>
        {subtitle && <p className="text-[11px] text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {Icon && (
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};
