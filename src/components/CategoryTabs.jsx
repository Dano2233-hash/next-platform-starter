import React from 'react';

export function CategoryTabs({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="flex w-full items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
            activeCategory === cat.id
              ? 'bg-[#0066ff] text-white shadow-md shadow-[#0066ff]/20'
              : 'border border-[#12121e] bg-[#0c0c14] text-gray-400 hover:border-gray-700 hover:text-white'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
