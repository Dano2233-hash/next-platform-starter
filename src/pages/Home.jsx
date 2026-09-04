import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flame,
  Zap,
  Star,
  Gamepad2,
  Smartphone,
  CreditCard,
  Tv,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Clock,
  TrendingUp,
  Award
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { ProductSection } from '../components/ProductSection';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const { products } = useProducts();
  const navigate = useNavigate();

  // Category & Section Filtering
  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
  const topRatedProducts = products.filter((p) => p.isTopRated).slice(0, 4);

  const xboxGames = products.filter((p) => p.platform === 'Xbox').slice(0, 4);
  const playstationGames = products.filter((p) => p.platform === 'PlayStation').slice(0, 4);
  const pcGames = products.filter((p) => p.platform === 'PC' && p.category === 'paid-games').slice(0, 4);
  const mobileTopups = products.filter((p) => p.category === 'mobile-topup').slice(0, 4);
  const giftCards = products.filter((p) => p.category === 'gift-cards').slice(0, 4);
  const subscriptions = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Premium Digital Store Kurdistan & Iraq
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Level Up Your Gaming Experience with <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Instant Top-Ups</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Buy official PUBG UC, Free Fire Diamonds, Steam Wallet, PlayStation Gift Cards, Spotify, Netflix, and top PC games with instant manual Iraqi transfers.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/products')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/25 hover:scale-105 transition-transform flex items-center gap-2"
              >
                <span>Explore All Store</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/products?category=mobile-topup"
                className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-cyan-500/50 text-sm font-bold transition-all"
              >
                Mobile Top-Ups
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Legal Services</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Instant Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-cyan-400" />
                <span>4.9 Star Customer Rating</span>
              </div>
            </div>
          </div>

          {/* Hero Featured Card Highlight */}
          <div className="relative">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
                  Featured Digital Offer
                </span>
                <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" /> Top Choice
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-white text-xl flex-shrink-0">
                  UC
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">PUBG Mobile UC Top-Up</h3>
                  <p className="text-xs text-slate-400">Instant Player ID recharge in Kurdistan & Iraq</p>
                  <span className="text-sm font-black text-cyan-400 mt-1 block">From 1,500 IQD</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/60">
                  <span className="block text-cyan-400 font-bold">FastPay</span>
                  <span className="text-[10px] text-slate-400">Supported</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/60">
                  <span className="block text-amber-400 font-bold">Korek</span>
                  <span className="text-[10px] text-slate-400">Supported</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/60">
                  <span className="block text-blue-400 font-bold">MasterCard</span>
                  <span className="text-[10px] text-slate-400">Supported</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section>
        <h2 className="text-lg font-bold text-slate-200 mb-4 border-l-2 border-cyan-500 pl-3">
          Explore Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/products?category=mobile-topup"
            className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm group-hover:text-cyan-300">Mobile Top-Ups</h3>
              <p className="text-[11px] text-slate-400">PUBG, Free Fire, MLBB</p>
            </div>
          </Link>

          <Link
            to="/products?category=paid-games"
            className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition-all flex items-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm group-hover:text-purple-300">PC & Console</h3>
              <p className="text-[11px] text-slate-400">GTA V, Elden Ring, RDR2</p>
            </div>
          </Link>

          <Link
            to="/products?category=gift-cards"
            className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all flex items-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm group-hover:text-emerald-300">Gift Cards</h3>
              <p className="text-[11px] text-slate-400">Steam, PSN, Xbox, Apple</p>
            </div>
          </Link>

          <Link
            to="/products?category=subscriptions"
            className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-rose-500/50 transition-all flex items-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
              <Tv className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm group-hover:text-rose-300">Subscriptions</h3>
              <p className="text-[11px] text-slate-400">Discord Nitro, YouTube</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Coming Soon Announcement Banner */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest rounded bg-purple-500/30 text-purple-200 border border-purple-400/30">
              Coming Soon
            </span>
            <h3 className="text-lg font-black text-white mt-1">
              Black Ops 6 & FC 25 Digital Keys Pre-Orders
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Instant activation keys for Steam & Xbox will be available soon with special local discount packages!
            </p>
          </div>
        </div>
        <Link
          to="/products"
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs whitespace-nowrap shadow-md"
        >
          View Store Catalog
        </Link>
      </section>

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Most purchased digital games and top-ups this month"
        icon={Flame}
        badge="Hot"
        products={products.slice(0, 4)}
        viewAllPath="/products"
      />

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited-time discounts on top games and subscriptions"
        icon={Zap}
        badge="Discount"
        products={flashDeals}
        viewAllPath="/products"
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="Latest game additions and popular gaming gift cards"
        icon={TrendingUp}
        badge="Trending"
        products={trendingProducts}
        viewAllPath="/products"
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated"
        subtitle="Highly rated digital services backed by player feedback"
        icon={Award}
        badge="5.0 Stars"
        products={topRatedProducts}
        viewAllPath="/products"
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Game Top-Ups"
        subtitle="PUBG Mobile UC, Free Fire Diamonds, MLBB, COD Mobile"
        icon={Smartphone}
        products={mobileTopups}
        viewAllPath="/products?category=mobile-topup"
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Catalog"
        subtitle="Official Steam activation keys for GTA V, RDR2, Elden Ring, and more"
        icon={Gamepad2}
        products={pcGames}
        viewAllPath="/products?platform=PC"
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Section"
        subtitle="Tekken 8, PSN Gift Cards, and PlayStation Store subscriptions"
        icon={Gamepad2}
        products={playstationGames}
        viewAllPath="/products?platform=PlayStation"
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Section"
        subtitle="Forza Horizon 5, Xbox Gift Cards, and Game Pass Ultimate"
        icon={Gamepad2}
        products={xboxGames}
        viewAllPath="/products?platform=Xbox"
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards Section"
        subtitle="Steam Wallet, iTunes, Google Play, Razer Gold, Amazon"
        icon={CreditCard}
        products={giftCards}
        viewAllPath="/products?category=gift-cards"
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Subscriptions Section"
        subtitle="Discord Nitro, YouTube Premium, Netflix 4K, Canva Pro"
        icon={Tv}
        products={subscriptions}
        viewAllPath="/products?category=subscriptions"
      />
    </div>
  );
};
