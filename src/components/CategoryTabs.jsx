import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Grid, Monitor, Gamepad2, Tv, Smartphone, CreditCard, Zap } from 'lucide-react';

const categoryIconMap = {
  Grid,
  Monitor,
  Gamepad2,
  Tv,
  Smartphone,
  CreditCard,
  Zap
};

export default function CategoryTabs({ activeCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map(cat => {
        const Icon = categoryIconMap[cat.icon] || Grid;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border shrink-0 ${
              isActive
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20 scale-105'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
