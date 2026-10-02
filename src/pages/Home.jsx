import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Flame,
  Star,
  Gamepad2,
  Gift,
  Smartphone,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  TrendingUp,
  Award
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { ProductSection } from '../components/ProductSection';
import { CategoryTabs } from '../components/CategoryTabs';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const { products } = useProducts();

  // Filtered sections
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const topSales = products.filter((p) => p.soldCount >= 2000).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending);
  const topRatedProducts = products.filter((p) => p.isTopRated || p.rating >= 4.9);

  // Platform sections
  const pcGames = products.filter((p) => p.platform === 'PC');
  const xboxGames = products.filter((p) => p.platform === 'Xbox');
  const psGames = products.filter((p) => p.platform === 'PlayStation');
  const mobileTopUps = products.filter((p) => p.platform === 'Mobile' || p.category === 'mobile');
  const giftCards = products.filter((p) => p.category === 'giftcards');
  const subscriptions = products.filter((p) => p.category === 'subscriptions');

  return (
    <div className="space-y-12 pb-12">

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-purple-950 border border-slate-800 p-6 sm:p-10 lg:p-12 shadow-2xl mt-4">
        {/* Glow & grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
              <Zap className="w-4 h-4 fill-cyan-400" />
              <span>Instant Digital Top-Ups in Iraq & Kurdistan</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 font-heading leading-tight tracking-tight">
              Level Up Your Gaming Experience with{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Dano Store
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Buy official PC games, PUBG Mobile UC, Free Fire Diamonds, Steam Gift Cards, and subscriptions with local manual payment via FastPay, Korek, and MasterCard.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/products"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-950/50 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Browse Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products?category=mobile"
                className="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm transition-all"
              >
                Mobile Top-Ups
              </Link>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Legal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>IQD Pricing</span>
              </div>
            </div>
          </div>

          {/* Featured Hero Cards Showcase */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5 relative">
            {products.slice(0, 4).map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Browse By Category
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3.5">
          <Link
            to="/products?category=mobile"
            className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col items-center text-center space-y-2 group"
          >
            <div className="p-3 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30 group-hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6" />
            </div>
            <span className="font-bold text-slate-200 text-sm">Mobile Top-Ups</span>
            <span className="text-[11px] text-slate-400">UC, Diamonds, CP</span>
          </Link>

          <Link
            to="/products?category=games"
            className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/50 transition-all flex flex-col items-center text-center space-y-2 group"
          >
            <div className="p-3 rounded-xl bg-purple-950 text-purple-400 border border-purple-500/30 group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <span className="font-bold text-slate-200 text-sm">PC & Console</span>
            <span className="text-[11px] text-slate-400">Steam, Xbox, PS5</span>
          </Link>

          <Link
            to="/products?category=giftcards"
            className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 transition-all flex flex-col items-center text-center space-y-2 group"
          >
            <div className="p-3 rounded-xl bg-blue-950 text-blue-400 border border-blue-500/30 group-hover:scale-110 transition-transform">
              <Gift className="w-6 h-6" />
            </div>
            <span className="font-bold text-slate-200 text-sm">Gift Cards</span>
            <span className="text-[11px] text-slate-400">Steam, PSN, iTunes</span>
          </Link>

          <Link
            to="/products?category=subscriptions"
            className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col items-center text-center space-y-2 group"
          >
            <div className="p-3 rounded-xl bg-amber-950 text-amber-400 border border-amber-500/30 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="font-bold text-slate-200 text-sm">Subscriptions</span>
            <span className="text-[11px] text-slate-400">Nitro, Premium, Pass</span>
          </Link>

          <Link
            to="/products"
            className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all flex flex-col items-center text-center space-y-2 group col-span-2 sm:col-span-1"
          >
            <div className="p-3 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6 text-rose-400" />
            </div>
            <span className="font-bold text-slate-200 text-sm">All Deals</span>
            <span className="text-[11px] text-slate-400">View Full Catalog</span>
          </Link>
        </div>
      </section>

      {/* Flash Deals */}
      <ProductSection
        title="Flash Deals"
        subtitle="Special limited-time discounts on top gaming services"
        icon={Zap}
        viewAllLink="/products"
        products={flashDeals.slice(0, 4)}
      />

      {/* Top Sales */}
      <ProductSection
        title="Top Sales"
        subtitle="Most ordered packages in Kurdistan and Iraq"
        icon={TrendingUp}
        viewAllLink="/products"
        products={topSales}
      />

      {/* New & Trending */}
      <ProductSection
        title="New & Trending"
        subtitle="Fresh additions and hot releases right now"
        icon={Flame}
        viewAllLink="/products"
        products={trendingProducts.slice(0, 4)}
      />

      {/* Top Rated */}
      <ProductSection
        title="Top Rated Services"
        subtitle="Highest customer satisfaction ratings"
        icon={Award}
        viewAllLink="/products"
        products={topRatedProducts.slice(0, 4)}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Gaming"
        subtitle="Xbox gift cards, Game Pass, and digital console games"
        icon={Gamepad2}
        viewAllLink="/products?platform=Xbox"
        products={xboxGames.slice(0, 4)}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Corner"
        subtitle="PSN gift cards, PS Plus, and PlayStation 5 digital games"
        icon={Gamepad2}
        viewAllLink="/products?platform=PlayStation"
        products={psGames.slice(0, 4)}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Store"
        subtitle="Official Steam license keys and game points"
        icon={Gamepad2}
        viewAllLink="/products?platform=PC"
        products={pcGames.slice(0, 4)}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="Direct PUBG UC, Free Fire Diamonds, Mobile Legends, and CP"
        icon={Smartphone}
        viewAllLink="/products?platform=Mobile"
        products={mobileTopUps.slice(0, 4)}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards"
        subtitle="Steam, Google Play, iTunes, Amazon, and Nintendo codes"
        icon={Gift}
        viewAllLink="/products?category=giftcards"
        products={giftCards.slice(0, 4)}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify, and Canva Pro"
        icon={Sparkles}
        viewAllLink="/products?category=subscriptions"
        products={subscriptions.slice(0, 4)}
      />

      {/* Coming Soon Banner */}
      <section className="rounded-3xl bg-slate-900/90 border border-slate-800 p-8 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <span className="px-3 py-1 rounded-full bg-purple-950 text-purple-400 border border-purple-500/30 text-xs font-bold uppercase tracking-wider">
            Coming Soon
          </span>
          <h3 className="text-2xl font-extrabold text-slate-100 font-heading">
            Dano Store Loyalty & Rewards Club
          </h3>
          <p className="text-sm text-slate-400">
            Earn reward points on every purchase and redeem them for free PUBG UC, Steam gift cards, and exclusive discounts across Kurdistan & Iraq.
          </p>
        </div>
      </section>

    </div>
  );
};
