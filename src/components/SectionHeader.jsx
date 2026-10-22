import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Sparkles, Zap, Award, Clock } from 'lucide-react';

export const SectionHeader = ({
  title,
  subtitle,
  badgeText,
  iconType,
  viewAllLink,
  viewAllText = 'View All'
}) => {
  const renderIcon = () => {
    switch (iconType) {
      case 'flame':
        return <Flame className="w-5 h-5 text-amber-400" />;
      case 'flash':
        return <Zap className="w-5 h-5 text-cyan-400" />;
      case 'sparkle':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'award':
        return <Award className="w-5 h-5 text-blue-400" />;
      case 'clock':
        return <Clock className="w-5 h-5 text-fuchsia-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-3 border-b border-slate-800/80">
      <div>
        {badgeText && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1.5">
            {renderIcon()}
            <span>{badgeText}</span>
          </span>
        )}
        <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-medium">
            {subtitle}
          </p>
        )}
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-cyan-400 hover:text-cyan-300 transition-colors group self-start sm:self-auto"
        >
          <span>{viewAllText}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
};
