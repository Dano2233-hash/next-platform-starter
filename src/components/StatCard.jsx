import React from 'react';

const StatCard = ({ title, value, subtitle, icon: Icon, color = 'cyan' }) => {
  const colorClasses = {
    cyan: 'border-cyan-500/30 text-cyan-400 bg-cyan-950/30',
    blue: 'border-blue-500/30 text-blue-400 bg-blue-950/30',
    emerald: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/30',
    purple: 'border-purple-500/30 text-purple-400 bg-purple-950/30',
    amber: 'border-amber-500/30 text-amber-400 bg-amber-950/30'
  };

  const activeColor = colorClasses[color] || colorClasses.cyan;

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{title}</p>
        <h3 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">{value}</h3>
        {subtitle && <p className="text-[11px] text-slate-500 mt-1 font-medium">{subtitle}</p>}
      </div>

      {Icon && (
        <div className={`p-3 rounded-xl border ${activeColor} flex items-center justify-center shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

export default StatCard;
