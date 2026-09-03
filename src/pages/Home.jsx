import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Zap,
  TrendingUp,
  Star,
  Gamepad2,
  Tv,
  Monitor,
  Smartphone,
  Gift,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { ProductSection } from '../components/ProductSection';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const { products } = useProducts();

  // Filter sections data
  const featuredProducts = products.filter((p) => p.isFeatured);
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const trendingProducts = products.filter((p) => p.isTrending);
  const topRatedProducts = products.filter((p) => p.isTopRated);

  const xboxProducts = products.filter((p) => p.platform === 'Xbox');
  const playstationProducts = products.filter((p) => p.platform === 'PlayStation');
  const pcProducts = products.filter((p) => p.platform === 'PC');
  const mobileTopUps = products.filter((p) => p.platform === 'Mobile');
  const giftCards = products.filter((p) => p.category === 'Gift Card');
  const subscriptions = products.filter((p) => p.category === 'Subscription');

  // Hero primary product
  const heroProduct = products.find((p) => p.id === 'pubg-mobile-uc') || products[0];

  return (
    <div className="space-y-12 pb-16">

      {/* Hero / Featured Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#080d21] via-[#0c1636] to-[#120a2a] border-b border-slate-800/80 rounded-b-3xl py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,229,255,0.12),transparent_60%)]" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              #1 Digital Gaming Store in Kurdistan & Iraq
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Instant Game <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Top-Ups & Keys
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Get official PUBG UC, Free Fire Diamonds, Steam Wallet, PlayStation Codes, and Steam Games with instant local delivery via FastPay, Korek, and MasterCard.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/products"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm tracking-wider uppercase shadow-xl shadow-cyan-950/50 flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Browse All Store
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products?category=Top-Up"
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-slate-700/80 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                Mobile Top-Ups
              </Link>
            </div>

            {/* Quick Badges */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-semibold">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-purple-400" />
                <span>Local Iraq Payments</span>
              </div>
            </div>
          </div>

          {/* Right Hero Feature Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            {heroProduct && (
              <div className="w-full max-w-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-rose-500 animate-bounce" />
                  Featured Deal Today
                </div>
                <ProductCard product={heroProduct} />
              </div>
            )}
          </div>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Category Quick Row */}
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <Link
            to="/products?category=Top-Up"
            className="p-4 rounded-2xl bg-gradient-to-b from-[#0b1226] to-[#080d1c] border border-slate-800 hover:border-cyan-500/50 flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-800/50 text-cyan-400 mb-2 group-hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs text-slate-200 group-hover:text-cyan-400">Mobile Top-Ups</span>
            <span className="text-[10px] text-slate-500 mt-0.5">UC, Diamonds & CP</span>
          </Link>

          <Link
            to="/products?category=Game"
            className="p-4 rounded-2xl bg-gradient-to-b from-[#0b1226] to-[#080d1c] border border-slate-800 hover:border-blue-500/50 flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-3 rounded-xl bg-blue-950/80 border border-blue-800/50 text-blue-400 mb-2 group-hover:scale-110 transition-transform">
              <Monitor className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs text-slate-200 group-hover:text-blue-400">Paid Games</span>
            <span className="text-[10px] text-slate-500 mt-0.5">Steam PC Keys</span>
          </Link>

          <Link
            to="/products?category=Gift Card"
            className="p-4 rounded-2xl bg-gradient-to-b from-[#0b1226] to-[#080d1c] border border-slate-800 hover:border-amber-500/50 flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-3 rounded-xl bg-amber-950/80 border border-amber-800/50 text-amber-400 mb-2 group-hover:scale-110 transition-transform">
              <Gift className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs text-slate-200 group-hover:text-amber-400">Gift Cards</span>
            <span className="text-[10px] text-slate-500 mt-0.5">Steam, PSN, Xbox</span>
          </Link>

          <Link
            to="/products?category=Subscription"
            className="p-4 rounded-2xl bg-gradient-to-b from-[#0b1226] to-[#080d1c] border border-slate-800 hover:border-purple-500/50 flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-3 rounded-xl bg-purple-950/80 border border-purple-800/50 text-purple-400 mb-2 group-hover:scale-110 transition-transform">
              <Tv className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs text-slate-200 group-hover:text-purple-400">Subscriptions</span>
            <span className="text-[10px] text-slate-500 mt-0.5">Nitro, Netflix, YT</span>
          </Link>

          <Link
            to="/products?platform=PlayStation"
            className="p-4 rounded-2xl bg-gradient-to-b from-[#0b1226] to-[#080d1c] border border-slate-800 hover:border-indigo-500/50 flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-1 col-span-2 sm:col-span-1"
          >
            <div className="p-3 rounded-xl bg-indigo-950/80 border border-indigo-800/50 text-indigo-400 mb-2 group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs text-slate-200 group-hover:text-indigo-400">PlayStation</span>
            <span className="text-[10px] text-slate-500 mt-0.5">Codes & Plus</span>
          </Link>
        </section>

        {/* Coming Soon Section */}
        <section className="bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-blue-950/40 border border-purple-800/40 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-purple-900/60 text-purple-300">
                <Clock className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-purple-400 tracking-wider">UPCOMING RELEASES</span>
                <h3 className="text-lg font-extrabold text-white">GTA VI & Monster Hunter Wilds Coming Soon!</h3>
                <p className="text-xs text-slate-400">Pre-order registrations will open soon for Kurdistan gamers.</p>
              </div>
            </div>
            <Link
              to="/products"
              className="px-4 py-2 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-200 text-xs font-bold border border-purple-700/60 whitespace-nowrap"
            >
              Get Notified
            </Link>
          </div>
        </section>

        {/* Flash Deals Section */}
        <ProductSection
          title="Flash Deals"
          subtitle="Limited time discounted prices on top items"
          icon={Zap}
          badge="LIMITED TIME"
          viewAllLink="/products?filter=flash"
          products={flashDeals.slice(0, 4)}
        />

        {/* Top Sales Section */}
        <ProductSection
          title="Top Sales"
          subtitle="Most purchased game top-ups and gift cards"
          icon={Flame}
          viewAllLink="/products?sort=sales"
          products={featuredProducts.slice(0, 4)}
        />

        {/* New & Trending Section */}
        <ProductSection
          title="New & Trending"
          subtitle="Popular games and memberships trending in Iraq"
          icon={TrendingUp}
          viewAllLink="/products?filter=trending"
          products={trendingProducts.slice(0, 4)}
        />

        {/* Top Rated Section */}
        <ProductSection
          title="Top Rated"
          subtitle="Highest rated products by our Kurdistan customers"
          icon={Star}
          viewAllLink="/products?filter=toprated"
          products={topRatedProducts.slice(0, 4)}
        />

        {/* Mobile Top-Ups Section */}
        <ProductSection
          title="Mobile Top-Ups"
          subtitle="Instant player ID recharge for PUBG, Free Fire, Valorant, & Robux"
          icon={Smartphone}
          viewAllLink="/products?category=Top-Up"
          products={mobileTopUps.slice(0, 4)}
        />

        {/* PC Gaming Section */}
        <ProductSection
          title="PC Gaming Keys"
          subtitle="Steam keys for GTA V, Elden Ring, Red Dead Redemption 2 & more"
          icon={Monitor}
          viewAllLink="/products?platform=PC"
          products={pcProducts.slice(0, 4)}
        />

        {/* PlayStation Section */}
        <ProductSection
          title="PlayStation Network"
          subtitle="PSN gift cards, PS Plus subscriptions, and codes"
          icon={Gamepad2}
          viewAllLink="/products?platform=PlayStation"
          products={playstationProducts.slice(0, 4)}
        />

        {/* Xbox Section */}
        <ProductSection
          title="Xbox Store"
          subtitle="Xbox gift cards and Game Pass Ultimate memberships"
          icon={Gamepad2}
          viewAllLink="/products?platform=Xbox"
          products={xboxProducts.slice(0, 4)}
        />

        {/* Gift Cards Section */}
        <ProductSection
          title="Digital Gift Cards"
          subtitle="Steam, Apple, Google Play, Razer Gold & Amazon"
          icon={Gift}
          viewAllLink="/products?category=Gift Card"
          products={giftCards.slice(0, 4)}
        />

        {/* Subscriptions Section */}
        <ProductSection
          title="Digital Subscriptions"
          subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify & Canva Pro"
          icon={Tv}
          viewAllLink="/products?category=Subscription"
          products={subscriptions.slice(0, 4)}
        />

      </div>
    </div>
  );
};
