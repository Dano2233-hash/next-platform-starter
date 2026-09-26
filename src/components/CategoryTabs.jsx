import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Gamepad2, Tv, Monitor, Smartphone, Gift, Sparkles, Layers, Grid } from 'lucide-react';

const iconMap = {
  Grid,
  Gamepad2,
  Tv,
  Monitor,
  Smartphone,
  Gift,
  Sparkles,
  Layers,
};

export const CategoryTabs = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const IconComponent = iconMap[cat.icon] || Grid;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-950/50 scale-105 border border-cyan-400/40'
                : 'bg-[#0a0f20] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-800/60'
            }`}
          >
            <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;
