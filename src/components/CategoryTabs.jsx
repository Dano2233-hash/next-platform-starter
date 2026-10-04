import React from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';

export default function CategoryTabs({ activeCategory, setActiveCategory, activePlatform, setActivePlatform }) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-cyan-400/50 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Platforms Filter */}
      {setActivePlatform && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-slate-800/60 pt-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">Platform:</span>
          {PLATFORMS.map((plat) => (
            <button
              key={plat.id}
              onClick={() => setActivePlatform(plat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                activePlatform === plat.id
                  ? 'bg-purple-600/20 text-purple-300 border-purple-500/50'
                  : 'bg-slate-900/40 text-slate-400 border-slate-800/80 hover:text-slate-200'
              }`}
            >
              {plat.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
