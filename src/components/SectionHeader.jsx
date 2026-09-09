import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SectionHeader = ({ title, subtitle, icon: Icon, linkTo, linkText = 'View All' }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-slate-800/80 gap-2">
      <div className="flex items-center gap-3">
        {Icon ? (
          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400">
            <Icon className="w-5 h-5" />
          </div>
        ) : (
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Sparkles className="w-5 h-5" />
          </div>
        )}
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            {title}
          </h2>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      {linkTo && (
        <Link
          to={linkTo}
          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group transition-colors self-start sm:self-auto"
        >
          <span>{linkText}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
};
