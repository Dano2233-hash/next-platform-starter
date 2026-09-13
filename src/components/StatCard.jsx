import React from 'react';

export const StatCard = ({ title, value, icon: Icon, trend, color = 'blue' }) => {
  const colorMap = {
    blue: 'border-blue-500/20 text-blue-400 bg-blue-500/10',
    cyan: 'border-cyan-500/20 text-cyan-400 bg-cyan-500/10',
    purple: 'border-purple-500/20 text-purple-400 bg-purple-500/10',
    emerald: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/10',
    amber: 'border-amber-500/20 text-amber-400 bg-amber-500/10'
  };

  return (
    <div className="bg-[#090e1a] border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between">
      <div>
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-extrabold text-white mt-1.5">{value}</h3>
        {trend && <p className="text-[11px] text-emerald-400 font-medium mt-1">{trend}</p>}
      </div>

      {Icon && (
        <div className={`p-3 rounded-xl border ${colorMap[color] || colorMap.blue}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};
