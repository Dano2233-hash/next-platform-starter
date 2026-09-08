import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const SectionHeader = ({ title, subtitle, viewAllLink, icon: Icon, badgeText }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4 border-b border-slate-800/60 pb-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          {badgeText && (
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-cyan-400 border border-cyan-500/20">
              {badgeText}
            </span>
          )}
          {Icon && <Icon className="w-5 h-5 text-cyan-400" />}
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          {title}
        </h2>
        {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group self-start md:self-auto"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
};
