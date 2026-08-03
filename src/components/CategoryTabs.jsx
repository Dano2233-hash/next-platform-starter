import React from 'react';

export default function CategoryTabs({ categories, activeCategory, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 pt-1 border-b border-[#111122]/30 select-none no-scrollbar">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.slug;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.slug)}
            className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap tracking-wide transition-premium cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-[#0066ff] to-[#7000ff] text-white shadow-lg shadow-[#0066ff]/20'
                : 'bg-[#090911] border border-[#121225] text-gray-400 hover:text-white hover:border-gray-700'
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
