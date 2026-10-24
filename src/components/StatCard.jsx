import React from 'react';

export const StatCard = ({ title, value, icon: Icon, trend, color = 'cyan' }) => {
  const colorStyles = {
    cyan: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    purple: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
    emerald: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    amber: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400'
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${colorStyles[color]} border backdrop-blur-xs flex items-center justify-between`}>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{title}</p>
        <h3 className="font-heading font-black text-2xl text-slate-100">{value}</h3>
        {trend && <p className="text-[11px] text-slate-400 mt-1 font-medium">{trend}</p>}
      </div>

      {Icon && (
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
          <Icon size={24} />
        </div>
      )}
    </div>
  );
};

export default StatCard;
