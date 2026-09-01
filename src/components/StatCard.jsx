import React from 'react';

export const StatCard = ({ title, value, icon: Icon, color = 'cyan' }) => {
  const colorMap = {
    cyan: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    purple: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
    emerald: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    amber: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400'
  };

  const styleClass = colorMap[color] || colorMap.cyan;

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${styleClass} border backdrop-blur-sm flex items-center justify-between`}>
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
        <h3 className="text-2xl font-extrabold text-white mt-1">{value}</h3>
      </div>
      {Icon && (
        <div className="p-3 rounded-xl bg-slate-950/40 border border-white/10">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};
