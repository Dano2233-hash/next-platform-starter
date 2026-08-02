import React, { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import CategoryTabs from '../components/CategoryTabs';
import { Sparkles, Gamepad2, ShieldCheck, Zap, TrendingUp, Trophy, ArrowRight, Gift } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function Home() {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Featured game for the hero header
  const featuredHeroGame = products.find((p) => p.id === 'gta-v') || products[0];

  // Specific filtered lists for home components
  const comingSoonGames = [
    {
      id: 'gta-6-cs',
      name: 'Grand Theft Auto VI',
      category: 'pc',
      platform: 'PC',
      type: 'Game',
      description: 'The next chapter in the groundbreaking open-world crime thriller franchise. Coming soon to PC.',
      price: 0,
      stock: 0,
      rating: 5.0,
      tag: 'Coming 2025'
    },
    {
      id: 'monster-hunter-wilds',
      name: 'Monster Hunter Wilds',
      category: 'pc',
      platform: 'PC',
      type: 'Game',
      description: 'Prepare to track down dangerous behemoths in highly dynamic, living ecosystems.',
      price: 0,
      stock: 0,
      rating: 4.9,
      tag: 'Feb 2025'
    }
  ];

  // Homepage placements
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const trendingProducts = products.filter((p) => p.isTrending);
  const topRatedProducts = products.filter((p) => p.isTopRated);

  // Platform and Category lists
  const xboxProducts = products.filter((p) => p.platform === 'Xbox' || p.category === 'xbox');
  const playstationProducts = products.filter((p) => p.platform === 'PlayStation' || p.category === 'playstation');
  const pcProducts = products.filter((p) => p.platform === 'PC' || p.category === 'pc');
  const mobileProducts = products.filter((p) => p.category === 'mobile');
  const giftCardProducts = products.filter((p) => p.category === 'gift-cards');
  const subscriptionProducts = products.filter((p) => p.category === 'subscriptions');

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    if (catId !== 'all') {
      window.location.href = `/products?category=${catId}`;
    }
  };

  return (
    <div className="space-y-6">

      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white text-[11px] md:text-xs font-black uppercase tracking-widest text-center py-2 px-4 shadow-md select-none">
        🚀 Welcome to Dano Store Kurdistan! Secure manual FastPay, Korek & MasterCard payments. Instant digital delivery!
      </div>

      {/* Hero / Featured Showcase Section */}
      {featuredHeroGame && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
          <div className="relative bg-[#07070e] border border-white/5 rounded-3xl overflow-hidden min-h-[420px] md:min-h-[500px] flex items-center shadow-2xl">
            {/* Absolute backdrop image or fallback colored glow */}
            <div className="absolute inset-0 z-0">
              {featuredHeroGame.image ? (
                <>
                  <img
                    src={featuredHeroGame.image}
                    alt=""
                    className="w-full h-full object-cover opacity-25 scale-105 filter blur-[2px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#05050a] via-[#05050a]/90 to-transparent"></div>
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-purple-950/20 via-cyan-950/20 to-[#05050a]"></div>
              )}
              {/* Radial blue-cyan neon glow accent */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-[120px]"></div>
            </div>

            {/* Hero Left Content side */}
            <div className="relative z-10 max-w-2xl px-6 py-12 md:px-12 space-y-6">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-cyan-950/60 text-cyan-400 border border-cyan-800/40 px-3 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Game Keys</span>
              </span>

              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                {featuredHeroGame.name}
              </h1>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl">
                {featuredHeroGame.description}
              </p>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-cyan-400">
                  {formatPrice(featuredHeroGame.price)}
                </span>
                {featuredHeroGame.oldPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(featuredHeroGame.oldPrice)}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`/product/${featuredHeroGame.slug}`}
                  className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:opacity-95 text-white text-xs font-black uppercase tracking-widest rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
                >
                  <span>Buy Premium License</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/products"
                  className="px-6 py-3.5 bg-[#111124] hover:bg-[#1a1a36] border border-white/10 text-gray-200 hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                >
                  Explore All Games
                </a>
              </div>
            </div>

            {/* Right side teaser box */}
            <div className="hidden lg:flex relative z-10 w-80 h-80 rounded-2xl border border-white/5 bg-[#0c0c16]/80 p-6 flex-col justify-between ml-auto mr-12 backdrop-blur-md">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Platform Match</span>
                <h4 className="text-white font-black text-lg line-clamp-2">{featuredHeroGame.name}</h4>
                <div className="text-cyan-400 font-bold text-xs">Official PC Digital License Key</div>
              </div>
              <div className="space-y-4">
                <div className="text-xs text-gray-400">
                  Securely download via legal Steam, Epic, or EA app. Global region key.
                </div>
                <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Stock Available</span>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* Category Selection Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <CategoryTabs selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
      </section>

      {/* FLASH DEALS ROW */}
      <ProductSection
        title="Flash Deals"
        subtitle="Exclusive price drops for limited stock keys"
        tag="Flash Deal"
        products={flashDeals}
      />

      {/* NEW & TRENDING */}
      <ProductSection
        title="New & Trending"
        subtitle="Highly recommended digital game keys and coins this week"
        tag="Trending"
        products={trendingProducts}
      />

      {/* TOP RATED */}
      <ProductSection
        title="Top Rated"
        subtitle="Outstanding feedback from our gamer clients in Kurdistan"
        tag="Highly Rated"
        products={topRatedProducts}
      />

      {/* XBOX SECTION */}
      <ProductSection
        title="Xbox Game Cards & Keys"
        subtitle="Unlock Xbox premium codes and Ultimate memberships"
        tag="Xbox Zone"
        products={xboxProducts}
      />

      {/* PLAYSTATION SECTION */}
      <ProductSection
        title="PlayStation Store"
        subtitle="Official PSN wallet codes and exclusive releases"
        tag="PS Zone"
        products={playstationProducts}
      />

      {/* PC GAMING SECTION */}
      <ProductSection
        title="PC Gaming Keys"
        subtitle="Instant license codes for your favourite launchers"
        tag="PC Zone"
        products={pcProducts}
      />

      {/* MOBILE TOP-UPS */}
      <ProductSection
        title="Mobile Game Top-Ups"
        subtitle="Coins, diamonds, and credits for PUBG, Free Fire, Valorant, Clash"
        tag="Mobile Zone"
        products={mobileProducts}
      />

      {/* GIFT CARDS */}
      <ProductSection
        title="Official Gift Cards"
        subtitle="Razer, Steam, Google, Apple and Amazon codes"
        tag="Gift Cards"
        products={giftCardProducts}
      />

      {/* SUBSCRIPTIONS */}
      <ProductSection
        title="Premium Subscriptions"
        subtitle="Discord Nitro, Youtube Premium, Netflix, Spotify and Canva"
        tag="Memberships"
        products={subscriptionProducts}
      />

      {/* COMING SOON ROW */}
      <section className="py-8 border-b border-white/5 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-8">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-950/50 border border-purple-800/30 px-2.5 py-1 rounded-md">
                Coming Soon
              </span>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white mt-2">
                Future Legends Release Tracker
              </h3>
            </div>
            <p className="text-xs md:text-sm text-gray-400 font-semibold italic">Preorders and listings dropping soon</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {comingSoonGames.map((game) => (
              <div
                key={game.id}
                className="bg-gradient-to-r from-[#0d0d1b] to-[#07070f] border border-white/5 p-6 rounded-2xl flex flex-col md:flex-row gap-6 hover:border-purple-500/20 transition-all shadow-lg"
              >
                {/* Fallback Graphic */}
                <div className="w-full md:w-36 h-36 rounded-xl bg-purple-950/40 flex flex-col items-center justify-center p-3 text-center border border-purple-900/40 relative overflow-hidden flex-shrink-0">
                  <div className="absolute top-2 left-2 text-[8px] font-black uppercase tracking-widest bg-purple-900 text-white px-1.5 py-0.5 rounded">
                    {game.platform}
                  </div>
                  <Gamepad2 className="w-8 h-8 text-purple-400 mb-2" />
                  <span className="text-xs font-black text-white uppercase tracking-wider">{game.name}</span>
                </div>

                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-950/40 border border-purple-800/30 px-2 py-0.5 rounded">
                      {game.tag}
                    </span>
                    <h4 className="text-white font-bold text-base">{game.name}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{game.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 italic">Preorders Opening Soon</span>
                    <span className="text-xs text-purple-400 font-black">Notify Me</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
