import React from 'react';

export function StatCard({ title, value, icon: Icon, colorClass = 'text-cyan-400 bg-cyan-950/20 border-cyan-500/10' }) {
  return (
    <div className={`p-6 rounded-lg border bg-[#0a0a14] flex items-center justify-between ${colorClass}`}>
      <div>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
          {title}
        </p>
        <p className="text-2xl font-black text-white">
          {value}
        </p>
      </div>
      {Icon && (
        <div className="p-3 bg-slate-900 rounded-lg">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
