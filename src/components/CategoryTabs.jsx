import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Grid, Smartphone, Monitor, Gamepad2, Box, CreditCard, Zap } from 'lucide-react';

const iconMap = {
  Grid,
  Smartphone,
  Monitor,
  Gamepad2,
  Box,
  CreditCard,
  Zap,
};

export const CategoryTabs = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
      {CATEGORIES.map((cat) => {
        const IconComponent = iconMap[cat.icon] || Grid;
        const isSelected = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs whitespace-nowrap transition-all duration-200 border ${
              isSelected
                ? 'bg-gradient-to-r from-blue-600/90 to-cyan-500/90 text-white border-cyan-400/50 shadow-lg shadow-cyan-950/40'
                : 'bg-[#090d1a] text-slate-400 hover:text-slate-100 border-slate-800 hover:border-slate-700'
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
