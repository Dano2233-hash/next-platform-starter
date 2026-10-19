import React from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';

export default function CategoryTabs({
  selectedCategory,
  onSelectCategory,
  selectedPlatform,
  onSelectPlatform,
}) {
  return (
    <div className="space-y-4">
      {/* Primary Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-black border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-[#090e1f] text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Secondary Platform Sub-Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider shrink-0 mr-1">
          Platform:
        </span>
        {PLATFORMS.map((plat) => {
          const isActive = selectedPlatform === plat.id;
          return (
            <button
              key={plat.id}
              onClick={() => onSelectPlatform(plat.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800/80 hover:text-slate-200'
              }`}
            >
              {plat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
