import React from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories.js';

export const CategoryTabs = ({
  activeCategory,
  onSelectCategory,
  activePlatform,
  onSelectPlatform
}) => {
  return (
    <div className="space-y-4 mb-8">
      {/* Category Tabs */}
      <div>
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
          Category Filter
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive =
              activeCategory?.toLowerCase() === cat.name.toLowerCase() ||
              (cat.id === 'all' && (!activeCategory || activeCategory === 'all'));

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id === 'all' ? 'all' : cat.name)}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-gray-950 shadow-md shadow-cyan-500/20'
                    : 'bg-[#090e1f] text-gray-300 border border-gray-800 hover:border-gray-700 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Platform Filter Pills */}
      {onSelectPlatform && (
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
            Platform Filter
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {PLATFORMS.map((plat) => {
              const isActive =
                activePlatform?.toLowerCase() === plat.name.toLowerCase() ||
                (plat.id === 'all' && (!activePlatform || activePlatform === 'all'));

              return (
                <button
                  key={plat.id}
                  onClick={() => onSelectPlatform(plat.id === 'all' ? 'all' : plat.name)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                    isActive
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-500'
                      : 'bg-gray-900/80 text-gray-400 border border-gray-800 hover:text-gray-200'
                  }`}
                >
                  {plat.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryTabs;
