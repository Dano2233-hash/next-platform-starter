import React from 'react';

export function StatCard({ title, value, icon: Icon, description, trendColor = 'text-brand-cyan' }) {
  return (
    <div className="p-5 rounded-2xl bg-[#0d0d15] border border-brand-border/60 flex items-start justify-between gap-4">
      <div className="space-y-1.5">
        <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</p>
        <p className={`text-xl sm:text-3xl font-black ${trendColor} tracking-tight`}>
          {value}
        </p>
        {description && (
          <p className="text-[10px] text-gray-500 leading-none">{description}</p>
        )}
      </div>

      {Icon && (
        <div className="p-3 rounded-xl bg-brand-blue/10 border border-brand-blue/20 text-brand-cyan flex-shrink-0">
          <Icon className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}

export default StatCard;
