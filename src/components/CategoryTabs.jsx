import React from 'react';
import { Gamepad2, Phone, Gift, Tv, PlusCircle, LayoutGrid } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

export function CategoryTabs({ activePlatform, activeCategory }) {
  const { navigate } = useNavigation();

  const tabs = [
    { id: 'all', name: 'All Products', href: '#/products', icon: LayoutGrid },
    { id: 'xbox', name: 'Xbox', href: '#/products?platform=xbox', icon: Gamepad2 },
    { id: 'playstation', name: 'PlayStation', href: '#/products?platform=playstation', icon: Gamepad2 },
    { id: 'pc', name: 'PC Gaming', href: '#/products?platform=pc', icon: Gamepad2 },
    { id: 'mobile', name: 'Mobile Top-Ups', href: '#/products?platform=mobile', icon: Phone },
    { id: 'giftcard', name: 'Gift Cards', href: '#/products?platform=giftcard', icon: Gift },
    { id: 'subscription', name: 'Subscriptions', href: '#/products?platform=subscription', icon: Tv },
    { id: 'others', name: 'Others', href: '#/products?category=others', icon: PlusCircle }
  ];

  const getActiveTab = () => {
    if (activeCategory === 'others') return 'others';
    if (activePlatform) return activePlatform.toLowerCase();
    return 'all';
  };

  const activeId = getActiveTab();

  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex space-x-2 min-w-max px-1">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeId === tab.id;
          return (
            <a
              key={tab.id}
              href={tab.href}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide border transition-all duration-200 ${
                isActive
                  ? 'bg-brand-blue text-white border-brand-cyan shadow-lg shadow-brand-blue/15'
                  : 'bg-[#0d0d15] text-gray-400 border-brand-border hover:text-white hover:border-brand-blue/50'
              }`}
            >
              <IconComponent className="h-4 w-4" />
              {tab.name}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryTabs;
