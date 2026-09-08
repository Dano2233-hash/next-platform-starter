import React from 'react';
import { categories } from '../data/categories';
import { Grid, Gamepad2, Gamepad, Monitor, Smartphone, CreditCard, Zap, MoreHorizontal } from 'lucide-react';

const iconMap = {
  Grid,
  Gamepad2,
  Gamepad,
  Monitor,
  Smartphone,
  CreditCard,
  Zap,
  MoreHorizontal
};

export const CategoryTabs = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar">
      {categories.map((cat) => {
        const IconComponent = iconMap[cat.icon] || Grid;
        const isActive = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-950/40 border border-cyan-400/30 ring-2 ring-cyan-500/20'
                : 'bg-[#0a0f1c] text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 border border-slate-800/80'
            }`}
          >
            <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};
