import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'cyan' }) {
  const colorStyles = {
    cyan: 'from-cyan-950/40 via-[#090d1a] to-[#05070f] border-cyan-500/30 text-cyan-400',
    purple: 'from-purple-950/40 via-[#090d1a] to-[#05070f] border-purple-500/30 text-purple-400',
    emerald: 'from-emerald-950/40 via-[#090d1a] to-[#05070f] border-emerald-500/30 text-emerald-400',
    amber: 'from-amber-950/40 via-[#090d1a] to-[#05070f] border-amber-500/30 text-amber-400'
  };

  const selectedStyle = colorStyles[color] || colorStyles.cyan;

  return (
    <div className={`bg-gradient-to-br ${selectedStyle} border rounded-2xl p-5 shadow-xl flex items-center justify-between`}>
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
          {title}
        </span>
        <span className="text-2xl font-black text-slate-100 tracking-tight">
          {value}
        </span>
      </div>

      <div className={`w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center ${selectedStyle.split(' ').pop()}`}>
        {Icon && <Icon className="w-6 h-6" />}
      </div>
    </div>
  );
}
