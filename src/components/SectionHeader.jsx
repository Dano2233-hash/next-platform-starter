import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, icon: Icon, viewAllPath, viewAllText = 'View All' }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 mb-6 border-b border-slate-800/80">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            {title}
          </h2>
          {subtitle && <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      {viewAllPath && (
        <Link
          to={viewAllPath}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-cyan-400 hover:text-cyan-300 transition-colors group shrink-0 pt-2 sm:pt-0"
        >
          <span>{viewAllText}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
