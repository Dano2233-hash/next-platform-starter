import React, { useState } from 'react';
import { ArrowRight, Flame, ShieldAlert, Sparkles, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ProductSection from '../components/ProductSection';
import SectionHeader from '../components/SectionHeader';
import CategoryTabs from '../components/CategoryTabs';
import { formatPrice } from '../utils/formatPrice';

export default function Home({ products, onAddToCart }) {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  // Hero product highlight
  const heroProduct = products.find((p) => p.isFeatured) || products[0];

  // Filters / Slices
  const comingSoonProducts = [
    {
      id: 'gta-6-coming',
      name: 'Grand Theft Auto VI (GTA 6)',
      slug: 'gta-6',
      category: 'games',
      platform: 'xbox',
      type: 'Game',
      price: 0,
      description: 'The highly anticipated next chapter in the Grand Theft Auto series. Coming 2025!',
      image: '',
      stock: 0,
      rating: 5.0,
      soldCount: 0,
      tag: 'Coming Soon',
    },
    {
      id: 'monster-hunter-wilds',
      name: 'Monster Hunter Wilds',
      slug: 'monster-hunter-wilds',
      category: 'games',
      platform: 'pc',
      type: 'Game',
      price: 0,
      description: 'The next generation in the critically acclaimed Monster Hunter action-RPG series.',
      image: '',
      stock: 0,
      rating: 4.9,
      soldCount: 0,
      tag: 'Coming Soon',
    }
  ];

  const topSales = [...products]
    .sort((a, b) => b.soldCount - a.soldCount)
    .slice(0, 4);

  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const newAndTrending = products.filter((p) => p.isTrending).slice(0, 4);
  const topRated = products.filter((p) => p.isTopRated).slice(0, 4);

  // Platform filters
  const xboxProducts = products.filter((p) => p.platform === 'xbox').slice(0, 4);
  const playStationProducts = products.filter((p) => p.platform === 'playstation').slice(0, 4);
  const pcProducts = products.filter((p) => p.platform === 'pc').slice(0, 4);
  const mobileTopUps = products.filter((p) => p.category === 'top-ups' && p.platform === 'mobile').slice(0, 4);
  const giftCards = products.filter((p) => p.category === 'gift-cards').slice(0, 4);
  const subscriptions = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero / Featured Showcase */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-900/80 p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-10 items-center justify-between shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#0066ff] opacity-10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#7000ff] opacity-10 blur-3xl" />

        <div className="relative z-10 max-w-xl text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#00e5ff]/10 text-[#00e5ff] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Featured Product Choice</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            Level Up Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066ff] via-[#00e5ff] to-[#7000ff]">Gaming Arena</span>
          </h1>

          <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-lg">
            Welcome to <strong className="text-white">Dano Store</strong>. Kurdistan's premier gaming hub. High-speed, guaranteed manual payments, and 100% genuine keys, UC codes, and premium digital memberships.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
            <button
              onClick={() => navigate('/products')}
              className="w-full sm:w-auto bg-[#0066ff] hover:bg-[#0055dd] text-white font-black text-sm uppercase tracking-wider px-8 py-4 rounded-xl transition-all shadow-lg shadow-[#0066ff]/20 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
            <button
              onClick={() => {
                if (heroProduct) navigate(`/products/${heroProduct.slug}`);
              }}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl transition-all cursor-pointer"
            >
              View Featured Item
            </button>
          </div>
        </div>

        {/* Hero Visual Card / Showcase */}
        {heroProduct && (
          <div className="relative z-10 w-full max-w-sm bg-[#08080b] border border-slate-900 p-6 rounded-2xl shadow-2xl flex flex-col gap-4">
            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 relative">
              {heroProduct.image ? (
                <img src={heroProduct.image} alt={heroProduct.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-[#0066ff] via-[#7000ff] to-black flex items-center justify-center">
                  <span className="text-4xl font-black tracking-widest text-white">
                    {heroProduct.name.slice(0, 3).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded text-[10px] font-black uppercase text-slate-300 border border-slate-800">
                {heroProduct.platform}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-extrabold uppercase text-[#00e5ff] tracking-widest block">
                {heroProduct.type}
              </span>
              <h3 className="text-lg font-extrabold text-white line-clamp-1">{heroProduct.name}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {heroProduct.description}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-slate-900/60 pt-4">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Starting From</span>
                <span className="text-lg font-black text-white">{formatPrice(heroProduct.price)}</span>
              </div>
              <button
                onClick={() => navigate(`/products/${heroProduct.slug}`)}
                className="bg-[#00e5ff] hover:bg-[#00bcd4] text-black text-xs font-black uppercase tracking-wider px-5 py-3 rounded-lg transition-all cursor-pointer"
              >
                Buy Now
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Category Selection Row */}
      <section className="space-y-4">
        <SectionHeader title="Shop By Category" subtitle="Quickly filter and explore what you need" />
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={(slug) => {
            setActiveCategory(slug);
            navigate(`/products?category=${slug}`);
          }}
        />
      </section>

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Unbeatable discount price packages for a limited time"
        badge="Hot Promo"
        products={flashDeals}
        onAddToCart={onAddToCart}
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="The latest hype and hot selling gaming additions"
        badge="Trending"
        products={newAndTrending}
        onAddToCart={onAddToCart}
      />

      {/* Coming Soon Section */}
      <section className="py-10 bg-slate-950/40 border border-slate-950 p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-48 h-48 rounded-full bg-yellow-500 opacity-5 blur-3xl" />
        <SectionHeader title="Coming Soon" subtitle="Highly expected upcoming titles & digital activations" badge="Upcoming" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comingSoonProducts.map((p) => (
            <div key={p.id} className="p-6 rounded-2xl bg-[#09090c] border border-slate-900 flex flex-col justify-between h-full hover:border-yellow-500/10 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                    Coming 2025
                  </span>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                    Platform: {p.platform}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white">{p.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
              </div>
              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-900/60">
                <span className="text-xs text-slate-500 font-bold">Status:</span>
                <span className="text-xs text-[#00e5ff] font-extrabold uppercase tracking-widest animate-pulse">Pre-Order Registration Open Soon</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Best selling packages and premium items highly ordered by Kurdish players"
        badge="Best Sellers"
        products={topSales}
        onAddToCart={onAddToCart}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated"
        subtitle="Gamers' favorite choices rated 4.9+ stars consistently"
        badge="Five Stars"
        products={topRated}
        onAddToCart={onAddToCart}
      />

      {/* Xbox Platform Section */}
      <ProductSection
        title="Xbox Section"
        subtitle="Genuine Xbox Keys, Game Pass, and balance card top-ups"
        badge="Xbox"
        products={xboxProducts}
        onAddToCart={onAddToCart}
      />

      {/* PlayStation Platform Section */}
      <ProductSection
        title="PlayStation Section"
        subtitle="PSN Card codes, direct premium memberships, and updates"
        badge="PS5 / PS4"
        products={playStationProducts}
        onAddToCart={onAddToCart}
      />

      {/* PC Gaming Platform Section */}
      <ProductSection
        title="PC Gaming Section"
        subtitle="Original steam keys, survival games, and points"
        badge="Steam / PC"
        products={pcProducts}
        onAddToCart={onAddToCart}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, Clash Gems and more instantly credited"
        badge="Mobile"
        products={mobileTopUps}
        onAddToCart={onAddToCart}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards"
        subtitle="Razer Gold PINs, Google Play Cards, Apple Cards, and Amazon Store Codes"
        badge="Digital Cards"
        products={giftCards}
        onAddToCart={onAddToCart}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Subscriptions"
        subtitle="Discord Nitro, Netflix Shared Screens, YouTube Ad-Free and Canva legal upgrades"
        badge="Subscriptions"
        products={subscriptions}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}
