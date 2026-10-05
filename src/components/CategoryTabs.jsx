import React from 'react';
import { CATEGORIES } from '../data/categories';
import {
  Grid,
  Smartphone,
  Monitor,
  Gamepad2,
  Tv2,
  CreditCard,
  Sparkles,
  Layers
} from 'lucide-react';

const iconMap = {
  Grid,
  Smartphone,
  Monitor,
  Gamepad2,
  Tv2,
  CreditCard,
  Sparkles,
  Layers
};

const CategoryTabs = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar">
      {CATEGORIES.map((cat) => {
        const IconComponent = iconMap[cat.icon] || Grid;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 scale-105'
                : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-cyan-300 hover:border-slate-700'
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

export default CategoryTabs;
