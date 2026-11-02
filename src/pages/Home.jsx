import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { CATEGORIES } from '../data/categories';
import ProductSection from '../components/ProductSection';
import CategoryTabs from '../components/CategoryTabs';
import {
  Gamepad2,
  Sparkles,
  Zap,
  Flame,
  ShieldCheck,
  TrendingUp,
  Clock,
  ArrowRight,
  Headphones,
  CheckCircle2,
  Tag
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { products } = useProducts();
  const [activeTab, setActiveTab] = useState('all');

  const handleSelectCategory = (catId) => {
    setActiveTab(catId);
    if (catId !== 'all') {
      navigate(`/products?category=${catId}`);
    }
  };

  // Section product subsets
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const trendingProducts = products.filter((p) => p.isTrending);
  const topRatedProducts = products.filter((p) => p.isTopRated);
  const topSalesProducts = [...products].sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0)).slice(0, 4);

  // Platform and Category dedicated sections
  const xboxProducts = products.filter((p) => p.platform === 'Xbox');
  const playstationProducts = products.filter((p) => p.platform === 'PlayStation');
  const pcProducts = products.filter((p) => p.platform === 'PC');
  const mobileProducts = products.filter((p) => p.category === 'mobile' || p.platform === 'Mobile');
  const giftCardsProducts = products.filter((p) => p.category === 'gift-cards');
  const subscriptionProducts = products.filter((p) => p.category === 'subscriptions');

  // Coming Soon titles (upcoming high-demand releases in Kurdistan/Iraq)
  const comingSoonItems = [
    { title: 'Grand Theft Auto VI', platform: 'PS5 / Xbox Series', date: 'Fall 2025', tag: 'Most Anticipated' },
    { title: 'Monster Hunter Wilds', platform: 'PC / PS5 / Xbox', date: 'Feb 2025', tag: 'Capcom Pre-order' },
    { title: 'DOOM: The Dark Ages', platform: 'PC / Xbox', date: '2025', tag: 'Bethesda' },
    { title: 'Death Stranding 2', platform: 'PlayStation 5', date: '2025', tag: 'Kojima Productions' }
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero / Featured Showcase Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1329] via-[#080d1e] to-[#04060c] border border-cyan-500/20 p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Official Digital Gaming Hub • Kurdistan & Iraq</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Level Up Your Game with <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Instant Digital Delivery</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Direct PUBG Mobile UC, Steam keys, PlayStation & Xbox Gift Cards, and premium subscriptions. Fast manual payment via FastPay, Korek, and MasterCard.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/products"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-black font-extrabold text-sm transition-all shadow-lg shadow-cyan-950/50 flex items-center gap-2"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </Link>

            <Link
              to="/products?category=mobile"
              className="px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm transition-colors"
            >
              Mobile Top-Ups
            </Link>
          </div>

          {/* Quick trust metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80 text-xs">
            <div>
              <span className="font-black text-lg text-cyan-400 block">50,000+</span>
              <span className="text-slate-400">Delivered Orders</span>
            </div>
            <div>
              <span className="font-black text-lg text-blue-400 block">100% Legal</span>
              <span className="text-slate-400">Direct Publisher Codes</span>
            </div>
            <div>
              <span className="font-black text-lg text-purple-400 block">FastPay & Korek</span>
              <span className="text-slate-400">Direct Local Payment</span>
            </div>
            <div>
              <span className="font-black text-lg text-emerald-400 block">24/7 Support</span>
              <span className="text-slate-400">WhatsApp & Discord</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-cyan-400" />
            <span>Browse by Category</span>
          </h2>
          <Link to="/products" className="text-xs text-cyan-400 hover:underline font-semibold">
            All categories →
          </Link>
        </div>
        <CategoryTabs activeCategory={activeTab} onSelectCategory={handleSelectCategory} />
      </section>

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Time-limited discounts on top gaming essentials"
        badge="Flash Deals"
        badgeColor="from-rose-600 to-amber-500"
        viewAllLink="/products?filter=flash-deals"
        products={flashDeals}
        limit={4}
      />

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Most popular items bought by Iraqi gamers this week"
        badge="Hot Sales"
        badgeColor="from-blue-600 to-cyan-500"
        viewAllLink="/products"
        products={topSalesProducts}
        limit={4}
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="What everyone in Kurdistan and Iraq is playing right now"
        badge="Trending Now"
        badgeColor="from-cyan-500 to-emerald-400"
        viewAllLink="/products"
        products={trendingProducts}
        limit={4}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated Products"
        subtitle="Highest customer satisfaction score and instant delivery"
        badge="Top Rated"
        badgeColor="from-amber-500 to-yellow-400"
        viewAllLink="/products"
        products={topRatedProducts}
        limit={4}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups & In-Game Coins"
        subtitle="PUBG UC, Free Fire Diamonds, Roblox Robux, MLBB Diamonds and more"
        badge="Direct Player ID"
        badgeColor="from-cyan-500 to-blue-600"
        viewAllLink="/products?category=mobile"
        products={mobileProducts}
        limit={4}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Keys"
        subtitle="Paid Steam games delivered with official keys"
        badge="Steam Keys"
        badgeColor="from-blue-700 to-cyan-400"
        viewAllLink="/products?platform=PC"
        products={pcProducts}
        limit={4}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Essentials"
        subtitle="PSN gift cards, US/Global region top-ups and games"
        badge="PS4 & PS5"
        badgeColor="from-blue-600 to-indigo-600"
        viewAllLink="/products?platform=PlayStation"
        products={playstationProducts}
        limit={4}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox & Microsoft Gaming"
        subtitle="Xbox gift cards and digital game editions"
        badge="Xbox Series X|S"
        badgeColor="from-emerald-600 to-teal-500"
        viewAllLink="/products?platform=Xbox"
        products={xboxProducts}
        limit={4}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Digital Gift Cards"
        subtitle="Steam Wallet, Apple, Google Play, Razer Gold & Nintendo"
        badge="Instant Codes"
        badgeColor="from-purple-600 to-pink-500"
        viewAllLink="/products?category=gift-cards"
        products={giftCardsProducts}
        limit={4}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify and Canva Pro"
        badge="Premium Services"
        badgeColor="from-violet-600 to-purple-600"
        viewAllLink="/products?category=subscriptions"
        products={subscriptionProducts}
        limit={4}
      />

      {/* Coming Soon Section */}
      <section className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-extrabold text-[11px] uppercase tracking-wider mb-2">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Upcoming Releases</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">Coming Soon to Dano Store</h2>
          </div>
          <span className="text-xs text-slate-400">Pre-order announcements and priority queue</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {comingSoonItems.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
                  {item.tag}
                </span>
                <h4 className="font-bold text-white text-base mt-2.5">{item.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{item.platform}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <span className="text-slate-500">Expected:</span>
                <span className="font-bold text-cyan-400">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
