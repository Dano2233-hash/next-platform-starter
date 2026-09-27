import React from 'react';

export default function StatCard({ title, value, icon: Icon, change, color = 'from-blue-600 to-cyan-600' }) {
  return (
    <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
      <div className="space-y-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>
        <h3 className="text-2xl font-black text-white">{value}</h3>
        {change && (
          <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
            {change}
          </span>
        )}
      </div>

      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${color} p-[1px] shadow-lg shrink-0`}>
        <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center text-cyan-400">
          {Icon && <Icon className="w-6 h-6" />}
        </div>
      </div>
    </div>
  );
}
