import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Grid, Smartphone, Gamepad2, CreditCard, Sparkles } from 'lucide-react';

const iconMap = {
  Grid,
  Smartphone,
  Gamepad2,
  CreditCard,
  Sparkles
};

export function CategoryTabs({ activeCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
      {CATEGORIES.map((cat) => {
        const IconComponent = iconMap[cat.icon] || Grid;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-400/50 text-white shadow-lg shadow-cyan-950/40'
                : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
