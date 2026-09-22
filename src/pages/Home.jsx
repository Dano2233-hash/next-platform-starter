import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Gamepad2, Flame, Zap, Star, TrendingUp, Sparkles, Smartphone, Gift, Tv, Monitor, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { products } = useProducts();
  const navigate = useNavigate();

  // Filter products by home sections
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const topSales = products.filter((p) => p.soldCount > 800 || p.tag === 'Top Sales');
  const newAndTrending = products.filter((p) => p.isTrending);
  const topRated = products.filter((p) => p.isTopRated || p.rating >= 4.9);

  // Platform and Category specific lists
  const xboxSection = products.filter((p) => p.platform === 'Xbox' || p.name.includes('Xbox'));
  const playStationSection = products.filter((p) => p.platform === 'PlayStation' || p.name.includes('PlayStation') || p.name.includes('PSN'));
  const pcSection = products.filter((p) => p.platform === 'PC');
  const mobileTopUps = products.filter((p) => p.category === 'mobile');
  const giftCardsSection = products.filter((p) => p.category === 'gift-cards');
  const subscriptionsSection = products.filter((p) => p.category === 'subscriptions');

  // Featured Hero Item
  const featuredHero = products.find((p) => p.id === 'pubg-mobile-uc') || products[0];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#091122] via-[#0d1a36] to-[#1a0f35] border border-cyan-500/20 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Official Digital Gaming Store in Kurdistan & Iraq
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Level Up Your Gaming Experience with <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Dano Store</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
              Get instant UC, V-Bucks, Diamonds, Steam Keys, PSN Cards, Discord Nitro, and subscriptions. Pay easily via FastPay, Korek, and MasterCard.
            </p>

            <div className="pt-2 flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link
                to="/products?category=mobile"
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-cyan-950/50 flex items-center gap-2 uppercase tracking-wider"
              >
                <Zap className="w-4 h-4 fill-black" /> Shop Top-Ups
              </Link>
              <Link
                to="/products?category=games"
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-sm rounded-xl border border-slate-700/80 transition-all"
              >
                Explore Paid Games
              </Link>
            </div>
          </div>

          {/* Featured Hero Card Highlight */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-5 shadow-2xl relative group hover:border-cyan-400 transition-all">
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-red-500 text-black font-black text-[10px] uppercase px-3 py-1 rounded-full shadow-md">
                #1 Best Seller
              </div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                Featured Deal
              </span>
              <h3 className="text-xl font-extrabold text-white mb-2">{featuredHero.name}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 mb-4">{featuredHero.description}</p>

              <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                <div>
                  <span className="text-[10px] text-slate-500 block">Starting from</span>
                  <span className="text-lg font-black text-cyan-400">{featuredHero.price} IQD</span>
                </div>
                <Link
                  to={`/products/${featuredHero.slug}`}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs rounded-lg transition-all"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <Link
            to="/products?category=mobile"
            className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0c1428] border border-slate-800 hover:border-cyan-500/50 transition-all group text-center space-y-2"
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xs text-slate-200">Mobile Top-Ups</h4>
            <p className="text-[10px] text-slate-500">PUBG, Free Fire, VP, Robux</p>
          </Link>

          <Link
            to="/products?category=games"
            className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0c1428] border border-slate-800 hover:border-blue-500/50 transition-all group text-center space-y-2"
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Monitor className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xs text-slate-200">Paid Games</h4>
            <p className="text-[10px] text-slate-500">GTA V, RDR2, Elden Ring</p>
          </Link>

          <Link
            to="/products?category=gift-cards"
            className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0c1428] border border-slate-800 hover:border-purple-500/50 transition-all group text-center space-y-2"
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <Gift className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xs text-slate-200">Gift Cards</h4>
            <p className="text-[10px] text-slate-500">Steam, PSN, Xbox, Apple</p>
          </Link>

          <Link
            to="/products?category=subscriptions"
            className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0c1428] border border-slate-800 hover:border-amber-500/50 transition-all group text-center space-y-2"
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xs text-slate-200">Subscriptions</h4>
            <p className="text-[10px] text-slate-500">Discord Nitro, YouTube, Netflix</p>
          </Link>

          <Link
            to="/products?platform=PlayStation"
            className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0c1428] border border-slate-800 hover:border-indigo-500/50 transition-all group text-center space-y-2 col-span-2 sm:col-span-1"
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <Tv className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xs text-slate-200">Consoles</h4>
            <p className="text-[10px] text-slate-500">PlayStation & Xbox Digital</p>
          </Link>
        </div>
      </section>

      {/* Coming Soon Banner */}
      <section className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-blue-950/40 border border-purple-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
            <Clock className="w-6 h-6 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
              Coming Soon
            </span>
            <h3 className="text-base font-bold text-white mt-1">
              GTA VI & Monster Hunter Wilds Pre-Orders
            </h3>
            <p className="text-xs text-slate-400">
              Stay tuned for instant digital pre-orders and exclusive Kurdistan launch bonuses.
            </p>
          </div>
        </div>
        <Link
          to="/products"
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs rounded-xl shrink-0 transition-all"
        >
          Explore Store
        </Link>
      </section>

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Most purchased digital games and top-ups in Kurdistan"
        icon={<Flame className="w-5 h-5 text-amber-400" />}
        products={topSales}
        viewAllLink="/products"
        limit={4}
      />

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounted digital packages"
        icon={<Zap className="w-5 h-5 text-cyan-400" />}
        products={flashDeals}
        viewAllLink="/products"
        limit={4}
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="Trending in the Iraqi gaming community"
        icon={<TrendingUp className="w-5 h-5 text-emerald-400" />}
        products={newAndTrending}
        viewAllLink="/products"
        limit={4}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated"
        subtitle="Highest customer rated digital items"
        icon={<Star className="w-5 h-5 text-amber-400" />}
        products={topRated}
        viewAllLink="/products"
        limit={4}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Section"
        subtitle="Xbox Live, Game Pass, and digital console games"
        icon={<Tv className="w-5 h-5 text-emerald-400" />}
        products={xboxSection}
        viewAllLink="/products?platform=Xbox"
        limit={4}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Section"
        subtitle="PSN Gift Cards and PlayStation digital titles"
        icon={<Tv className="w-5 h-5 text-blue-400" />}
        products={playStationSection}
        viewAllLink="/products?platform=PlayStation"
        limit={4}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Section"
        subtitle="Steam keys, Valorant VP, and PC games"
        icon={<Monitor className="w-5 h-5 text-cyan-400" />}
        products={pcSection}
        viewAllLink="/products?platform=PC"
        limit={4}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups Section"
        subtitle="UC, V-Bucks, Diamonds, Robux, and CP"
        icon={<Smartphone className="w-5 h-5 text-cyan-400" />}
        products={mobileTopUps}
        viewAllLink="/products?category=mobile"
        limit={4}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards Section"
        subtitle="Steam, PSN, Xbox, Google Play, iTunes, Razer Gold"
        icon={<Gift className="w-5 h-5 text-purple-400" />}
        products={giftCardsSection}
        viewAllLink="/products?category=gift-cards"
        limit={4}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Subscriptions Section"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify, Canva"
        icon={<Zap className="w-5 h-5 text-amber-400" />}
        products={subscriptionsSection}
        viewAllLink="/products?category=subscriptions"
        limit={4}
      />
    </div>
  );
}
