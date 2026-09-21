import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Grid, Smartphone, Gamepad2, CreditCard, Sparkles } from 'lucide-react';

export const CategoryTabs = ({ activeCategory, onSelectCategory }) => {
  const getIcon = (id) => {
    switch (id) {
      case 'all':
        return <Grid className="w-4 h-4" />;
      case 'mobile-topup':
        return <Smartphone className="w-4 h-4 text-cyan-400" />;
      case 'paid-games':
        return <Gamepad2 className="w-4 h-4 text-blue-400" />;
      case 'gift-cards':
        return <CreditCard className="w-4 h-4 text-purple-400" />;
      case 'subscriptions':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      default:
        return <Grid className="w-4 h-4" />;
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
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all border ${
              isActive
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black border-cyan-400 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800'
            }`}
          >
            {getIcon(cat.id)}
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};
