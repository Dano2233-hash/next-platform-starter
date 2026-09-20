import React from 'react';
import { categories, platforms } from '../data/categories';

export const CategoryTabs = ({
  selectedCategory = 'all',
  onSelectCategory,
  selectedPlatform = 'all',
  onSelectPlatform
}) => {
  return (
    <div className="flex flex-col gap-4 my-6">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-2 border ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-950/50'
                  : 'bg-[#0b1021] hover:bg-[#111832] text-slate-300 border-slate-800'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Platform Sub-Filters */}
      {onSelectPlatform && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
            Platform:
          </span>
          {platforms.map((plat) => {
            const isActive = selectedPlatform === plat.id;
            return (
              <button
                key={plat.id}
                onClick={() => onSelectPlatform(plat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                    : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 border border-slate-800'
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

export default CategoryTabs;
