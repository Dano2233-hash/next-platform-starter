import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, icon: Icon, viewAllLink, badge }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-3 border-b border-slate-800/80">
      <div>
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-mono uppercase">
            {title}
          </h2>
          {badge && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-blue-600 to-cyan-400 text-black shadow-md">
              {badge}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs text-slate-400 mt-1 font-medium">{subtitle}</p>}
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors shrink-0"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
