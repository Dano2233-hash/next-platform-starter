import React from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';

const CategoryTabs = ({ selectedCategory, onSelectCategory, selectedPlatform, onSelectPlatform }) => {
  return (
    <div className="space-y-4">
      {/* Categories Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Platform Pills */}
      {onSelectPlatform && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
          <span className="text-slate-500 mr-1 text-[11px] uppercase tracking-wider font-bold">Platform:</span>
          {PLATFORMS.map((plat) => {
            const isActive = selectedPlatform === plat.id;
            return (
              <button
                key={plat.id}
                onClick={() => onSelectPlatform(plat.id)}
                className={`px-3 py-1 rounded-lg transition-colors border ${
                  isActive
                    ? 'bg-cyan-950/60 text-cyan-400 border-cyan-500/50 font-bold'
                    : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:text-slate-200'
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
