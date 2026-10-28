import React from 'react';

export function StatCard({ title, value, icon: Icon, description, color = "from-blue-600 to-cyan-600" }) {
  return (
    <div className="bg-[#0a0f20] border border-slate-800/90 rounded-2xl p-5 flex items-center justify-between">
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">{title}</span>
        <h3 className="text-2xl font-extrabold text-white mt-1">{value}</h3>
        {description && <p className="text-[11px] text-slate-500 mt-1">{description}</p>}
      </div>
      {Icon && (
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${color} p-0.5 shadow-md shrink-0`}>
          <div className="w-full h-full bg-[#070b19] rounded-[14px] flex items-center justify-center">
            <Icon className="w-6 h-6 text-cyan-400" />
          </div>
        </div>
      )}
    </div>
  );
}
