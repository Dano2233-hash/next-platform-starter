import React from 'react';

export default function StatCard({ label, value, icon: Icon, change = null, color = 'cyan' }) {
  const colorMap = {
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  };

  const badgeStyle = colorMap[color] || colorMap.cyan;

  return (
    <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
          {label}
        </p>
        <p className="text-2xl font-black text-white font-mono">{value}</p>
        {change && (
          <p className="text-[11px] text-emerald-400 font-medium mt-1">
            {change}
          </p>
        )}
      </div>
      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${badgeStyle}`}>
        {Icon && <Icon size={24} />}
      </div>
    </div>
  );
}
