import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, viewAllLink, icon: Icon, badgeText }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="p-1.5 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
              <Icon className="w-4 h-4" />
            </div>
          )}
          {badgeText && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800">
              {badgeText}
            </span>
          )}
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
            {title}
          </h2>
        </div>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group shrink-0"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
