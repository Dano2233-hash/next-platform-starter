import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SectionHeader({
  title,
  subtitle,
  icon: Icon,
  viewAllLink,
  badgeText
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 border-b border-slate-800/80 pb-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-cyan-400" />}
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
            {title}
          </h2>
          {badgeText && (
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
              {badgeText}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
        )}
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors self-start sm:self-auto"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
