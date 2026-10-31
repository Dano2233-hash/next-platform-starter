import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Gamepad2,
  Tv,
  Monitor,
  Smartphone,
  CreditCard,
  Sparkles,
  Grid
} from 'lucide-react';

const CATEGORY_ITEMS = [
  { id: 'all', name: 'All Games & Keys', icon: Grid, path: '/products' },
  { id: 'mobile', name: 'Mobile Top-Ups', icon: Smartphone, path: '/products?category=Mobile+Top-Up' },
  { id: 'pc', name: 'PC Steam Games', icon: Monitor, path: '/products?platform=PC' },
  { id: 'playstation', name: 'PlayStation', icon: Tv, path: '/products?platform=PlayStation' },
  { id: 'xbox', name: 'Xbox Series / One', icon: Gamepad2, path: '/products?platform=Xbox' },
  { id: 'giftcards', name: 'Gift Cards', icon: CreditCard, path: '/products?category=Gift+Cards' },
  { id: 'subscriptions', name: 'Subscriptions', icon: Sparkles, path: '/products?category=Subscriptions' },
];

export default function CategoryTabs() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category');
  const activePlatform = searchParams.get('platform');

  return (
    <div className="w-full py-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {CATEGORY_ITEMS.map((item) => {
          const Icon = item.icon;
          const isSelected =
            (item.id === 'all' && !activeCategory && !activePlatform) ||
            (item.id === 'mobile' && activeCategory === 'Mobile Top-Up') ||
            (item.id === 'pc' && activePlatform === 'PC') ||
            (item.id === 'playstation' && activePlatform === 'PlayStation') ||
            (item.id === 'xbox' && activePlatform === 'Xbox') ||
            (item.id === 'giftcards' && activeCategory === 'Gift Cards') ||
            (item.id === 'subscriptions' && activeCategory === 'Subscriptions');

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all duration-200 group ${
                isSelected
                  ? 'bg-gradient-to-b from-cyan-950/60 to-slate-900 border-cyan-500 shadow-md shadow-cyan-950/40 text-cyan-400'
                  : 'bg-[#090e1c] border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl mb-2 flex items-center justify-center transition-transform group-hover:scale-110 ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'bg-slate-800/80 text-slate-400 group-hover:text-cyan-400'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold tracking-wide">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
