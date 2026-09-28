import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import CategoryTabs from '../components/CategoryTabs';
import {
  Sparkles,
  Flame,
  Zap,
  TrendingUp,
  Star,
  Gamepad2,
  Tv,
  Monitor,
  Smartphone,
  Gift,
  ShieldCheck,
  Clock,
  ArrowRight
} from 'lucide-react';

export const Home = () => {
  const { products } = useProducts();

  // Filter sections
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const topSales = products.filter((p) => p.soldCount >= 1000).slice(0, 5);
  const trending = products.filter((p) => p.isTrending);
  const topRated = products.filter((p) => p.isTopRated || p.rating >= 4.9);

  // Platform & Category specific arrays
  const xboxProducts = products.filter((p) => p.platform === 'Xbox' || p.category === 'xbox');
  const psProducts = products.filter((p) => p.platform === 'PlayStation' || p.category === 'playstation');
  const pcProducts = products.filter((p) => p.platform === 'PC' || p.category === 'pc');
  const mobileProducts = products.filter((p) => p.platform === 'Mobile' || p.category === 'mobile');
  const giftCards = products.filter((p) => p.platform === 'Gift Card' || p.category === 'giftcards');
  const subscriptions = products.filter((p) => p.type === 'Subscription' || p.category === 'subscriptions');

  const comingSoonItems = [
    { name: 'GTA VI Pre-Orders', platform: 'PS5 / Xbox Series X', tag: 'Fall 2025' },
    { name: 'Monster Hunter Wilds', platform: 'PC / Consoles', tag: '2025' },
    { name: 'Assassin’s Creed Shadows', platform: 'PC / Consoles', tag: 'Coming Soon' }
  ];

  return (
    <div className="space-y-12">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-purple-900/60 to-cyan-900/60 border-b border-cyan-500/20 py-2.5 px-4 text-center text-xs font-bold text-cyan-200 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
        <span>Welcome to Dano Store — #1 Digital Gaming Store in Kurdistan & Iraq! Instant delivery & local IQD payments.</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Banner Section */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-br from-[#0c1329] via-[#080d1e] to-[#130b26] p-8 sm:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-extrabold text-xs">
              <Zap className="w-3.5 h-3.5" /> Direct Player ID & Code Instant Top-Up
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Level Up Your Gaming Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">In Kurdistan</span>
            </h1>

            <p className="text-slate-300 text-sm leading-relaxed">
              Fast, safe, and legal digital game top-ups, Steam keys, Xbox & PlayStation gift cards, and premium subscriptions paid with FastPay, Korek, or MasterCard.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/products"
                className="px-6 py-3.5 rounded-2xl font-extrabold text-xs bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:opacity-95 text-white shadow-xl shadow-cyan-500/20 flex items-center gap-2 transition-all"
              >
                <span>Browse Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products?category=mobile"
                className="px-6 py-3.5 rounded-2xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all"
              >
                PUBG & Mobile Top-Ups
              </Link>
            </div>
          </div>
        </div>

        {/* Category Row */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Browse Categories</h3>
          <CategoryTabs activeCategory="all" onSelectCategory={(cat) => window.location.href = `/products?category=${cat}`} />
        </div>

        {/* Flash Deals Section */}
        <ProductSection
          title="Flash Deals"
          subtitle="Limited time discounts on top game codes"
          icon={Zap}
          actionLink="/products"
          products={flashDeals}
        />

        {/* Top Sales Section */}
        <ProductSection
          title="Top Sales"
          subtitle="Most popular items bought by gamers in Kurdistan"
          icon={Flame}
          actionLink="/products"
          products={topSales}
        />

        {/* New & Trending Section */}
        <ProductSection
          title="New & Trending"
          subtitle="Freshly added titles and popular game reloads"
          icon={TrendingUp}
          actionLink="/products"
          products={trending}
        />

        {/* Top Rated Section */}
        <ProductSection
          title="Top Rated Games & Services"
          subtitle="Highest customer ratings and reviews"
          icon={Star}
          actionLink="/products"
          products={topRated}
        />

        {/* Coming Soon Teaser Row */}
        <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-cyan-400" />
            <h3 className="font-extrabold text-base text-white">Coming Soon to Dano Store</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {comingSoonItems.map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-xs text-white">{item.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{item.platform}</p>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-extrabold bg-slate-800 text-cyan-400 border border-slate-700 rounded-md">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Specific Sections */}
        <ProductSection
          title="Mobile Top-Ups"
          subtitle="UC, Diamonds, V-Bucks, VP & Game Points"
          icon={Smartphone}
          actionLink="/products?category=mobile"
          products={mobileProducts}
        />

        <ProductSection
          title="PC Gaming Store"
          subtitle="Steam keys, Activation codes and Base Games"
          icon={Monitor}
          actionLink="/products?category=pc"
          products={pcProducts}
        />

        <ProductSection
          title="Xbox Gaming"
          subtitle="Xbox Game Pass & Xbox Digital Codes"
          icon={Gamepad2}
          actionLink="/products?category=xbox"
          products={xboxProducts}
        />

        <ProductSection
          title="PlayStation Store"
          subtitle="PSN Gift Cards & PlayStation Digital Games"
          icon={Tv}
          actionLink="/products?category=playstation"
          products={psProducts}
        />

        <ProductSection
          title="Digital Gift Cards"
          subtitle="Steam Wallet, iTunes, Google Play & Xbox"
          icon={Gift}
          actionLink="/products?category=giftcards"
          products={giftCards}
        />

        <ProductSection
          title="Subscriptions"
          subtitle="Discord Nitro, YouTube Premium, Netflix & Spotify"
          icon={Sparkles}
          actionLink="/products?category=subscriptions"
          products={subscriptions}
        />

      </div>
    </div>
  );
};

export default Home;
