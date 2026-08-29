import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SectionHeader({
  title,
  subtitle,
  icon: Icon,
  viewAllLink,
  badgeText,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 border-b border-slate-800/80 pb-4">
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
              {title}
            </h2>
            {badgeText && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                {badgeText}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-slate-400 text-xs md:text-sm mt-0.5 font-medium">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1 text-xs md:text-sm font-bold text-cyan-400 hover:text-cyan-300 group shrink-0 transition-colors"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
