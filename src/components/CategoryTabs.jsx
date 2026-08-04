import React from 'react';
import { categories } from '../data/categories';

export default function CategoryTabs({ selectedCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none no-scrollbar">
      {categories.map((category) => {
        const isActive = selectedCategory === category.id;
        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 border cursor-pointer select-none ${
              isActive
                ? 'bg-[#0066ff] text-white border-[#0066ff] shadow-lg shadow-[#0066ff]/20'
                : 'bg-[#0c0d12]/80 text-gray-400 border-[#1a1e29] hover:text-white hover:border-gray-700'
            }`}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
}
