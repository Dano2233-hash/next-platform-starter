import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Sparkles, Gamepad2, Smartphone, CreditCard, Zap } from 'lucide-react';

const iconMap = {
  Sparkles,
  Gamepad2,
  Smartphone,
  CreditCard,
  Zap
};

export default function CategoryTabs({ activeCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((category) => {
        const IconComponent = iconMap[category.icon] || Sparkles;
        const isActive = activeCategory === category.id;

        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-500/25 scale-[1.02]'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
            {category.name}
          </button>
        );
      })}
    </div>
  );
}
