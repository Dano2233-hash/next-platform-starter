import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Grid, Smartphone, Gamepad2, Gift, Zap } from 'lucide-react';

const iconMap = {
  Grid: Grid,
  Smartphone: Smartphone,
  Gamepad2: Gamepad2,
  Gift: Gift,
  Zap: Zap,
};

export default function CategoryTabs({ selectedCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const IconComponent = iconMap[cat.icon] || Grid;
        const isSelected = selectedCategory === cat.name || (selectedCategory === 'all' && cat.id === 'all');

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id === 'all' ? 'all' : cat.name)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all border shrink-0 ${
              isSelected
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-400/50 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900/80 hover:bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <IconComponent className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-cyan-400'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
