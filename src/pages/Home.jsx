import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Flame,
  Clock,
  Zap,
  Gamepad2,
  Smartphone,
  CreditCard,
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle,
  TrendingUp,
  Tag
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { CATEGORIES } from '../data/categories';
import ProductSection from '../components/ProductSection';
import CategoryTabs from '../components/CategoryTabs';
import { formatPrice } from '../utils/formatPrice';

export default function Home() {
  const { products } = useProducts();
  const navigate = useNavigate();

  // Filter products for various sections
  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 5);
  const topSales = [...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, 5);
  const trending = products.filter((p) => p.isTrending).slice(0, 5);
  const topRated = products.filter((p) => p.isTopRated).slice(0, 5);

  // Platform sections
  const xboxProducts = products.filter((p) => p.platform === 'Xbox').slice(0, 5);
  const playStationProducts = products.filter((p) => p.platform === 'PlayStation').slice(0, 5);
  const pcProducts = products.filter((p) => p.platform === 'PC' && p.category === 'games').slice(0, 5);
  const mobileTopUps = products.filter((p) => p.category === 'mobile-topups').slice(0, 5);
  const giftCards = products.filter((p) => p.category === 'gift-cards').slice(0, 5);
  const subscriptions = products.filter((p) => p.category === 'subscriptions').slice(0, 5);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a1226] via-[#0d1633] to-[#080d1a] border border-slate-800 p-6 sm:p-10 lg:p-14 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Official Digital Gaming Hub • Kurdistan & Iraq</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Level Up Your Game with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Instant Digital</span> Top-Ups.
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Get PUBG UC, Free Fire Diamonds, Fortnite V-Bucks, Valorant Points, paid Steam games, and digital gift cards delivered immediately with manual local payment via <strong className="text-white">FastPay</strong>, <strong className="text-white">Korek</strong>, and <strong className="text-white">MasterCard</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-sm shadow-xl shadow-cyan-950/50 flex items-center gap-2 transition-all active:scale-95"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/products?category=mobile-topups')}
              className="px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-sm border border-slate-700/80 flex items-center gap-2 transition-all"
            >
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span>Mobile Reloads</span>
            </button>
          </div>

          {/* Quick trust metrics */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 max-w-lg">
            <div>
              <span className="text-lg sm:text-xl font-black text-white">40,000+</span>
              <span className="text-[11px] text-slate-400 block font-medium">Orders Delivered</span>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-black text-cyan-400">3 - 10 Min</span>
              <span className="text-[11px] text-slate-400 block font-medium">Average Delivery</span>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-black text-indigo-400">100% Legal</span>
              <span className="text-[11px] text-slate-400 block font-medium">Official Codes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Tag className="w-4 h-4 text-cyan-400" />
            <span>Browse Categories</span>
          </h2>
          <Link to="/products" className="text-xs font-semibold text-cyan-400 hover:underline">
            View Catalog
          </Link>
        </div>
        <CategoryTabs
          categories={CATEGORIES}
          selectedCategory="all"
          onSelectCategory={(id) => {
            if (id === 'all') navigate('/products');
            else navigate(`/products?category=${id}`);
          }}
        />
      </section>

      {/* Coming Soon Featured Banner */}
      <section className="rounded-xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/60 border border-purple-500/30 p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-900/40 text-purple-300 border border-purple-500/30">
            <Clock className="w-6 h-6 animate-spin" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Coming Soon
              </span>
              <h3 className="font-extrabold text-white text-base">GTA VI & Monster Hunter Wilds Pre-Orders</h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Be the first in Kurdistan to secure verified digital keys and launch day pre-load access at exclusive local rates.
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/products?category=games')}
          className="whitespace-nowrap px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors self-start md:self-auto"
        >
          View Upcoming Titles
        </button>
      </section>

      {/* Flash Deals */}
      <ProductSection
        title="Flash Deals"
        subtitle="Time-limited discounts on best-selling digital items and keys"
        products={flashDeals}
        linkUrl="/products"
        icon={Zap}
      />

      {/* Top Sales */}
      <ProductSection
        title="Top Sales"
        subtitle="The most ordered games and top-up packages across Iraq"
        products={topSales}
        linkUrl="/products"
        icon={Flame}
      />

      {/* New & Trending */}
      <ProductSection
        title="New & Trending"
        subtitle="What local gamers are actively buying this week"
        products={trending}
        linkUrl="/products"
        icon={TrendingUp}
      />

      {/* Top Rated */}
      <ProductSection
        title="Top Rated"
        subtitle="Highest customer satisfaction with guaranteed instant delivery"
        products={topRated}
        linkUrl="/products"
        icon={Star}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="PUBG Mobile UC, Free Fire Diamonds, MLBB, Robux & more"
        products={mobileTopUps}
        linkUrl="/products?category=mobile-topups"
        icon={Smartphone}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming"
        subtitle="Steam keys for top paid games like GTA V, RDR2, Elden Ring, and Wukong"
        products={pcProducts}
        linkUrl="/products?platform=PC"
        icon={Gamepad2}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation"
        subtitle="PSN Gift Cards and top PlayStation digital titles"
        products={playStationProducts}
        linkUrl="/products?platform=PlayStation"
        icon={Gamepad2}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox"
        subtitle="Xbox gift cards, Forza Horizon 5, and digital store keys"
        products={xboxProducts}
        linkUrl="/products?platform=Xbox"
        icon={Gamepad2}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Digital Gift Cards"
        subtitle="Steam Wallet, PlayStation, Apple, Google Play, Razer Gold & Amazon"
        products={giftCards}
        linkUrl="/products?category=gift-cards"
        icon={CreditCard}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify & Canva Pro"
        products={subscriptions}
        linkUrl="/products?category=subscriptions"
        icon={Zap}
      />
    </div>
  );
}
