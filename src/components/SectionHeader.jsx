import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function SectionHeader({ title, subtitle, viewAllLink, badgeText, icon: Icon }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          {badgeText && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
              {badgeText}
            </span>
          )}
          {Icon && <Icon className="w-4 h-4 text-cyan-400" />}
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

export default SectionHeader;
