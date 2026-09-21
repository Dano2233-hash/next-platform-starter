import React from 'react';

export const StatCard = ({ title, value, icon: Icon, change, subtitle }) => {
  return (
    <div className="bg-[#090f1e] border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-black text-white mt-1">{value}</h3>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>

      {Icon && (
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-cyan-400">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};
