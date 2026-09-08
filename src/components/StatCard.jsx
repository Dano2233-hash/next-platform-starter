import React from 'react';

export const StatCard = ({ title, value, icon: Icon, color = "from-blue-600 to-cyan-600", subtext }) => {
  return (
    <div className="bg-[#090e1a] border border-slate-800 rounded-2xl p-5 relative overflow-hidden group hover:border-slate-700 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</p>
          <h3 className="text-2xl font-black text-white mt-1.5 tracking-tight">{value}</h3>
          {subtext && <p className="text-[11px] text-cyan-400 mt-1 font-semibold">{subtext}</p>}
        </div>

        {Icon && (
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${color} p-0.5 shrink-0 flex items-center justify-center text-white shadow-lg`}>
            <div className="w-full h-full bg-[#080d1a]/60 rounded-[10px] flex items-center justify-center backdrop-blur-sm">
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
