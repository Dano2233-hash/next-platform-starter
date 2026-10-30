import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, icon: Icon, viewAllLink, viewAllText = 'View All' }) {
  return (
    <div className="flex items-end justify-between mb-6 pb-2 border-b border-slate-800/80">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
            {title}
          </h2>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group shrink-0"
        >
          <span>{viewAllText}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
