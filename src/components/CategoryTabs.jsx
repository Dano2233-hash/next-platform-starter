import React from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';

export const CategoryTabs = ({
  activeCategory,
  onSelectCategory,
  activePlatform,
  onSelectPlatform
}) => {
  return (
    <div className="space-y-4">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-[#0c101a] text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Platform Pills */}
      {onSelectPlatform && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-t border-slate-800/60 pt-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2 whitespace-nowrap">
            Platform:
          </span>
          {PLATFORMS.map((plat) => {
            const isSelected = activePlatform === plat.id;
            return (
              <button
                key={plat.id}
                onClick={() => onSelectPlatform(plat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/80'
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
