import React from 'react';
import { Sparkles, Gamepad2, Smartphone, CreditCard, Crown } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export default function CategoryTabs({ activeCategory = 'all', onSelectCategory }) {
  const getIcon = (id) => {
    switch (id) {
      case 'games':
        return <Gamepad2 className="w-4 h-4" />;
      case 'mobile-topups':
        return <Smartphone className="w-4 h-4" />;
      case 'gift-cards':
        return <CreditCard className="w-4 h-4" />;
      case 'subscriptions':
        return <Crown className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.slug;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.slug)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-[0_0_15px_rgba(0,102,255,0.3)]'
                : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span className={isActive ? 'text-white' : 'text-cyan-400'}>{getIcon(cat.id)}</span>
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
