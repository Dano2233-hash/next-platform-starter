import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Grid, Gamepad2, Gamepad, Monitor, Smartphone, CreditCard, Sparkles, Layers } from 'lucide-react';

const iconMap = {
  Grid: Grid,
  Gamepad2: Gamepad2,
  Gamepad: Gamepad,
  Monitor: Monitor,
  Smartphone: Smartphone,
  CreditCard: CreditCard,
  Sparkles: Sparkles,
  Layers: Layers
};

export const CategoryTabs = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none py-2">
      {CATEGORIES.map((cat) => {
        const Icon = iconMap[cat.icon] || Grid;
        const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase();

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition duration-200 cursor-pointer ${
              isSelected
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-[#0a0f1d] hover:bg-slate-800 text-slate-300 border border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <Icon className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-cyan-400'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;
