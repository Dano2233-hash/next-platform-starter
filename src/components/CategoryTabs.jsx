import React from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';
import { Smartphone, Gamepad2, CreditCard, Zap, Grid } from 'lucide-react';

export default function CategoryTabs({ selectedCategory, onSelectCategory, selectedPlatform, onSelectPlatform }) {
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
    <div className="space-y-4">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.name || (selectedCategory === 'All' && cat.id === 'all');
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id === 'all' ? 'All' : cat.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 text-slate-950 shadow-md shadow-cyan-950/50 scale-[1.02]'
                  : 'bg-[#0a0e1d] text-slate-300 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {getIcon(cat.icon)}
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Platform Pills */}
      {onSelectPlatform && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-500 font-bold mr-1 shrink-0 text-[11px] uppercase tracking-wider">Platform:</span>
          {PLATFORMS.map((plat) => {
            const isActive = selectedPlatform === plat.id;
            return (
              <button
                key={plat.id}
                onClick={() => onSelectPlatform(plat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/60'
                }`}
              >
                {plat.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
