import React from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';

export default function CategoryTabs({ selectedCategory, onSelectCategory, selectedPlatform, onSelectPlatform }) {
  return (
    <div className="space-y-4 my-6">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Platform Filter Buttons */}
      {onSelectPlatform && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] mr-1">Platform:</span>
          {PLATFORMS.map((plat) => {
            const isActive = selectedPlatform === plat.id;
            return (
              <button
                key={plat.id}
                onClick={() => onSelectPlatform(plat.id)}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  isActive
                    ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50 font-bold'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
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
