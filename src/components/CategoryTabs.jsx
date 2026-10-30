import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Grid, Smartphone, Gamepad2, CreditCard, Zap } from 'lucide-react';

export default function CategoryTabs({ selectedCategory, onSelectCategory }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="w-4 h-4" />;
      case 'Gamepad2': return <Gamepad2 className="w-4 h-4" />;
      case 'CreditCard': return <CreditCard className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      default: return <Grid className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
              isSelected
                ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-sm shadow-cyan-500/20'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {getIcon(cat.icon)}
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
