import React from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';

export const CategoryTabs = ({
  selectedCategory = 'all',
  onSelectCategory,
  selectedPlatform = 'all',
  onSelectPlatform
}) => {
  return (
    <div className="flex flex-col gap-4 my-6">
      {/* Categories Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory && onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 border ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Platform Chips */}
      {onSelectPlatform && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-medium mr-1 uppercase text-[10px] tracking-wider">Platform:</span>
          {PLATFORMS.map((plat) => {
            const isActive = selectedPlatform === plat.id;
            return (
              <button
                key={plat.id}
                onClick={() => onSelectPlatform(plat.id)}
                className={`px-3 py-1 rounded-lg font-medium transition-all duration-200 border ${
                  isActive
                    ? 'bg-slate-800 border-cyan-400/80 text-cyan-300'
                    : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                {plat.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
