import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SectionHeader({
  badge,
  title,
  subtitle,
  viewAllLink,
  viewAllText = 'View All',
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
      <div>
        {badge && (
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-950/70 border border-cyan-800/60 px-2.5 py-0.5 rounded-md mb-2">
            {badge}
          </span>
        )}
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">{subtitle}</p>
        )}
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap self-start sm:self-auto group"
        >
          {viewAllText}
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}
    </div>
  );
}
