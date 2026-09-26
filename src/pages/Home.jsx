import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Zap,
  Star,
  Sparkles,
  Gamepad2,
  Tv,
  Monitor,
  Smartphone,
  Gift,
  Clock,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Award,
} from 'lucide-react';

import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import SectionHeader from '../components/SectionHeader';

export const Home = () => {
  const { products } = useProducts();

  // Filter sections
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const trending = products.filter((p) => p.isTrending);
  const topRated = products.filter((p) => p.isTopRated);
  const featured = products.filter((p) => p.isFeatured);

  const xboxProducts = products.filter(
    (p) => (p.platform || '').toLowerCase().includes('xbox') || (p.category || '').toLowerCase() === 'xbox'
  );
  const psProducts = products.filter(
    (p) => (p.platform || '').toLowerCase().includes('playstation') || (p.category || '').toLowerCase() === 'playstation'
  );
  const pcProducts = products.filter(
    (p) => (p.platform || '').toLowerCase().includes('pc') || (p.category || '').toLowerCase() === 'pc'
  );
  const mobileProducts = products.filter(
    (p) => (p.platform || '').toLowerCase().includes('mobile') || (p.category || '').toLowerCase() === 'mobile'
  );
  const giftCardProducts = products.filter(
    (p) => (p.category || '').toLowerCase() === 'gift-cards' || p.type === 'Gift Card'
  );
  const subscriptionProducts = products.filter(
    (p) => (p.category || '').toLowerCase() === 'subscriptions' || p.type === 'Subscription'
  );

  // Coming soon mock items for requested Coming Soon section
  const comingSoonItems = [
    {
      id: 'cs-1',
      title: 'GTA VI Pre-Orders',
      platform: 'PlayStation / Xbox',
      release: 'Coming 2025',
      badge: 'Most Anticipated',
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'cs-2',
      title: 'Monster Hunter Wilds',
      platform: 'PC / Console',
      release: 'Coming Feb 2025',
      badge: 'Action RPG',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'cs-3',
      title: 'Assassin\'s Creed Shadows',
      platform: 'Multi-Platform',
      release: 'Coming Soon',
      badge: 'Ubisoft Original',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero / Featured Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-[#070d1e] to-purple-950 border border-slate-800 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>#1 Digital Gaming Store in Kurdistan &amp; Iraq</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight leading-tight">
              Level Up Your Game with <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Instant Digital Delivery</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
              Buy official PC games, PUBG UC, Free Fire Diamonds, V-Bucks, Steam gift cards, and subscriptions with local Iraqi payments: FastPay, Korek, and MasterCard.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/products"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-xl shadow-cyan-950/60 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <span>Explore Store</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/products?category=mobile"
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm transition-all"
              >
                Mobile Top-Ups
              </Link>
            </div>

            {/* Quick Stats Badges */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-slate-300">
              <div>
                <span className="block font-black text-lg sm:text-2xl text-cyan-400">100%</span>
                <span className="text-[11px] text-slate-400">Official Codes</span>
              </div>
              <div>
                <span className="block font-black text-lg sm:text-2xl text-cyan-400">24/7</span>
                <span className="text-[11px] text-slate-400">Fast Support</span>
              </div>
              <div>
                <span className="block font-black text-lg sm:text-2xl text-cyan-400">IQD</span>
                <span className="text-[11px] text-slate-400">Local Currency</span>
              </div>
            </div>
          </div>

          {/* Hero Featured Cards Preview */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {featured.slice(0, 4).map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section className="space-y-4">
        <SectionHeader title="Browse Categories" subtitle="Select your gaming platform or service" />
        <CategoryTabs activeCategory="all" onSelectCategory={(cat) => (window.location.href = `/products?category=${cat}`)} />
      </section>

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on top games & codes"
        icon={Zap}
        badge="Hot Sale"
        viewAllLink="/products"
        products={flashDeals}
        limit={4}
      />

      {/* New & Trending */}
      <ProductSection
        title="New & Trending"
        subtitle="Most played titles and trending top-ups right now"
        icon={TrendingUp}
        badge="Popular"
        viewAllLink="/products"
        products={trending}
        limit={4}
      />

      {/* Top Sales / Best Sellers */}
      <ProductSection
        title="Top Sales"
        subtitle="Best selling games and recharge packages in Iraq"
        icon={Flame}
        badge="Best Value"
        viewAllLink="/products"
        products={featured}
        limit={4}
      />

      {/* Coming Soon Section */}
      <section className="my-10">
        <SectionHeader
          title="Coming Soon"
          subtitle="Upcoming blockbuster games & pre-orders"
          icon={Clock}
          badge="Pre-Orders"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {comingSoonItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#0a0f22] border border-slate-800 rounded-2xl overflow-hidden group hover:border-cyan-500/40 transition-all p-4 space-y-3"
            >
              <div className="h-40 rounded-xl overflow-hidden relative bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 right-2 bg-purple-600/90 text-white font-bold text-[10px] px-2 py-0.5 rounded backdrop-blur-md">
                  {item.badge}
                </span>
              </div>
              <div>
                <h3 className="font-extrabold text-slate-100 text-sm">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{item.platform}</p>
                <div className="mt-2 flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                  <span className="text-cyan-400 font-bold">{item.release}</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                    Notify Me
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, V-Bucks & MLBB"
        icon={Smartphone}
        viewAllLink="/products?category=mobile"
        products={mobileProducts}
        limit={4}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming"
        subtitle="Steam keys, Valorant VP, GTA V & Elden Ring"
        icon={Monitor}
        viewAllLink="/products?category=pc"
        products={pcProducts}
        limit={4}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation"
        subtitle="PSN Gift Cards, Store Credits & Console Games"
        icon={Tv}
        viewAllLink="/products?category=playstation"
        products={psProducts}
        limit={4}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Store"
        subtitle="Xbox Gift Cards & Game Pass Subscriptions"
        icon={Gamepad2}
        viewAllLink="/products?category=xbox"
        products={xboxProducts}
        limit={4}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards"
        subtitle="Steam, Google Play, Apple, Razer Gold & Amazon"
        icon={Gift}
        viewAllLink="/products?category=gift-cards"
        products={giftCardProducts}
        limit={4}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Subscriptions"
        subtitle="Discord Nitro, Netflix 4K, YouTube Premium & Spotify"
        icon={Sparkles}
        viewAllLink="/products?category=subscriptions"
        products={subscriptionProducts}
        limit={4}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated Games"
        subtitle="Highest customer ratings & verified purchases"
        icon={Star}
        badge="5.0 Rating"
        viewAllLink="/products"
        products={topRated}
        limit={4}
      />
    </div>
  );
};

export default Home;
