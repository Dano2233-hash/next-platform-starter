import React from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';

export const CategoryTabs = ({
  selectedCategory,
  onSelectCategory,
  selectedPlatform,
  onSelectPlatform
}) => {
  return (
    <div className="space-y-4 mb-6">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive =
            selectedCategory === cat.name ||
            (cat.id === 'all' && (!selectedCategory || selectedCategory === 'All'));
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id === 'all' ? 'All' : cat.name)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap border ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-cyan-400/50 shadow-md shadow-cyan-950/50'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Platform Filter Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-semibold text-slate-400 mr-1">Platform:</span>
        {PLATFORMS.map((plat) => {
          const isActive =
            selectedPlatform === plat.name ||
            (plat.id === 'all' && (!selectedPlatform || selectedPlatform === 'All'));
          return (
            <button
              key={plat.id}
              onClick={() => onSelectPlatform(plat.id === 'all' ? 'All' : plat.name)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap border ${
                isActive
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500/60'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {plat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
