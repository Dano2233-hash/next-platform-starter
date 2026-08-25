import React from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';

export default function CategoryTabs({ selectedCategory, onSelectCategory, selectedPlatform, onSelectPlatform }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 border ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Platform Sub-Filters if provided */}
      {onSelectPlatform && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-medium mr-1 text-xs">Platform:</span>
          {PLATFORMS.map((plat) => {
            const isActive = selectedPlatform === plat.id;
            return (
              <button
                key={plat.id}
                onClick={() => onSelectPlatform(plat.id)}
                className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                    : 'bg-slate-950/60 hover:bg-slate-900 text-slate-400 border-slate-800'
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
}
