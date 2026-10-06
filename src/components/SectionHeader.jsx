import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const SectionHeader = ({ title, subtitle, icon: Icon, viewAllPath, badge }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3 pb-3 border-b border-slate-800/60">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Icon className="w-4 h-4" />
            </div>
          )}
          {badge && (
            <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded bg-purple-950/80 text-purple-300 border border-purple-700/50">
              {badge}
            </span>
          )}
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            {title}
          </h2>
        </div>
        {subtitle && <p className="text-xs text-slate-400 pl-1">{subtitle}</p>}
      </div>

      {viewAllPath && (
        <Link
          to={viewAllPath}
          className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors self-start sm:self-auto group"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
};
