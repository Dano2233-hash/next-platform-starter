import React from 'react';
import { CATEGORIES } from '../data/categories';
import {
  Smartphone,
  Monitor,
  Gamepad2,
  Tv,
  CreditCard,
  Zap,
  Grid,
} from 'lucide-react';

const categoryIcons = {
  mobile: Smartphone,
  pc: Monitor,
  playstation: Gamepad2,
  xbox: Tv,
  giftcards: CreditCard,
  subscriptions: Zap,
};

export default function CategoryTabs({ selectedCategory = 'all', onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800/80">
      {/* All Option */}
      <button
        onClick={() => onSelectCategory('all')}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
          selectedCategory === 'all'
            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-black border-cyan-400 shadow-md shadow-cyan-500/20'
            : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
        }`}
      >
        <Grid className="w-4 h-4" />
        <span>All Store Items</span>
      </button>

      {CATEGORIES.map((cat) => {
        const IconComponent = categoryIcons[cat.id] || Grid;
        const isSelected = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
              isSelected
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-black border-cyan-400 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
            }`}
          >
            <IconComponent className={`w-4 h-4 ${isSelected ? 'text-black' : 'text-cyan-400'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
