import React from 'react';
import { CATEGORIES } from '../data/categories';
import {
  Grid,
  Gamepad2,
  Tv,
  Monitor,
  Smartphone,
  Gift,
  Sparkles,
  Layers
} from 'lucide-react';

const ICON_MAP = {
  Grid,
  Gamepad2,
  Tv,
  Monitor,
  Smartphone,
  Gift,
  Sparkles,
  Layers
};

export function CategoryTabs({ activeCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none py-1">
      {CATEGORIES.map((cat) => {
        const IconComponent = ICON_MAP[cat.icon] || Grid;
        const isActive = activeCategory === cat.slug;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.slug)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap border ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-cyan-400 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}

export default CategoryTabs;
