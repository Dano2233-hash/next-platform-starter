import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Smartphone, Gamepad2, CreditCard, Sparkles, Grid } from 'lucide-react';

const ICON_MAP = {
  Grid: Grid,
  Smartphone: Smartphone,
  Gamepad2: Gamepad2,
  CreditCard: CreditCard,
  Sparkles: Sparkles
};

export default function CategoryTabs({ activeCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const IconComponent = ICON_MAP[cat.icon] || Grid;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-400/50 shadow-md shadow-blue-600/30'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800'
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
