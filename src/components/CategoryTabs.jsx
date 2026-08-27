import React from 'react';
import { CATEGORIES } from '../data/categories';
import {
  LayoutGrid,
  Monitor,
  Gamepad2,
  Tv,
  Smartphone,
  CreditCard,
  Zap,
  MoreHorizontal
} from 'lucide-react';

const iconMap = {
  LayoutGrid: LayoutGrid,
  Monitor: Monitor,
  Gamepad2: Gamepad2,
  Tv: Tv,
  Smartphone: Smartphone,
  CreditCard: CreditCard,
  Zap: Zap,
  MoreHorizontal: MoreHorizontal
};

export default function CategoryTabs({ activeCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
      {CATEGORIES.map((cat) => {
        const IconComponent = iconMap[cat.icon] || LayoutGrid;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-400/50 shadow-md shadow-cyan-500/20'
                : 'bg-[#0b101d] text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white hover:bg-slate-900'
            }`}
          >
            <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
