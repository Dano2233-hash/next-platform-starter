import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  TrendingUp,
  Flame,
  Star,
  Gamepad2,
  Smartphone,
  CreditCard,
  Tv,
  ArrowRight,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import CategoryTabs from '../components/CategoryTabs';

export default function Home() {
  const { products } = useProducts();

  // Filter products for each section
  const topSales = products.filter(p => p.soldCount >= 1500).slice(0, 5);
  const flashDeals = products.filter(p => p.isFlashDeal || (p.oldPrice && p.oldPrice > p.price)).slice(0, 5);
  const trending = products.filter(p => p.isTrending).slice(0, 5);
  const topRated = products.filter(p => p.isTopRated || p.rating >= 4.9).slice(0, 5);

  const xboxGames = products.filter(p => p.platform === 'Xbox').slice(0, 5);
  const playstationGames = products.filter(p => p.platform === 'PlayStation').slice(0, 5);
  const pcGames = products.filter(p => p.platform === 'PC' && p.category === 'games').slice(0, 5);
  const mobileTopups = products.filter(p => p.category === 'mobile').slice(0, 5);
  const giftCards = products.filter(p => p.category === 'giftcards').slice(0, 5);
  const subscriptions = products.filter(p => p.category === 'subscriptions').slice(0, 5);

  return (
    <div className="space-y-12 pb-16">

      {/* Hero / Featured Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0a1128] via-[#0f1d40] to-[#120b2e] border border-slate-800/80 shadow-2xl p-6 sm:p-10 md:p-12">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>#1 Gaming Store in Kurdistan & Iraq</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Level Up Your Game With <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Instant Digital Codes</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Get instant PUBG UC, Free Fire Diamonds, Steam Wallets, PlayStation Cards, & Paid PC Games. Fast local delivery with FastPay, Korek, & MasterCard.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:opacity-95 text-black font-extrabold text-sm shadow-xl shadow-cyan-500/20 transition-all"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/products?category=mobile"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/50 text-sm font-semibold transition-all"
            >
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span>Mobile Top-Ups</span>
            </Link>
          </div>

          {/* Quick Badges */}
          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>100% Legal Digital Codes</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Zap className="w-4 h-4 text-blue-400" />
              <span>Instant Code Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Browse Categories</h2>
        </div>
        <CategoryTabs
          activeCategory="all"
          onSelectCategory={(catId) => {
            if (catId === 'all') {
              window.location.href = '/products';
            } else {
              window.location.href = `/products?category=${catId}`;
            }
          }}
        />
      </section>

      {/* Coming Soon Teaser Banner */}
      <section className="bg-gradient-to-r from-purple-950/60 via-slate-900 to-blue-950/60 border border-purple-500/30 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 uppercase">Coming Soon</span>
              <h3 className="text-base font-bold text-white">GTA VI & Monster Hunter Wilds Pre-Orders</h3>
            </div>
            <p className="text-xs text-slate-300 mt-1">Get ready for upcoming major releases! Direct pre-order digital keys with zero region locks coming to Dano Store.</p>
          </div>
        </div>
        <Link
          to="/products?category=games"
          className="px-4 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 text-xs font-semibold whitespace-nowrap"
        >
          View Current Games
        </Link>
      </section>

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Most popular items bought by gamers across Erbil, Sulaymaniyah, & Duhok"
        badge="Best Sellers"
        icon={Flame}
        viewAllLink="/products?sort=sold"
        products={topSales}
      />

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Special limited-time discounted digital codes and packages"
        badge="Limited Time"
        icon={Zap}
        viewAllLink="/products?deal=flash"
        products={flashDeals}
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="Trending game titles and requested top-up packages right now"
        badge="Hot Right Now"
        icon={TrendingUp}
        viewAllLink="/products?sort=trending"
        products={trending}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated Products"
        subtitle="Highest customer rated digital services and game keys"
        badge="5.0 ★ Rated"
        icon={Star}
        viewAllLink="/products?sort=rating"
        products={topRated}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Gaming Store"
        subtitle="Xbox Game Pass, Xbox Digital Gift Cards, and Xbox Series X/S games"
        badge="Xbox"
        icon={Gamepad2}
        viewAllLink="/products?platform=Xbox"
        products={xboxGames}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Zone"
        subtitle="PSN Gift Cards, PlayStation Plus, and PS5 / PS4 games"
        badge="PlayStation"
        icon={Gamepad2}
        viewAllLink="/products?platform=PlayStation"
        products={playstationGames}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Keys"
        subtitle="Steam, Epic Games, and Riot Games official PC game activation keys"
        badge="PC Master Race"
        icon={Gamepad2}
        viewAllLink="/products?platform=PC"
        products={pcGames}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="Instant UC, Diamonds, V-Bucks, Robux, and CP via Player ID"
        badge="Mobile Top-Up"
        icon={Smartphone}
        viewAllLink="/products?category=mobile"
        products={mobileTopups}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Digital Gift Cards"
        subtitle="Steam Wallet, iTunes, Google Play, Razer Gold, & Amazon Cards"
        badge="Gift Cards"
        icon={CreditCard}
        viewAllLink="/products?category=giftcards"
        products={giftCards}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify, Canva, & CapCut"
        badge="Subscriptions"
        icon={Tv}
        viewAllLink="/products?category=subscriptions"
        products={subscriptions}
      />

    </div>
  );
}
