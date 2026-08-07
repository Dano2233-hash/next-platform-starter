import React from 'react';
import { categories } from '../data/categories';

export function CategoryTabs({ activeCategory = 'all', onSelect }) {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-3 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-black border-transparent shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-900'
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
