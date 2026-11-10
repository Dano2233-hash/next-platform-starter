import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SectionHeader({
  title,
  subtitle,
  badge,
  badgeColor = 'cyan',
  actionText = 'View All',
  actionLink
}) {
  const badgeClasses = {
    cyan: 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60',
    rose: 'bg-rose-950/80 text-rose-300 border-rose-800/60',
    amber: 'bg-amber-950/80 text-amber-300 border-amber-800/60',
    purple: 'bg-purple-950/80 text-purple-300 border-purple-800/60',
    blue: 'bg-blue-950/80 text-blue-300 border-blue-800/60'
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          {badge && (
            <span
              className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                badgeClasses[badgeColor] || badgeClasses.cyan
              }`}
            >
              {badge}
            </span>
          )}
          {subtitle && <span className="text-xs text-slate-400 font-medium">{subtitle}</span>}
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
          {title}
        </h2>
      </div>

      {actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition group self-start sm:self-auto"
        >
          <span>{actionText}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
