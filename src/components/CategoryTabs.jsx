import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Grid, Smartphone, Gamepad2, CreditCard, Sparkles } from 'lucide-react';

const iconMap = {
  Grid: Grid,
  Smartphone: Smartphone,
  Gamepad2: Gamepad2,
  CreditCard: CreditCard,
  Sparkles: Sparkles
};

export default function CategoryTabs({ activeCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none scroll-smooth">
      {CATEGORIES.map((cat) => {
        const IconComponent = iconMap[cat.icon] || Grid;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all whitespace-nowrap border cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white border-cyan-400/50 shadow-lg shadow-cyan-500/20 scale-102'
                : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700 hover:bg-slate-800'
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
