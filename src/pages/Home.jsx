import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  TrendingUp,
  Star,
  Gamepad2,
  Smartphone,
  CreditCard,
  Sparkles,
  Flame,
  Clock,
  Tv,
  ArrowRight
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { ProductSection } from '../components/ProductSection';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const { products } = useProducts();

  // Filter sections dynamically
  const topSales = products.filter(p => p.tag === 'Top Sales' || p.soldCount > 300).slice(0, 4);
  const flashDeals = products.filter(p => p.isFlashDeal).slice(0, 4);
  const newAndTrending = products.filter(p => p.isTrending).slice(0, 4);
  const topRated = products.filter(p => p.isTopRated).slice(0, 4);

  const xboxGames = products.filter(p => p.platform === 'Xbox').slice(0, 4);
  const playstationGames = products.filter(p => p.platform === 'PlayStation').slice(0, 4);
  const pcGames = products.filter(p => p.platform === 'PC' && p.category === 'games').slice(0, 4);
  const mobileTopups = products.filter(p => p.category === 'topups').slice(0, 4);
  const giftCards = products.filter(p => p.category === 'giftcards').slice(0, 4);
  const subscriptions = products.filter(p => p.category === 'subscriptions').slice(0, 4);

  return (
    <div className="space-y-12">

      {/* Hero / Featured Banner Section */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-br from-[#0c1329] via-[#090d1a] to-[#130b2c] p-6 sm:p-10 lg:p-14 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Official Gaming Digital Store • Kurdistan & Iraq</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Level Up Your Game with <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Instant Digital Delivery</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Get official Steam keys, PUBG UC, Free Fire Diamonds, PlayStation & Xbox Gift Cards, and Premium Subscriptions at the best local IQD prices.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/products"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-xl shadow-cyan-950/50 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Browse Store</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/products?category=topups"
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 font-bold text-sm border border-cyan-500/30 hover:border-cyan-400 flex items-center gap-2 transition-all"
              >
                <Smartphone className="w-4 h-4" />
                <span>Mobile Top-Ups</span>
              </Link>
            </div>
          </div>

          {/* Quick Hero Feature Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <Link
              to="/products?category=topups"
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-400/50 transition-all group"
            >
              <Smartphone className="w-8 h-8 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
              <h4 className="font-extrabold text-slate-100 text-sm">PUBG & Free Fire</h4>
              <p className="text-xs text-slate-400">Instant UC & Diamonds</p>
            </Link>

            <Link
              to="/products?category=games"
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-400/50 transition-all group"
            >
              <Gamepad2 className="w-8 h-8 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
              <h4 className="font-extrabold text-slate-100 text-sm">PC & Console Games</h4>
              <p className="text-xs text-slate-400">Steam, Xbox & PS Keys</p>
            </Link>

            <Link
              to="/products?category=giftcards"
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-400/50 transition-all group"
            >
              <CreditCard className="w-8 h-8 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
              <h4 className="font-extrabold text-slate-100 text-sm">Gift Cards</h4>
              <p className="text-xs text-slate-400">Steam, PSN, Google Play</p>
            </Link>

            <Link
              to="/products?category=subscriptions"
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-400/50 transition-all group"
            >
              <Sparkles className="w-8 h-8 text-yellow-400 mb-2 group-hover:scale-110 transition-transform" />
              <h4 className="font-extrabold text-slate-100 text-sm">Subscriptions</h4>
              <p className="text-xs text-slate-400">Discord Nitro, YouTube</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section>
        <h2 className="text-base font-bold text-slate-300 uppercase tracking-wider mb-4">
          Browse Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <Link
            to="/products?category=games"
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-400 transition-all flex items-center gap-3 group"
          >
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-100">Paid Games</h4>
              <span className="text-[11px] text-slate-400">Steam & Keys</span>
            </div>
          </Link>

          <Link
            to="/products?category=topups"
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-400 transition-all flex items-center gap-3 group"
          >
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-black transition-colors">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-100">Mobile Top-Ups</h4>
              <span className="text-[11px] text-slate-400">UC, VP, Robux</span>
            </div>
          </Link>

          <Link
            to="/products?category=giftcards"
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-400 transition-all flex items-center gap-3 group"
          >
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-black transition-colors">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-100">Gift Cards</h4>
              <span className="text-[11px] text-slate-400">PSN, Xbox, Apple</span>
            </div>
          </Link>

          <Link
            to="/products?category=subscriptions"
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-400 transition-all flex items-center gap-3 group"
          >
            <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-400 group-hover:bg-yellow-500 group-hover:text-black transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-100">Subscriptions</h4>
              <span className="text-[11px] text-slate-400">Nitro, YouTube, Net.</span>
            </div>
          </Link>

          <Link
            to="/products"
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-400 transition-all flex items-center gap-3 group"
          >
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 group-hover:bg-rose-500 group-hover:text-black transition-colors">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-100">All Products</h4>
              <span className="text-[11px] text-slate-400">View Catalog</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Coming Soon Section Banner */}
      <section className="relative rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-blue-950/60 border border-purple-800/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <Clock className="w-7 h-7 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/40">
              Coming Soon
            </span>
            <h3 className="text-lg font-extrabold text-white mt-1">
              GTA VI & Monster Hunter Wilds Pre-Orders
            </h3>
            <p className="text-xs text-slate-300">
              Stay tuned! Pre-order digital codes will be available first on Dano Store.
            </p>
          </div>
        </div>
        <Link
          to="/products"
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs whitespace-nowrap shadow-md shadow-purple-950"
        >
          Notify Me
        </Link>
      </section>

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Most popular games and digital codes in Kurdistan"
        products={topSales}
        viewAllLink="/products"
        icon={TrendingUp}
      />

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Special limited-time discounts on top games and credits"
        products={flashDeals}
        viewAllLink="/products"
        icon={Flame}
      />

      {/* New & Trending */}
      <ProductSection
        title="New & Trending"
        subtitle="Fresh additions and trending digital products"
        products={newAndTrending}
        viewAllLink="/products"
        icon={Zap}
      />

      {/* Top Rated */}
      <ProductSection
        title="Top Rated Products"
        subtitle="Highest customer ratings and verified feedback"
        products={topRated}
        viewAllLink="/products"
        icon={Star}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Game Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, Roblox, Valorant & More"
        products={mobileTopups}
        viewAllLink="/products?category=topups"
        icon={Smartphone}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Keys"
        subtitle="Official Steam digital activation codes"
        products={pcGames}
        viewAllLink="/products?platform=PC"
        icon={Gamepad2}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Corner"
        subtitle="PS4 / PS5 games and PSN gift cards"
        products={playstationGames}
        viewAllLink="/products?platform=PlayStation"
        icon={Tv}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Station"
        subtitle="Xbox Series X|S games and Xbox Live gift cards"
        products={xboxGames}
        viewAllLink="/products?platform=Xbox"
        icon={Gamepad2}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Digital Gift Cards"
        subtitle="Steam Wallet, PlayStation, Xbox, Google Play & Apple"
        products={giftCards}
        viewAllLink="/products?category=giftcards"
        icon={CreditCard}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix & Spotify"
        products={subscriptions}
        viewAllLink="/products?category=subscriptions"
        icon={Sparkles}
      />

    </div>
  );
};
