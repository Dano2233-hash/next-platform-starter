import React from 'react';

export function SectionHeader({ title, subtitle, badge, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-slate-800/80 gap-4">
      <div>
        {badge && (
          <span className="inline-block px-2.5 py-0.5 mb-1.5 text-xs font-bold tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 rounded-full uppercase">
            {badge}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
        )}
      </div>
      {action && (
        <div className="shrink-0">{action}</div>
      )}
    </div>
  );
}
