import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, icon: Icon, viewAllLink, badge }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 border-b border-slate-800/80 pb-4">
      <div>
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-cyan-400" />}
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
            {title}
          </h2>
          {badge && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              {badge}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs sm:text-sm text-slate-400 mt-1">{subtitle}</p>}
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group self-start sm:self-auto"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
