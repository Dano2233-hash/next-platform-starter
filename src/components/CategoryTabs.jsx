import React from 'react';
import { categories } from '../data/categories';

export default function CategoryTabs({ activeCategory, onCategoryChange }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300 border ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-lg shadow-cyan-950/40'
                : 'bg-[#0a0f1d]/60 text-gray-400 border-white/5 hover:text-white hover:bg-[#0a0f1d] hover:border-blue-500/20'
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
