import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Gamepad2, Smartphone, Gift, Sparkles, Layers } from 'lucide-react';

export default function CategoryTabs({ activeCategory, onSelectCategory }) {
  const getIcon = (id) => {
    switch (id) {
      case 'mobile-topups':
        return <Smartphone className="w-4 h-4" />;
      case 'games':
        return <Gamepad2 className="w-4 h-4" />;
      case 'gift-cards':
        return <Gift className="w-4 h-4" />;
      case 'subscriptions':
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.slug || activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.slug)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-600/30 border border-cyan-400/50 scale-105'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <span className={isActive ? 'text-white' : 'text-cyan-400'}>
              {getIcon(cat.id)}
            </span>
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
