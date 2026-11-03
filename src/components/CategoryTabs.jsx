import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Gamepad2, Smartphone, Monitor, Tv, Box, CreditCard, Sparkles } from 'lucide-react';

const ICON_MAP = {
  Gamepad2,
  Smartphone,
  Monitor,
  Tv,
  Box,
  CreditCard,
  Sparkles,
};

export default function CategoryTabs({ selectedCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const Icon = ICON_MAP[cat.icon] || Gamepad2;
        const isActive = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              isActive
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-950/40'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Icon size={15} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
