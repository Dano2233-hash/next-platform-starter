import React from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';

export default function CategoryTabs({
  activeCategory,
  onSelectCategory,
  activePlatform,
  onSelectPlatform,
}) {
  return (
    <div className="space-y-4 my-6">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Platform Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        <span className="text-slate-400 font-semibold text-xs shrink-0 mr-1">Platform:</span>
        {PLATFORMS.map((plat) => {
          const isSelected = activePlatform === plat.id;
          return (
            <button
              key={plat.id}
              onClick={() => onSelectPlatform(plat.id)}
              className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                  : 'bg-slate-900/40 text-slate-400 hover:text-slate-200 border border-transparent'
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
