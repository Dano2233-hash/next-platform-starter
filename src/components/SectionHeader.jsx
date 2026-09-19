import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const SectionHeader = ({
  title,
  subtitle,
  badge,
  viewAllLink,
  viewAllText = 'View All'
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div className="space-y-1">
        {badge && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 rounded-md">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            {badge}
          </span>
        )}
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-100">
          {title}
        </h2>
        {subtitle && <p className="text-xs text-slate-400 max-w-xl">{subtitle}</p>}
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group self-start sm:self-auto"
        >
          <span>{viewAllText}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
};
