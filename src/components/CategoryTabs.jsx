import React from 'react';
import { CATEGORIES } from '../data/categories';

export default function CategoryTabs({ activeCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.name || (activeCategory === 'all' && cat.id === 'all');
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.name === 'All Products' ? 'all' : cat.name)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-950/40'
                : 'bg-[#0d1322] text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800'
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
