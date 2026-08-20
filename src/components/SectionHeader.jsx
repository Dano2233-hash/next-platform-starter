import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SectionHeader({
  title,
  subtitle = null,
  icon: Icon = null,
  viewAllLink = null,
  accentColor = 'cyan'
}) {
  const getAccentBorder = () => {
    switch (accentColor) {
      case 'purple':
        return 'border-purple-500 text-purple-400';
      case 'blue':
        return 'border-blue-500 text-blue-400';
      case 'amber':
        return 'border-amber-500 text-amber-400';
      default:
        return 'border-cyan-400 text-cyan-400';
    }
  };

  const styleClass = getAccentBorder();

  return (
    <div className="flex items-end justify-between mb-6 pb-2 border-b border-slate-800/80">
      <div>
        <div className="flex items-center gap-2">
          {Icon && <Icon className={`w-5 h-5 ${styleClass.split(' ')[1]}`} />}
          <h2 className="text-lg md:text-2xl font-black text-slate-100 uppercase tracking-wide">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-xs text-slate-400 mt-1 font-medium">
            {subtitle}
          </p>
        )}
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 hover:underline transition-all whitespace-nowrap"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
