import React from 'react';
import { categories, platforms, productTypes } from '../data/categories';

export const CategoryTabs = ({
  selectedCategory,
  onSelectCategory,
  selectedPlatform,
  onSelectPlatform,
  selectedType,
  onSelectType
}) => {
  return (
    <div className="space-y-4 mb-8 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
      {/* Category Horizontal Pills */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Category Filter
        </label>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/50'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
                selectedCategory === cat.name
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Platform Pills */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Platform Filter
        </label>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {platforms.map((plat) => (
            <button
              key={plat.id}
              onClick={() => onSelectPlatform(plat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedPlatform === plat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                  : 'bg-slate-950/60 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              {plat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product Type Pills if handler provided */}
      {onSelectType && (
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Item Type
          </label>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {productTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => onSelectType(type.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedType === type.id
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                    : 'bg-slate-950/60 hover:bg-slate-800 text-slate-400 border border-slate-800'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
