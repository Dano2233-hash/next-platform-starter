import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Grid, Smartphone, Gamepad2, CreditCard, Crown } from 'lucide-react';

const iconMap = {
  Grid,
  Smartphone,
  Gamepad2,
  CreditCard,
  Crown,
};

export default function CategoryTabs({ activeCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
      {CATEGORIES.map((cat) => {
        const Icon = iconMap[cat.icon] || Grid;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition-all duration-200 border ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-600/25'
                : 'bg-[#0c101c] text-slate-400 border-slate-800 hover:text-white hover:border-slate-700 hover:bg-slate-800/60'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
