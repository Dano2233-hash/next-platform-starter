import React from 'react';
import { CATEGORIES } from '../data/categories';

export default function CategoryTabs({ selectedCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none select-none">
      {CATEGORIES.map((cat) => {
        const isActive = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`whitespace-nowrap px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
              isActive
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-lg shadow-blue-500/25 scale-105'
                : 'bg-[#0d0d1a] border-white/5 text-gray-400 hover:text-white hover:border-white/10'
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
