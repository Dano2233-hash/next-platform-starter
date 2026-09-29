import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, badge, viewAllLink, icon: Icon }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 border-b border-slate-800/60 pb-4">
      <div>
        {badge && (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 mb-1.5">
            {badge}
          </span>
        )}
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            {title}
          </h2>
        </div>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group self-start sm:self-auto"
        >
          View All
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
