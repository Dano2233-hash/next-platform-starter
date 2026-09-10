import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Grid, Smartphone, Gamepad2, Gift, Sparkles } from 'lucide-react';

const iconMap = {
  Grid,
  Smartphone,
  Gamepad2,
  Gift,
  Sparkles
};

export default function CategoryTabs({ selectedCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const Icon = iconMap[cat.icon] || Grid;
        const isActive = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all duration-200 ${
              isActive
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-950/50 border border-cyan-400/50 scale-105'
                : 'bg-slate-900/90 text-slate-400 hover:text-slate-100 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
