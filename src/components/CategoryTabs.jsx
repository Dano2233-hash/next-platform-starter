import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Grid, Smartphone, Monitor, Gamepad2, Tv, CreditCard, Sparkles } from 'lucide-react';

const ICON_MAP = {
  Grid,
  Smartphone,
  Monitor,
  Gamepad2,
  Tv,
  CreditCard,
  Sparkles
};

export const CategoryTabs = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
      {CATEGORIES.map((cat) => {
        const IconComponent = ICON_MAP[cat.icon] || Grid;
        const isSelected = selectedCategory === cat.name || (selectedCategory === 'All' && cat.id === 'all');

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.name === 'All Products' ? 'All' : cat.name)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all duration-200 shrink-0 border ${
              isSelected
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-950 scale-[1.02]'
                : 'bg-[#090d1a] hover:bg-slate-800/80 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <IconComponent className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-cyan-400'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};
