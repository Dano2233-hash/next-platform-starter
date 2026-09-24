import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';
import {
  Zap,
  Flame,
  Star,
  Sparkles,
  TrendingUp,
  Clock,
  Gamepad2,
  Smartphone,
  Monitor,
  Box,
  Tv,
  Gift,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { products } = useProducts();

  // Filter sections
  const topSales = products.slice(0, 4);
  const flashDeals = products.filter((p) => p.isFlashDeal || (p.oldPrice && p.oldPrice > p.price)).slice(0, 4);
  const newAndTrending = products.filter((p) => p.isTrending).slice(0, 4);
  const topRated = products.filter((p) => p.isTopRated || p.rating >= 4.8).slice(0, 4);

  const xboxProducts = products.filter((p) => p.platform === 'Xbox' || p.category === 'xbox').slice(0, 4);
  const psProducts = products.filter((p) => p.platform === 'PlayStation' || p.category === 'playstation').slice(0, 4);
  const pcProducts = products.filter((p) => p.platform === 'PC' || p.category === 'pc').slice(0, 4);
  const mobileProducts = products.filter((p) => p.platform === 'Mobile' || p.category === 'mobile').slice(0, 4);
  const giftCardProducts = products.filter((p) => p.platform === 'Gift Card' || p.category === 'gift-cards').slice(0, 4);
  const subscriptionProducts = products.filter((p) => p.type === 'Subscription' || p.category === 'subscriptions').slice(0, 4);

  const heroFeatured = products.find((p) => p.id === 'black-myth-wukong') || products[0];

  return (
    <div className="space-y-12">
      {/* Hero / Featured Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0a0e24] via-[#0d1538] to-[#120e2e] border border-slate-800/80 p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-extrabold tracking-wide uppercase">
              <Zap className="w-3.5 h-3.5" /> Instant Delivery Gaming Hub
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              Kurdistan & Iraq's Premier <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Digital Gaming Store</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Buy official PC Steam Games, PUBG UC, Free Fire Diamonds, PlayStation & Xbox Gift Cards, Discord Nitro, and subscriptions with instant local payment via FastPay, Korek, and MasterCard.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => navigate('/products')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
              >
                <span>Browse Store Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/products?category=mobile')}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm transition-all"
              >
                Mobile Top-Ups
              </button>
            </div>

            {/* Quick stats badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              <div>
                <span className="block font-black text-white text-base">100% Legal</span>
                <span>Official Digital Codes</span>
              </div>
              <div>
                <span className="block font-black text-cyan-400 text-base">Instant</span>
                <span>WhatsApp & Auto Delivery</span>
              </div>
              <div>
                <span className="block font-black text-purple-400 text-base">3 Methods</span>
                <span>FastPay, Korek, MasterCard</span>
              </div>
            </div>
          </div>

          {/* Featured Game Spotlight Card */}
          {heroFeatured && (
            <div className="lg:col-span-5">
              <div className="bg-[#0c1021] border border-cyan-500/30 rounded-2xl p-4 shadow-xl relative group">
                <div className="absolute top-6 left-6 z-10">
                  <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md">
                    Featured Spotlight
                  </span>
                </div>
                <div className="overflow-hidden rounded-xl h-56 mb-4">
                  {heroFeatured.image ? (
                    <img
                      src={heroFeatured.image}
                      alt={heroFeatured.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-cyan-400 font-bold">
                      {heroFeatured.name}
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{heroFeatured.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-3">{heroFeatured.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Starting from</span>
                    <span className="text-lg font-black text-cyan-400">{heroFeatured.price.toLocaleString()} IQD</span>
                  </div>
                  <button
                    onClick={() => navigate(`/product/${heroFeatured.id}`)}
                    className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Category Row */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-white">Explore Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <Link
            to="/products?category=mobile"
            className="p-4 rounded-2xl bg-[#0c1021] border border-[#1a223e] hover:border-cyan-500/50 hover:bg-slate-900 transition-all flex flex-col items-center text-center gap-2 group"
          >
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-200">Mobile Top-Ups</span>
          </Link>

          <Link
            to="/products?category=pc"
            className="p-4 rounded-2xl bg-[#0c1021] border border-[#1a223e] hover:border-blue-500/50 hover:bg-slate-900 transition-all flex flex-col items-center text-center gap-2 group"
          >
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
              <Monitor className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-200">PC Games</span>
          </Link>

          <Link
            to="/products?category=xbox"
            className="p-4 rounded-2xl bg-[#0c1021] border border-[#1a223e] hover:border-emerald-500/50 hover:bg-slate-900 transition-all flex flex-col items-center text-center gap-2 group"
          >
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <Box className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-200">Xbox Store</span>
          </Link>

          <Link
            to="/products?category=playstation"
            className="p-4 rounded-2xl bg-[#0c1021] border border-[#1a223e] hover:border-blue-600/50 hover:bg-slate-900 transition-all flex flex-col items-center text-center gap-2 group"
          >
            <div className="p-3 rounded-xl bg-blue-600/10 text-blue-500 group-hover:scale-110 transition-transform">
              <Tv className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-200">PlayStation</span>
          </Link>

          <Link
            to="/products?category=gift-cards"
            className="p-4 rounded-2xl bg-[#0c1021] border border-[#1a223e] hover:border-amber-500/50 hover:bg-slate-900 transition-all flex flex-col items-center text-center gap-2 group"
          >
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <Gift className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-200">Gift Cards</span>
          </Link>

          <Link
            to="/products?category=subscriptions"
            className="p-4 rounded-2xl bg-[#0c1021] border border-[#1a223e] hover:border-purple-500/50 hover:bg-slate-900 transition-all flex flex-col items-center text-center gap-2 group"
          >
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-200">Subscriptions</span>
          </Link>
        </div>
      </section>

      {/* Coming Soon Teaser Banner */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-blue-950/40 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-white text-base">Coming Soon to Dano Store</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              GTA 6 pre-orders, EA Sports FC 25 Coins, and direct FastPay automated balance top-ups!
            </p>
          </div>
        </div>
        <span className="px-4 py-1.5 rounded-full text-xs font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/40 shrink-0">
          Stay Tuned
        </span>
      </section>

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Most popular products in Kurdistan & Iraq right now"
        products={topSales}
        viewAllPath="/products"
        icon={Flame}
      />

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on top game keys & passes"
        products={flashDeals}
        viewAllPath="/products"
        icon={Zap}
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="Freshly added titles and trending mobile game points"
        products={newAndTrending}
        viewAllPath="/products"
        icon={TrendingUp}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated Games & Services"
        subtitle="5-Star rated digital products by verified players"
        products={topRated}
        viewAllPath="/products"
        icon={Star}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Store & Game Pass"
        subtitle="Digital console keys and Xbox store gift cards"
        products={xboxProducts}
        viewAllPath="/products?platform=Xbox"
        icon={Box}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Network"
        subtitle="PSN gift cards, US/UAE store wallet top-ups"
        products={psProducts}
        viewAllPath="/products?platform=PlayStation"
        icon={Tv}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Steam & Epic Games"
        subtitle="Original Steam keys, Elden Ring, GTA V, and Wukong"
        products={pcProducts}
        viewAllPath="/products?platform=PC"
        icon={Monitor}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups & Packages"
        subtitle="PUBG UC, Free Fire Diamonds, COD CP, Roblox Robux"
        products={mobileProducts}
        viewAllPath="/products?category=mobile"
        icon={Smartphone}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards & Wallet Codes"
        subtitle="Steam, PlayStation, Xbox, Apple, Google Play, Razer Gold"
        products={giftCardProducts}
        viewAllPath="/products?category=gift-cards"
        icon={Gift}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Subscriptions & Digital Pass"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Canva & CapCut Pro"
        products={subscriptionProducts}
        viewAllPath="/products?category=subscriptions"
        icon={Sparkles}
      />
    </div>
  );
}
