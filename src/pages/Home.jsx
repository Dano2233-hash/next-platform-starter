import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flame,
  Zap,
  TrendingUp,
  Star,
  Clock,
  Gamepad2,
  Tv,
  Gift,
  Smartphone,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import ProductSection from '../components/ProductSection';
import CategoryTabs from '../components/CategoryTabs';
import { useProducts } from '../hooks/useProducts';

export default function Home() {
  const navigate = useNavigate();
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (catId !== 'all') {
      navigate(`/products?category=${catId}`);
    } else {
      navigate('/products');
    }
  };

  // Section Filters
  const topSales = products.filter((p) => p.soldCount > 1500).slice(0, 4);
  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const trending = products.filter((p) => p.isTrending).slice(0, 4);
  const topRated = products.filter((p) => p.isTopRated || p.rating >= 4.9).slice(0, 4);

  const xboxProducts = products.filter((p) => p.platform === 'Xbox').slice(0, 4);
  const psProducts = products.filter((p) => p.platform === 'PlayStation').slice(0, 4);
  const pcProducts = products.filter((p) => p.platform === 'PC').slice(0, 4);
  const mobileProducts = products.filter((p) => p.category === 'mobile-topups' || p.platform === 'Mobile').slice(0, 4);
  const giftCards = products.filter((p) => p.category === 'gift-cards').slice(0, 4);
  const subscriptions = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  return (
    <div className="space-y-12">
      {/* Hero / Featured Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800/80 p-6 sm:p-10 md:p-14 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>KURDISTAN & IRAQ #1 DIGITAL GAMING STORE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              Instant Top-Ups, Game Codes & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Subscriptions</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Get instant PUBG Mobile UC, Free Fire Diamonds, Steam Wallet, PlayStation Gift Cards, Discord Nitro & PC Games. Safe manual transfers via FastPay, Korek, and MasterCard.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/products"
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm shadow-xl shadow-cyan-950/50 flex items-center gap-2 transition-all active:scale-95"
              >
                <span>Browse Full Catalog</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products?category=mobile-topups"
                className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-700/80 transition-all"
              >
                Mobile Top-Ups
              </Link>
            </div>

            {/* Quick Stats Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Instant Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-4 h-4 text-purple-400 shrink-0" />
                <span>100% Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Local Payments</span>
              </div>
            </div>
          </div>

          {/* Banner Graphic Card */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-6 border border-slate-800 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Featured Deal
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-black border border-emerald-500/30">
                  INSTANT CODE
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white font-black text-2xl shadow-lg">
                  PUBG
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-100">PUBG Mobile Unknown Cash</h3>
                  <p className="text-xs text-slate-400 mt-1">Instant Direct Top-Up via Player ID</p>
                  <span className="text-sm font-extrabold text-cyan-400 mt-2 block">
                    Starting from 1,500 IQD
                  </span>
                </div>
              </div>
              <Link
                to="/products/pubg-mobile-uc"
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs text-center block transition-colors"
              >
                Top Up Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Browse Categories
        </h3>
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      </section>

      {/* Coming Soon Banner */}
      <section className="rounded-2xl bg-gradient-to-r from-purple-900/40 via-slate-900 to-blue-900/40 border border-purple-500/30 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="text-slate-100 font-extrabold text-sm sm:text-base">
              Coming Soon: GTA VI Pre-Orders & EA SPORTS FC 25 Points
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Stay tuned! New game passes and upcoming blockbuster titles will be available for Iraqi gamers soon.
            </p>
          </div>
        </div>
        <span className="px-4 py-2 rounded-xl bg-purple-600/30 text-purple-300 font-bold text-xs border border-purple-500/40 whitespace-nowrap">
          Get Ready
        </span>
      </section>

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Most purchased items by gamers in Erbil, Sulaymaniyah, and Baghdad"
        icon={Flame}
        viewAllLink="/products"
        products={topSales}
      />

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on gaming keys and mobile recharges"
        icon={Zap}
        viewAllLink="/products"
        products={flashDeals}
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="Hot releases and popular gaming items this week"
        icon={TrendingUp}
        viewAllLink="/products"
        products={trending}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated"
        subtitle="Highest customer satisfaction game keys and gift cards"
        icon={Star}
        viewAllLink="/products"
        products={topRated}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Gaming"
        subtitle="Xbox Series X|S games, gift cards, and Game Pass"
        icon={Gamepad2}
        viewAllLink="/products?platform=Xbox"
        products={xboxProducts}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Network"
        subtitle="PS4/PS5 hit titles and PSN store gift vouchers"
        icon={Gamepad2}
        viewAllLink="/products?platform=PlayStation"
        products={psProducts}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming"
        subtitle="Official Steam keys, AAA blockbusters, and PC titles"
        icon={Gamepad2}
        viewAllLink="/products?platform=PC"
        products={pcProducts}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="UC, Diamonds, VP, CP, and Robux delivered fast"
        icon={Smartphone}
        viewAllLink="/products?category=mobile-topups"
        products={mobileProducts}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards"
        subtitle="Steam, PSN, Xbox, Google Play, Apple, and Razer Gold"
        icon={Gift}
        viewAllLink="/products?category=gift-cards"
        products={giftCards}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, and Spotify"
        icon={Tv}
        viewAllLink="/products?category=subscriptions"
        products={subscriptions}
      />
    </div>
  );
}
