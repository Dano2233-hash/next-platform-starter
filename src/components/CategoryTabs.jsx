import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Grid, Smartphone, Monitor, Gamepad2, Box, CreditCard, Zap } from 'lucide-react';

const ICON_MAP = {
  Grid,
  Smartphone,
  Monitor,
  Gamepad2,
  Box,
  CreditCard,
  Zap
};

export default function CategoryTabs({ activeCategory = 'all', onSelectCategory }) {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center space-x-3 min-w-max">
        {CATEGORIES.map((cat) => {
          const IconComponent = ICON_MAP[cat.icon] || Grid;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 border ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white border-cyan-400/50 shadow-lg shadow-cyan-950/40 scale-105'
                  : 'bg-[#090d1a] text-slate-400 border-slate-800/80 hover:bg-slate-800/80 hover:text-slate-200'
              }`}
            >
              <IconComponent className={`w-4 h-4 ${isActive ? 'text-cyan-200' : 'text-slate-500'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
