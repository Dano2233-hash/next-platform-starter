import React from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';

export const CategoryTabs = ({
  activeCategory = 'all',
  activePlatform = 'all',
  onSelectCategory,
  onSelectPlatform,
}) => {
  return (
    <div className="space-y-4 my-6">
      {/* Category Tabs */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Categories
        </h4>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25'
                    : 'bg-[#090e21] hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Platform Filter Tabs */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Platform Filter
        </h4>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PLATFORMS.map((plat) => {
            const isActive = activePlatform === plat.id;
            return (
              <button
                key={plat.id}
                onClick={() => onSelectPlatform && onSelectPlatform(plat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-[#070b19] hover:bg-slate-800 text-slate-400 border border-slate-800'
                }`}
              >
                {plat.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
