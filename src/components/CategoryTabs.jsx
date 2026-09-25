import React from 'react';
import { categories } from '../data/categories';

export default function CategoryTabs({ selectedCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 border ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-400/50 shadow-md shadow-cyan-950/40'
                : 'bg-[#090d1a] text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
