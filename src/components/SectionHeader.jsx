import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, linkTo, linkText = 'View All' }) {
  return (
    <div className="flex items-end justify-between mb-6 pb-2 border-b border-slate-800/80">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
          {title}
        </h2>
        {subtitle && <p className="text-xs sm:text-sm text-slate-400 mt-1">{subtitle}</p>}
      </div>
      {linkTo && (
        <Link
          to={linkTo}
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group transition-colors"
        >
          <span>{linkText}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
