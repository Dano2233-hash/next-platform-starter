import React from 'react';

export const StatCard = ({ title, value, icon: Icon, color = 'from-cyan-500 to-blue-600', subtitle }) => {
  return (
    <div className="p-5 rounded-2xl bg-[#090d1a] border border-slate-800 flex items-center justify-between shadow-lg">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>
        <h3 className="text-2xl font-extrabold text-white mt-1">{value}</h3>
        {subtitle && <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      {Icon && (
        <div className={`p-3 rounded-xl bg-gradient-to-tr ${color} text-white shadow-md shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

export default StatCard;
