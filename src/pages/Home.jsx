import React, { useState, useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import SectionHeader from '../components/SectionHeader';
import ProductCard from '../components/ProductCard';
import ProductSection from '../components/ProductSection';
import CategoryTabs from '../components/CategoryTabs';
import { useNavigate } from 'react-router-dom';
import {
  Flame,
  Zap,
  TrendingUp,
  Star,
  Clock,
  Gamepad2,
  Tv,
  Smartphone,
  CreditCard,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function Home() {
  const { products } = useProducts();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filtered sections derived from product state
  const featuredProducts = useMemo(() => products.filter((p) => p.isFeatured), [products]);
  const flashDeals = useMemo(() => products.filter((p) => p.isFlashDeal), [products]);
  const trendingProducts = useMemo(() => products.filter((p) => p.isTrending), [products]);
  const topRatedProducts = useMemo(() => products.filter((p) => p.isTopRated), [products]);

  // Platform specific
  const xboxProducts = useMemo(() => products.filter((p) => p.platform === 'Xbox'), [products]);
  const psProducts = useMemo(() => products.filter((p) => p.platform === 'PlayStation'), [products]);
  const pcProducts = useMemo(() => products.filter((p) => p.platform === 'PC'), [products]);
  const mobileProducts = useMemo(() => products.filter((p) => p.platform === 'Mobile'), [products]);
  const giftCards = useMemo(() => products.filter((p) => p.category === 'gift-cards'), [products]);
  const subscriptions = useMemo(() => products.filter((p) => p.category === 'subscriptions'), [products]);

  // Filter products for category tab selection
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div className="space-y-12 pb-16">

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0a1026] via-[#070b1a] to-[#120a28] border border-slate-800/80 p-6 sm:p-10 lg:p-12 shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Official Digital Store in Kurdistan & Iraq
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Level Up Your Gaming with <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Instant Top-Ups & Games</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Get instant PUBG Mobile UC, Free Fire Diamonds, Steam Wallet codes, PC & Console original games, and premium subscriptions with local Kurdish payment methods.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3.5 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold rounded-xl shadow-lg shadow-cyan-500/25 transition-all text-sm flex items-center gap-2 active:scale-95"
            >
              <Gamepad2 className="w-4 h-4" />
              Explore All Products
            </button>

            <button
              onClick={() => navigate('/products?category=top-ups')}
              className="px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-cyan-300 font-extrabold rounded-xl border border-slate-700 transition-all text-sm flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              Instant Top-Ups
            </button>
          </div>

          {/* Quick Badges */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Guaranteed Delivery
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" /> FastPay / Korek Accepted
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" /> 24/7 Digital Processing
            </div>
          </div>

        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white">Browse Categories</h2>
        </div>
        <CategoryTabs
          activeCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* If category tab selected != 'all', show grid */}
        {selectedCategory !== 'all' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* Coming Soon Notice Banner */}
      <section className="p-4 sm:p-6 bg-gradient-to-r from-purple-950/40 via-slate-900 to-blue-950/40 border border-purple-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl border border-purple-500/30">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base">Coming Soon to Dano Store</h3>
            <p className="text-xs text-slate-400">Grand Theft Auto VI pre-orders, EA Sports FC 25 Points, and exclusive Kurdish gaming tournaments.</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/products')}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs whitespace-nowrap shadow-lg shadow-purple-500/20"
        >
          View Current Store
        </button>
      </section>

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Our most ordered gaming keys & top-ups in Kurdistan"
        icon={Flame}
        products={featuredProducts.slice(0, 4)}
        onSeeAll={() => navigate('/products')}
      />

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounted game keys & wallet cards"
        icon={Zap}
        products={flashDeals.slice(0, 4)}
        onSeeAll={() => navigate('/products')}
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="Hottest upcoming titles and viral game packages"
        icon={TrendingUp}
        products={trendingProducts.slice(0, 4)}
        onSeeAll={() => navigate('/products')}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated Games & Services"
        subtitle="Highest reviewed items by gaming community"
        icon={Star}
        products={topRatedProducts.slice(0, 4)}
        onSeeAll={() => navigate('/products')}
      />

      {/* Mobile Top-Ups Dedicated Section */}
      <ProductSection
        title="Mobile Game Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, Valorant Points & Robux"
        icon={Smartphone}
        products={mobileProducts.slice(0, 4)}
        onSeeAll={() => navigate('/products?platform=Mobile')}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Console & PC Games"
        subtitle="Official Xbox digital titles and Game Pass codes"
        icon={Tv}
        products={xboxProducts.slice(0, 4)}
        onSeeAll={() => navigate('/products?platform=Xbox')}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Store & Games"
        subtitle="PS4 / PS5 games and PSN prepaid card vouchers"
        icon={Gamepad2}
        products={psProducts.slice(0, 4)}
        onSeeAll={() => navigate('/products?platform=PlayStation')}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Keys"
        subtitle="Steam, Epic Games & Riot games instant keys"
        icon={Gamepad2}
        products={pcProducts.slice(0, 4)}
        onSeeAll={() => navigate('/products?platform=PC')}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards"
        subtitle="Steam, PSN, Xbox, Google Play & Apple Cards"
        icon={CreditCard}
        products={giftCards.slice(0, 4)}
        onSeeAll={() => navigate('/products?category=gift-cards')}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix & Spotify"
        icon={Sparkles}
        products={subscriptions.slice(0, 4)}
        onSeeAll={() => navigate('/products?category=subscriptions')}
      />

    </div>
  );
}
