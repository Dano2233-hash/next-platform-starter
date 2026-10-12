import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SectionHeader({ title, subtitle, icon: Icon, viewAllLink, tag }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
      <div>
        <div className="flex items-center gap-2 mb-1">
          {Icon && <Icon className="w-5 h-5 text-cyan-400" />}
          {tag && (
            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
              {tag}
            </span>
          )}
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-slate-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group shrink-0"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
