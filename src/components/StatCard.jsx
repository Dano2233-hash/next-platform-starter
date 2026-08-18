import React from 'react';

export function StatCard({ title, value, subtext, icon: Icon, color = "cyan" }) {
  const colorStyles = {
    cyan: "bg-cyan-950/50 text-cyan-400 border-cyan-500/30",
    blue: "bg-blue-950/50 text-blue-400 border-blue-500/30",
    purple: "bg-purple-950/50 text-purple-400 border-purple-500/30",
    emerald: "bg-emerald-950/50 text-emerald-400 border-emerald-500/30",
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex items-start justify-between shadow-lg">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
          {title}
        </p>
        <h3 className="text-2xl font-black text-white">{value}</h3>
        {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
      </div>

      <div className={`p-3 rounded-xl border ${colorStyles[color] || colorStyles.cyan}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
