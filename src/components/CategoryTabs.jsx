import React from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';

export function CategoryTabs({
  selectedCategory,
  onSelectCategory,
  selectedPlatform,
  onSelectPlatform,
}) {
  return (
    <div className="space-y-4">
      {/* Category Tabs */}
      <div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name || (selectedCategory === 'All' && cat.slug === 'all');
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug === 'all' ? 'All' : cat.name)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Platform Filter Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
        <span className="text-slate-400 font-bold shrink-0 mr-1">Platform:</span>
        {PLATFORMS.map((plat) => {
          const isSelected = selectedPlatform === plat.name || (selectedPlatform === 'All' && plat.slug === 'all');
          return (
            <button
              key={plat.id}
              onClick={() => onSelectPlatform(plat.slug === 'all' ? 'All' : plat.name)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
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

export default CategoryTabs;
