import React from 'react';
import { Sparkles, Gamepad2, Smartphone, CreditCard, Tv } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

const iconMap = {
  Sparkles,
  Gamepad2,
  Smartphone,
  CreditCard,
  Tv
};

export default function CategoryTabs({ selectedCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const IconComponent = iconMap[cat.icon] || Sparkles;
        const isSelected = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
              isSelected
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/25'
                : 'bg-slate-900/80 text-slate-300 border-white/5 hover:border-white/20 hover:text-white hover:bg-slate-800'
            }`}
          >
            <IconComponent className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-cyan-400'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
