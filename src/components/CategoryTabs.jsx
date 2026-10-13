import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Grid, Smartphone, Monitor, Gamepad2, Tv, CreditCard, Zap } from 'lucide-react';

const iconMap = {
  Grid,
  Smartphone,
  Monitor,
  Gamepad2,
  Tv,
  CreditCard,
  Zap
};

export default function CategoryTabs({ selectedCategory = 'all', onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const IconComponent = iconMap[cat.icon] || Grid;
        const isActive = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
              isActive
                ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border-cyan-500 text-cyan-300 shadow-lg shadow-cyan-950/50'
                : 'bg-[#090e1f] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <IconComponent className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
