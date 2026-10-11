import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Smartphone, Gamepad2, CreditCard, Zap, Grid } from 'lucide-react';

export default function CategoryTabs({ activeCategory, onSelectCategory }) {
  const getIcon = (id) => {
    switch (id) {
      case 'mobile-topups': return <Smartphone className="w-4 h-4" />;
      case 'games': return <Gamepad2 className="w-4 h-4" />;
      case 'gift-cards': return <CreditCard className="w-4 h-4" />;
      case 'subscriptions': return <Zap className="w-4 h-4" />;
      default: return <Grid className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border ${
              isActive
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-cyan-500/60 text-cyan-300 shadow-md shadow-cyan-950/40'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {getIcon(cat.id)}
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
