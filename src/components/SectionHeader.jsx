import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, icon: Icon, linkTo, linkText = 'View All' }) {
  return (
    <div className="flex items-end justify-between mb-6 pb-2 border-b border-slate-800/80">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900/60 via-cyan-900/40 to-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-md">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {linkTo && (
        <Link
          to={linkTo}
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-all hover:translate-x-0.5"
        >
          <span>{linkText}</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
