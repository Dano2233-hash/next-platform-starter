import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Flame,
  TrendingUp,
  Star,
  Clock,
  Gamepad2,
  Smartphone,
  Gift,
  Tv,
  Monitor,
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';

export default function Home() {
  const { products } = useProducts();

  // Filter specific collections for sections
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 5);
  const flashDeals = products.filter((p) => p.isFlashDeal || p.oldPrice).slice(0, 5);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 5);
  const topRatedProducts = products.filter((p) => p.isTopRated || p.rating >= 4.9).slice(0, 5);

  // Platform and Category specific sections
  const xboxProducts = products.filter((p) => p.platform === 'Xbox').slice(0, 5);
  const psProducts = products.filter((p) => p.platform === 'PlayStation').slice(0, 5);
  const pcProducts = products.filter((p) => p.platform === 'PC').slice(0, 5);
  const mobileProducts = products.filter((p) => p.category === 'Mobile Top-Ups').slice(0, 5);
  const giftCardProducts = products.filter((p) => p.category === 'Gift Cards').slice(0, 5);
  const subProducts = products.filter((p) => p.category === 'Subscriptions').slice(0, 5);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Banner / Featured Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0a1128] via-[#0f1a3a] to-[#090d16] border border-slate-800 shadow-2xl p-6 md:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Digital Gaming Kurdistan & Iraq</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-sans">
            Level Up Your Gaming Experience with <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Dano Store</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Get instant codes, game top-ups, PUBG UC, Free Fire Diamonds, Steam Wallet, and subscriptions. Guaranteed official digital codes with FastPay, Korek, and MasterCard.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/products"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Explore Products</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/products?category=Mobile Top-Ups"
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm transition-all flex items-center gap-2"
            >
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span>Mobile Top-Ups</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section className="space-y-4">
        <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Browse Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          <Link
            to="/products?category=Mobile Top-Ups"
            className="p-4 rounded-2xl bg-[#0d1322] border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">Mobile Top-Ups</h3>
              <p className="text-[10px] text-slate-400">UC, VP, Diamonds</p>
            </div>
          </Link>

          <Link
            to="/products?category=Paid Games"
            className="p-4 rounded-2xl bg-[#0d1322] border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">Paid Games</h3>
              <p className="text-[10px] text-slate-400">GTA V, Elden Ring</p>
            </div>
          </Link>

          <Link
            to="/products?category=Gift Cards"
            className="p-4 rounded-2xl bg-[#0d1322] border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">Gift Cards</h3>
              <p className="text-[10px] text-slate-400">Steam, PSN, Xbox</p>
            </div>
          </Link>

          <Link
            to="/products?category=Subscriptions"
            className="p-4 rounded-2xl bg-[#0d1322] border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Tv className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">Subscriptions</h3>
              <p className="text-[10px] text-slate-400">Nitro, Netflix, YT</p>
            </div>
          </Link>

          <Link
            to="/products?platform=PC"
            className="p-4 rounded-2xl bg-[#0d1322] border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all flex items-center gap-3 group col-span-2 sm:col-span-1"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">PC Store</h3>
              <p className="text-[10px] text-slate-400">Steam & Keys</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Coming Soon Banner */}
      <section className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
            <Clock className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-cyan-400 tracking-wider">Coming Soon</span>
            <h3 className="text-base font-bold text-white">GTA VI & Monster Hunter Wilds Pre-Orders</h3>
            <p className="text-xs text-slate-400">Reserve your digital keys early with guaranteed lowest IQD pricing.</p>
          </div>
        </div>
        <button
          onClick={() => alert('Pre-order notifications will be available soon!')}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-cyan-300 whitespace-nowrap"
        >
          Get Notified
        </button>
      </section>

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Most purchased digital games and top-ups this week"
        viewAllLink="/products"
        icon={Flame}
        products={featuredProducts}
      />

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on top digital gaming assets"
        viewAllLink="/products"
        icon={Zap}
        products={flashDeals}
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="Freshly released keys, game currency and subscriptions"
        viewAllLink="/products"
        icon={TrendingUp}
        products={trendingProducts}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated"
        subtitle="5-star rated titles chosen by our Kurdistan gaming community"
        viewAllLink="/products"
        icon={Star}
        products={topRatedProducts}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Gaming"
        subtitle="Xbox Series X|S digital games, gift cards and passes"
        viewAllLink="/products?platform=Xbox"
        icon={Gamepad2}
        products={xboxProducts}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Store"
        subtitle="PlayStation 5 & PS4 digital games and PSN store cards"
        viewAllLink="/products?platform=PlayStation"
        icon={Gamepad2}
        products={psProducts}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming"
        subtitle="Steam keys, Riot VP, and PC blockbuster releases"
        viewAllLink="/products?platform=PC"
        icon={Monitor}
        products={pcProducts}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, MLBB, CODM CP and more"
        viewAllLink="/products?category=Mobile Top-Ups"
        icon={Smartphone}
        products={mobileProducts}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards"
        subtitle="Steam, PSN, Xbox, Google Play and Apple Gift Cards"
        viewAllLink="/products?category=Gift Cards"
        icon={Gift}
        products={giftCardProducts}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Canva Pro & Snapchat Plus"
        viewAllLink="/products?category=Subscriptions"
        icon={Tv}
        products={subProducts}
      />
    </div>
  );
}
