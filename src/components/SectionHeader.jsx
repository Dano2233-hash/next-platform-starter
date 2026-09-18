import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function SectionHeader({ title, subtitle, icon: Icon, viewAllLink, viewAllText = 'View All' }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-slate-800/80 gap-2">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Icon class="w-5 h-5" />
          </div>
        )}
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 hover:underline transition-all shrink-0 mt-1 sm:mt-0"
        >
          <span>{viewAllText}</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}
