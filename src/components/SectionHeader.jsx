import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, icon: Icon, viewAllLink }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 border-b border-slate-800/80 pb-3">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 text-cyan-400 border border-cyan-500/30 shrink-0">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-0.5 font-medium">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group shrink-0"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
