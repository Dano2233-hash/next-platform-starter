import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const SectionHeader = ({ title, subtitle, icon: Icon, viewAllLink, badge }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-slate-800/80 gap-3">
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600/20 via-cyan-500/20 to-purple-600/20 border border-cyan-500/30 text-cyan-400 mt-0.5">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white tracking-wide">{title}</h2>
            {badge && (
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800/60 animate-pulse">
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group transition-colors self-start sm:self-auto"
        >
          View All
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
};
