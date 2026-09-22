import React from 'react';

export default function StatCard({ title, value, icon, badgeText }) {
  return (
    <div className="bg-[#090e1a] border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-lg">
      <div className="space-y-1">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        <h3 className="text-2xl font-black text-white tracking-tight">{value}</h3>
        {badgeText && (
          <span className="inline-block text-[10px] font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded">
            {badgeText}
          </span>
        )}
      </div>

      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
        {icon}
      </div>
    </div>
  );
}
