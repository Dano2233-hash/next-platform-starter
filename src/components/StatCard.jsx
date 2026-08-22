import React from 'react';

export const StatCard = ({ title, value, icon: Icon, trend, color = 'from-blue-600 to-cyan-500' }) => {
  return (
    <div className="bg-[#090e21] border border-slate-800 rounded-2xl p-5 relative overflow-hidden group shadow-lg">
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-10 rounded-bl-full pointer-events-none group-hover:opacity-20 transition-opacity`} />

      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</span>
        {Icon && (
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${color} text-slate-950 font-bold shadow-md`}>
            <Icon className="w-5 h-5 text-slate-950" />
          </div>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-2xl font-extrabold text-white font-heading tracking-tight">{value}</h3>
        {trend && <p className="text-xs text-cyan-400 mt-1 font-semibold">{trend}</p>}
      </div>
    </div>
  );
};

export default StatCard;
