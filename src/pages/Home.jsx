import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Gamepad2,
  Zap,
  TrendingUp,
  Flame,
  Star,
  Sparkles,
  Smartphone,
  CreditCard,
  ShieldCheck,
  ChevronRight,
  Clock,
  Layers
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const navigate = useNavigate();
  const { products } = useProducts();

  // Category filters
  const xboxProducts = products.filter(p => p.platform === 'Xbox').slice(0, 4);
  const playstationProducts = products.filter(p => p.platform === 'PlayStation').slice(0, 4);
  const pcProducts = products.filter(p => p.platform === 'PC' && p.category === 'games').slice(0, 4);
  const mobileTopUps = products.filter(p => p.category === 'top-ups').slice(0, 8);
  const giftCards = products.filter(p => p.category === 'gift-cards').slice(0, 4);
  const subscriptions = products.filter(p => p.category === 'subscriptions').slice(0, 4);

  // Curated sections
  const flashDeals = products.filter(p => p.isFlashDeal).slice(0, 4);
  const topSales = products.filter(p => (p.soldCount || 0) >= 1500).slice(0, 4);
  const newTrending = products.filter(p => p.isTrending).slice(0, 4);
  const topRated = products.filter(p => p.isTopRated || p.rating >= 4.9).slice(0, 4);
  const comingSoon = products.filter(p => p.isComingSoon || p.stock === 0).slice(0, 2);

  const heroFeatured = products.find(p => p.id === 'pubg-mobile-uc') || products[0];

  return (
    <div className="space-y-4">
      {/* Hero / Featured Banner */}
      <section className="relative overflow-hidden pt-6 pb-12">
        {/* Subtle Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-slate-900/90 via-[#070d1e] to-slate-900/90 border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                #1 Trusted Gaming Shop in Kurdistan & Iraq
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Level Up Your Game with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                  Instant Digital Keys
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Official PC & Console games, mobile top-ups (UC, Diamonds, V-Bucks), Steam gift cards, and subscriptions. Pay manually with FastPay, Korek, or MasterCard in IQD.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/products"
                  className="px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-950/60 transition-all active:scale-95 flex items-center gap-2"
                >
                  <Gamepad2 className="w-4 h-4" />
                  Explore Catalog
                </Link>
                <Link
                  to="/products?category=top-ups"
                  className="px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-slate-200 transition-colors flex items-center gap-2"
                >
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  Mobile Top-Ups
                </Link>
              </div>

              {/* Quick Trust Pillars */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-slate-400">
                <div>
                  <div className="text-white font-extrabold text-sm sm:text-base">5,000+</div>
                  <div className="text-[11px] text-slate-400">Orders Delivered</div>
                </div>
                <div>
                  <div className="text-cyan-400 font-extrabold text-sm sm:text-base">IQD Currency</div>
                  <div className="text-[11px] text-slate-400">Zero hidden fees</div>
                </div>
                <div>
                  <div className="text-emerald-400 font-extrabold text-sm sm:text-base">Instant</div>
                  <div className="text-[11px] text-slate-400">24/7 Fast support</div>
                </div>
              </div>
            </div>

            {/* Featured Product Preview on Hero */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm">
                <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Flame className="w-4 h-4 fill-current text-rose-500" /> Hot Pick of the Week
                  </span>
                  <span>Instant Player ID</span>
                </div>
                {heroFeatured && <ProductCard product={heroFeatured} />}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { title: 'PC Games', desc: 'Steam & Epic Keys', icon: Gamepad2, link: '/products?platform=PC', color: 'from-blue-600/20 to-cyan-600/10' },
              { title: 'PlayStation', desc: 'PSN & Games', icon: Gamepad2, link: '/products?platform=PlayStation', color: 'from-blue-700/20 to-indigo-600/10' },
              { title: 'Xbox Store', desc: 'Games & Passes', icon: Gamepad2, link: '/products?platform=Xbox', color: 'from-emerald-600/20 to-teal-600/10' },
              { title: 'Mobile Top-Up', desc: 'UC, Diamonds, CP', icon: Smartphone, link: '/products?category=top-ups', color: 'from-cyan-600/20 to-blue-600/10' },
              { title: 'Gift Cards', desc: 'Prepaid Vouchers', icon: CreditCard, link: '/products?category=gift-cards', color: 'from-purple-600/20 to-pink-600/10' },
              { title: 'Subscriptions', desc: 'Nitro, Premium, OTT', icon: Sparkles, link: '/products?category=subscriptions', color: 'from-fuchsia-600/20 to-purple-600/10' },
            ].map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={idx}
                  to={cat.link}
                  className={`p-4 rounded-2xl bg-gradient-to-b ${cat.color} bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-900 transition-all group flex flex-col justify-between`}
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">{cat.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      {comingSoon.length > 0 && (
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-purple-950/40 via-indigo-950/20 to-slate-950 border border-purple-800/40 rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    <Clock className="w-3 h-3" /> Upcoming Blockbusters
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-1">Coming Soon to Dano Store</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Pre-order reservations and upcoming releases.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {comingSoon.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Top Sales Section */}
      <ProductSection
        badge="Best Sellers"
        title="Top Sales in Kurdistan & Iraq"
        subtitle="The most frequently purchased games and top-up packages right now."
        products={topSales}
        viewAllLink="/products?sort=popular"
      />

      {/* Flash Deals Section */}
      <div className="bg-gradient-to-b from-rose-950/10 via-transparent to-transparent">
        <ProductSection
          badge="Limited Time"
          title="⚡ Flash Deals & Exclusive Discounts"
          subtitle="Special markdown prices in IQD. Don't miss out on these temporary discounts!"
          products={flashDeals}
          viewAllLink="/products"
        />
      </div>

      {/* New & Trending */}
      <ProductSection
        badge="Popular Now"
        title="🔥 New & Trending"
        subtitle="Player favorites taking over the community this month."
        products={newTrending}
        viewAllLink="/products"
      />

      {/* Top Rated */}
      <ProductSection
        badge="Player Endorsed"
        title="⭐ Top Rated Games & Services"
        subtitle="Highest customer satisfaction ratings across Kurdistan."
        products={topRated}
        viewAllLink="/products?sort=rating"
      />

      {/* Dedicated Platform Sections */}
      {/* Xbox Section */}
      <ProductSection
        badge="Microsoft"
        title="Xbox Gaming"
        subtitle="Xbox Series X|S & Xbox One digital keys and gift cards."
        products={xboxProducts}
        viewAllLink="/products?platform=Xbox"
      />

      {/* PlayStation Section */}
      <ProductSection
        badge="Sony Interactive"
        title="PlayStation Network"
        subtitle="PS4 and PS5 game codes and official PSN wallet vouchers."
        products={playstationProducts}
        viewAllLink="/products?platform=PlayStation"
      />

      {/* PC Gaming Section */}
      <ProductSection
        badge="PC & Steam"
        title="PC Gaming Keys"
        subtitle="Official Steam, Epic Games, and Rockstar digital editions."
        products={pcProducts}
        viewAllLink="/products?platform=PC"
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        badge="Direct ID Top-Up"
        title="Mobile Gaming Top-Ups"
        subtitle="Instant recharge for PUBG Mobile UC, Free Fire Diamonds, COD Mobile CP, and more."
        products={mobileTopUps}
        viewAllLink="/products?category=top-ups"
      />

      {/* Gift Cards Section */}
      <ProductSection
        badge="Digital Vouchers"
        title="Gift Cards & Prepaid Codes"
        subtitle="Steam Wallet, PlayStation, Google Play, Apple iTunes, and Razer Gold."
        products={giftCards}
        viewAllLink="/products?category=gift-cards"
      />

      {/* Subscriptions Section */}
      <ProductSection
        badge="Premium Access"
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix Ultra HD, Spotify, and creative tools."
        products={subscriptions}
        viewAllLink="/products?category=subscriptions"
      />
    </div>
  );
}
