import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle = null, linkTo = null, linkText = 'View All', icon: Icon = null }) {
  return (
    <div className="flex items-end justify-between mb-6 pb-2 border-b border-slate-800/80">
      <div>
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-cyan-400" />}
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            {title}
          </h2>
        </div>
        {subtitle && <p className="text-xs text-slate-400 mt-1 font-medium">{subtitle}</p>}
      </div>

      {linkTo && (
        <Link
          to={linkTo}
          className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition group"
        >
          <span>{linkText}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
