import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const SectionHeader = ({
  title,
  subtitle,
  icon: Icon,
  viewAllLink,
  viewAllText = 'View All'
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 border-b border-slate-800/60 pb-3">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="p-2.5 rounded-xl bg-cyan-950/50 border border-cyan-500/30 text-cyan-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-heading tracking-tight flex items-center gap-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors group self-start sm:self-auto"
        >
          <span>{viewAllText}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
};
