import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Sparkles, TrendingUp, Award, Zap } from 'lucide-react';

export default function SectionHeader({ title, subtitle, icon: Icon, viewAllPath, badge }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-2 border-b border-slate-800/60">
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight font-sans">
            {title}
          </h2>
          {badge && (
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-black text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              {badge}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs md:text-sm text-slate-400 font-medium">{subtitle}</p>}
      </div>

      {viewAllPath && (
        <Link
          to={viewAllPath}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group self-start md:self-auto"
        >
          <span>View All Products</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
