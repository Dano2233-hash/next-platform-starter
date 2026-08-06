import React from 'react';
import { categories } from '../data/categories';

export default function CategoryTabs({ activeCategory, onCategoryChange }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none select-none">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.slug;
        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.slug)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
              isActive
                ? 'bg-gradient-to-r from-[#0066ff] to-[#7000ff] text-white shadow-lg shadow-[#0066ff]/20 scale-105'
                : 'bg-slate-900/40 text-slate-400 border border-slate-800/60 hover:text-white hover:border-slate-700'
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
