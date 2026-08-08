import React from 'react';

export default function CategoryTabs({ categories, activeCategory, onSelectCategory }) {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-3 scrollbar-none">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
              isActive
                ? 'bg-[#0066ff] text-white border-[#0066ff] shadow-[0_0_15px_rgba(0,102,255,0.4)]'
                : 'bg-white/5 text-white/60 border-white/5 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
