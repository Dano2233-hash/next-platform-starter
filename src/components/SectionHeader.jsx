import React from 'react';

export default function SectionHeader({ title, subtitle, icon: Icon, actionText, onActionClick }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-slate-800/80 gap-3">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-cyan-500/30 text-cyan-400 shrink-0">
            <Icon className="w-6 h-6" />
          </div>
        )}
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      {actionText && (
        <button
          onClick={onActionClick}
          className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group self-start sm:self-auto transition-colors"
        >
          {actionText}
          <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
        </button>
      )}
    </div>
  );
}
