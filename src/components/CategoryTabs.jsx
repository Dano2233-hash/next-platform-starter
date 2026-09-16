import React from 'react';
import { CATEGORIES } from '../data/categories';

export default function CategoryTabs({ selectedCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
      {CATEGORIES.map((cat) => {
        const active = selectedCategory === cat.name || (selectedCategory === 'all' && cat.id === 'all');
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id === 'all' ? 'all' : cat.name)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              active
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-cyan-400 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
