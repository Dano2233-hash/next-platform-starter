import React from 'react';
import { categories, platforms, productTypes } from '../data/categories.js';

export default function CategoryTabs({
  selectedCategory,
  onSelectCategory,
  selectedPlatform,
  onSelectPlatform,
  selectedType,
  onSelectType
}) {
  return (
    <div className="space-y-4 mb-8">
      {/* Category Horizontal Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-2 border ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 border-cyan-400 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
            }`}
          >
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Sub-filters for Platform and Type */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
        {/* Platform filter */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Platform:</span>
          {platforms.map((plat) => (
            <button
              key={plat.id}
              onClick={() => onSelectPlatform(plat.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedPlatform === plat.id
                  ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {plat.name}
            </button>
          ))}
        </div>

        {/* Type filter */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Type:</span>
          {productTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => onSelectType(type.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedType === type.id
                  ? 'bg-purple-500/20 border border-purple-500/50 text-purple-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
