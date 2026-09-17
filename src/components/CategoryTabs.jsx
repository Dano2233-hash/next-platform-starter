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
  Zap
};

export default function CategoryTabs({ selectedCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const IconComponent = iconMap[cat.icon] || Grid;
        const isActive = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all duration-200 border ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-black border-cyan-400 shadow-md shadow-cyan-500/20 scale-105'
                : 'bg-[#0a0f1d] hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800'
            }`}
          >
            <IconComponent className={`w-4 h-4 ${isActive ? 'text-black' : 'text-cyan-400'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
