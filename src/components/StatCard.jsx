import React from 'react';

export const StatCard = ({ title, value, icon: Icon, color = 'cyan', change }) => {
  const colorStyles = {
    cyan: 'from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30',
    purple: 'from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/30',
    emerald: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
    amber: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30'
  };

  return (
    <div className={`bg-[#0a0f1d] border rounded-2xl p-5 flex items-center justify-between shadow-lg relative overflow-hidden ${colorStyles[color] || colorStyles.cyan}`}>
      <div className="space-y-1 z-10">
        <p className="text-xs font-semibold text-slate-400">{title}</p>
        <h3 className="text-2xl font-black text-slate-100">{value}</h3>
        {change && <p className="text-[11px] font-bold text-emerald-400">{change}</p>}
      </div>

      <div className={`p-3 rounded-xl bg-slate-900 border border-slate-800 z-10 ${colorStyles[color]?.split(' ')[2]}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};

export default StatCard;
