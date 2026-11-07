import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Flame,
  Award,
  Gamepad2,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Clock,
  CheckCircle,
  Smartphone,
  Gift,
  Tv,
  Monitor
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';

export function Home() {
  const { products } = useProducts();

  // Filter products by tags and sections
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const trendingProducts = products.filter((p) => p.isTrending);
  const topRated = products.filter((p) => p.isTopRated);
  const topSales = products.filter((p) => (p.soldCount || 0) > 2000);
  const comingSoon = products.filter((p) => p.isComingSoon || p.stock === 0);

  const pcGames = products.filter((p) => p.category === 'pc' || p.platform === 'PC');
  const xboxGames = products.filter((p) => p.category === 'xbox' || p.platform === 'Xbox');
  const playstationGames = products.filter((p) => p.category === 'playstation' || p.platform === 'PlayStation');
  const mobileTopUps = products.filter((p) => p.category === 'mobile' || p.platform === 'Mobile');
  const giftCards = products.filter((p) => p.category === 'gift-cards');
  const subscriptions = products.filter((p) => p.category === 'subscriptions');

  const heroFeatured = products.find((p) => p.slug === 'pubg-mobile-uc') || products[0];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero / Featured Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d1222] via-[#0f172a] to-[#131b34] border border-slate-800 shadow-2xl p-6 sm:p-10 lg:p-12 mt-4">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>#1 Digital Gaming Store in Kurdistan & Iraq</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Instant Game Keys, <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Top-Ups & Gift Cards
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              Charge PUBG UC, Free Fire Diamonds, Steam Wallets, and activate top PC/Console titles in minutes. Pay conveniently with local FastPay, Korek, and MasterCard.
            </p>

            {/* Quick feature highlights */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>100% Genuine</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>5-15 Min Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>IQD Currency</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/products"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/40"
              >
                Browse All Games & Top-Ups
              </Link>
              <Link
                to="/products?category=mobile"
                className="px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700 transition-colors"
              >
                Mobile Top-Ups
              </Link>
            </div>
          </div>

          {/* Hero Featured Card Spotlight */}
          {heroFeatured && (
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md">
                <div className="text-xs uppercase font-extrabold text-cyan-400 tracking-wider mb-2 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-rose-500 fill-rose-500" /> Featured Spotlight
                </div>
                <ProductCard product={heroFeatured} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Category Navigation Row */}
      <section className="py-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { name: 'Mobile Top-Up', slug: 'mobile', icon: Smartphone, color: 'hover:border-amber-500/50 text-amber-400' },
            { name: 'PC Games', slug: 'pc', icon: Monitor, color: 'hover:border-cyan-500/50 text-cyan-400' },
            { name: 'PlayStation', slug: 'playstation', icon: Tv, color: 'hover:border-blue-500/50 text-blue-400' },
            { name: 'Xbox Gaming', slug: 'xbox', icon: Gamepad2, color: 'hover:border-emerald-500/50 text-emerald-400' },
            { name: 'Gift Cards', slug: 'gift-cards', icon: Gift, color: 'hover:border-rose-500/50 text-rose-400' },
            { name: 'Subscriptions', slug: 'subscriptions', icon: Sparkles, color: 'hover:border-purple-500/50 text-purple-400' },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                to={`/products?category=${cat.slug}`}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl bg-[#0d1222] border border-slate-800 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg ${cat.color}`}
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-200 group-hover:text-white text-center">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Flash Deals Section */}
      <ProductSection
        title="⚡ Flash Deals"
        subtitle="Limited-time price cuts on best-selling game titles and top-ups"
        badge="Hot Savings"
        viewAllLink="/products"
        products={flashDeals}
        limit={4}
      />

      {/* Top Sales Section */}
      <ProductSection
        title="🔥 Top Sales"
        subtitle="The most popular digital products purchased by gamers in Kurdistan & Iraq"
        badge="Community Choice"
        viewAllLink="/products"
        products={topSales}
        limit={4}
      />

      {/* New & Trending Section */}
      <ProductSection
        title="🚀 New & Trending"
        subtitle="Trending in gaming right now — updated daily"
        badge="Trending"
        viewAllLink="/products"
        products={trendingProducts}
        limit={4}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="⭐ Top Rated"
        subtitle="Highest customer satisfaction ratings across all gaming genres"
        badge="5-Star Verified"
        viewAllLink="/products"
        products={topRated}
        limit={4}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="📱 Mobile Top-Ups"
        subtitle="Instant UC, Diamonds, Robux, and game points. Top-ups only — strictly legal"
        badge="Instant Delivery"
        viewAllLink="/products?category=mobile"
        products={mobileTopUps}
        limit={4}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="💻 PC Gaming Keys"
        subtitle="Official Steam, Rockstar, and Ubisoft digital activation keys"
        badge="Official PC"
        viewAllLink="/products?category=pc"
        products={pcGames}
        limit={4}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="🎮 PlayStation Games & Cards"
        subtitle="PS4 & PS5 digital games, PlayStation Network vouchers, and subscriptions"
        badge="Sony PSN"
        viewAllLink="/products?category=playstation"
        products={playstationGames}
        limit={4}
      />

      {/* Xbox Section */}
      <ProductSection
        title="🟢 Xbox Gaming"
        subtitle="Xbox Series X|S, Xbox One games, and Game Pass Ultimate digital codes"
        badge="Microsoft Xbox"
        viewAllLink="/products?category=xbox"
        products={xboxGames}
        limit={4}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="🎁 Gift Cards"
        subtitle="Steam Wallet, Google Play, Apple App Store, and Razer Gold PIN codes"
        badge="Digital Cards"
        viewAllLink="/products?category=gift-cards"
        products={giftCards}
        limit={4}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="✨ Premium Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify, Canva & CapCut Pro"
        badge="VIP Access"
        viewAllLink="/products?category=subscriptions"
        products={subscriptions}
        limit={4}
      />

      {/* Coming Soon Section */}
      {comingSoon.length > 0 && (
        <ProductSection
          title="⏳ Coming Soon & Pre-Orders"
          subtitle="Be first in line for upcoming blockbuster gaming releases"
          badge="Anticipated"
          viewAllLink="/products"
          products={comingSoon}
          limit={4}
        />
      )}
    </div>
  );
}

export default Home;
