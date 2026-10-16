import React from 'react';
import { categories } from '../data/categories.js';
import { Grid, Smartphone, Gamepad2, Gift, Zap } from 'lucide-react';

const iconMap = {
  Grid,
  Smartphone,
  Gamepad2,
  Gift,
  Zap
};

export const CategoryTabs = ({ selectedCategory = 'all', onSelectCategory }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar my-6">
      {categories.map((cat) => {
        const IconComponent = iconMap[cat.icon] || Grid;
        const isActive = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-950/40 border border-cyan-400'
                : 'bg-slate-900/90 text-slate-300 hover:text-slate-100 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <IconComponent className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};
