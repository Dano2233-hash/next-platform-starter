import React from 'react';

export const StatCard = ({ title, value, subtext, icon: Icon, color = 'cyan' }) => {
  const colorMap = {
    cyan: 'from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/30',
    purple: 'from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/30',
    blue: 'from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/30',
    emerald: 'from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30'
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${colorMap[color]} border backdrop-blur-md flex items-center justify-between`}>
      <div className="space-y-1">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</p>
        <h3 className="text-2xl font-black text-slate-100">{value}</h3>
        {subtext && <p className="text-[11px] text-slate-400">{subtext}</p>}
      </div>
      {Icon && (
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

export default StatCard;
