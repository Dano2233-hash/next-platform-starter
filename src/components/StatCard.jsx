import React from 'react';

export default function StatCard({ label, value, subtext, icon: Icon, color = 'cyan' }) {
  const colorMap = {
    cyan: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30',
    blue: 'text-blue-400 bg-blue-950/40 border-blue-500/30',
    purple: 'text-purple-400 bg-purple-950/40 border-purple-500/30',
    emerald: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30'
  };

  return (
    <div className="bg-[#090e1d] border border-slate-800/80 rounded-xl p-5 flex items-center justify-between">
      <div>
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
          {label}
        </span>
        <div className="text-2xl font-black text-white mt-1 tracking-tight">
          {value}
        </div>
        {subtext && (
          <span className="text-xs text-slate-500 mt-0.5 block">
            {subtext}
          </span>
        )}
      </div>
      {Icon && (
        <div className={`p-3 rounded-xl border ${colorMap[color] || colorMap.cyan}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
