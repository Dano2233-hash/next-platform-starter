import React from 'react';
import { Gamepad2, Smartphone, Flame, CreditCard, Sparkles, Box, Tv, Monitor, Layers } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

const ICON_MAP = {
  Gamepad2,
  Smartphone,
  Flame,
  CreditCard,
  Sparkles,
  Box,
  Tv,
  Monitor,
  Layers
};

export function CategoryTabs({ selectedCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
      {CATEGORIES.map((cat) => {
        const IconComponent = ICON_MAP[cat.icon] || Gamepad2;
        const isSelected = selectedCategory === cat.slug;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.slug)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
              isSelected
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-950/50'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-cyan-400'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}

export default CategoryTabs;
