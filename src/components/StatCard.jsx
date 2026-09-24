import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'cyan' }) {
  const colorMap = {
    cyan: 'from-cyan-500/20 to-cyan-600/5 text-cyan-400 border-cyan-500/30',
    blue: 'from-blue-500/20 to-blue-600/5 text-blue-400 border-blue-500/30',
    purple: 'from-purple-500/20 to-purple-600/5 text-purple-400 border-purple-500/30',
    green: 'from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/30',
  };

  const style = colorMap[color] || colorMap.cyan;

  return (
    <div className="bg-[#0c1021] border border-[#1a223e] rounded-2xl p-5 flex items-center justify-between">
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
          {title}
        </span>
        <h3 className="text-2xl font-black text-white">{value}</h3>
        {subtitle && (
          <p className="text-[11px] text-slate-400 mt-1 font-medium">{subtitle}</p>
        )}
      </div>

      {Icon && (
        <div className={`p-3.5 rounded-xl bg-gradient-to-br border ${style}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
