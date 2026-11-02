import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SectionHeader({
  title,
  subtitle,
  badge,
  badgeColor = 'from-blue-600 to-cyan-500',
  viewAllLink,
  viewAllText = 'View All'
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
      <div>
        {badge && (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r ${badgeColor} text-black font-extrabold text-[11px] uppercase tracking-wider mb-2 shadow-sm`}>
            {badge}
          </span>
        )}
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors group self-start sm:self-auto"
        >
          <span>{viewAllText}</span>
          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
