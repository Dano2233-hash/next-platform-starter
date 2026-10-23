import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, icon: Icon, linkTo, linkText = 'View All' }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3 pb-3 border-b border-slate-800/80">
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          {Icon && <Icon className="w-5 h-5 text-cyan-400" />}
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h2>
        </div>
        {subtitle && <p className="text-xs text-slate-400 font-medium">{subtitle}</p>}
      </div>

      {linkTo && (
        <Link
          to={linkTo}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group shrink-0"
        >
          <span>{linkText}</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
