import React from 'react';
import { Sparkles, Gamepad2, Smartphone, CreditCard, Calendar, Monitor, Box, Tv } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

const ICON_MAP = {
  Sparkles,
  Gamepad2,
  Smartphone,
  CreditCard,
  Calendar,
  Monitor,
  Box,
  Tv
};

export function CategoryTabs({ activeCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
      {CATEGORIES.map((cat) => {
        const IconComponent = ICON_MAP[cat.icon] || Sparkles;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              isActive
                ? 'bg-gradient-to-r from-blue-600/30 to-cyan-500/30 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-950/40'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}

export default CategoryTabs;
