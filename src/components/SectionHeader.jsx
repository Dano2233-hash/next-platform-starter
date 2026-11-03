import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SectionHeader({
  title,
  subtitle,
  badge = null,
  linkTo = null,
  linkText = 'View All',
  icon: Icon = null,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-2 border-b border-slate-800/60">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          {Icon && <Icon size={18} className="text-cyan-400" />}
          {badge && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-wider">
              {badge}
            </span>
          )}
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            {subtitle}
          </p>
        )}
      </div>

      {linkTo && (
        <Link
          to={linkTo}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 group py-1"
        >
          <span>{linkText}</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
