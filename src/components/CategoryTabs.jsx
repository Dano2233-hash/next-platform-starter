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
      {/* Categories Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
                active
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-cyan-400/50 shadow-md shadow-cyan-950/50'
                  : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Platform Sub-filter Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-semibold text-slate-400 mr-1 shrink-0">Platform:</span>
        {PLATFORMS.map((plat) => {
          const active = selectedPlatform === plat.id;
          return (
            <button
              key={plat.id}
              onClick={() => onSelectPlatform(plat.id)}
              className={`px-3 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all border ${
                active
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500/80'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
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
