import React from 'react';
import { Link } from 'react-router-dom';
import {
  Gamepad2,
  Zap,
  TrendingUp,
  Clock,
  Star,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Smartphone,
  Gift,
  Layers,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import ProductSection from '../components/ProductSection';
import { CATEGORIES, PLATFORMS } from '../data/categories';

export default function Home() {
  const { products } = useProducts();

  // Filtered sections
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const topRated = products.filter((p) => p.isTopRated).slice(0, 4);

  // Platform specific sections
  const xboxProducts = products.filter((p) => p.platform === 'Xbox').slice(0, 4);
  const psProducts = products.filter((p) => p.platform === 'PlayStation').slice(0, 4);
  const pcProducts = products.filter((p) => p.platform === 'PC').slice(0, 4);
  const mobileTopups = products.filter((p) => p.category === 'mobile-topups').slice(0, 8);
  const giftCards = products.filter((p) => p.category === 'gift-cards').slice(0, 4);
  const subscriptions = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  return (
    <div className="space-y-16">
      {/* Hero / Featured Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c132a] via-[#090e1f] to-[#05070f] border border-cyan-500/20 p-6 sm:p-10 lg:p-14 shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-extrabold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>#1 Digital Gaming Store in Kurdistan & Iraq</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none uppercase font-mono">
              LEVEL UP YOUR <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                GAMING EXPERIENCE
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
              Instant delivery for PUBG UC, Free Fire Diamonds, Steam Keys, PSN & Xbox Gift Cards, and Premium Subscriptions. Pay seamlessly via FastPay, Korek, or MasterCard.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/products"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:opacity-95 text-black font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Explore Full Store</span>
              </Link>
              <Link
                to="/products?category=mobile-topups"
                className="px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-700/80 hover:border-cyan-500/50 text-slate-100 font-bold text-sm flex items-center gap-2 transition-all"
              >
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span>Mobile Top-Ups</span>
              </Link>
            </div>

            {/* Guarantees */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-xs font-semibold text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Instant Code / ID Credit</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>100% Genuine Digital</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Local Kurdish Support</span>
              </div>
            </div>
          </div>

          {/* Hero Featured Products Showcase Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {featuredProducts.slice(0, 2).map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wider">
            Explore Categories
          </h2>
          <span className="text-xs text-slate-400">Select to filter store</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
          {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="p-5 rounded-2xl bg-[#090e1f] border border-slate-800 hover:border-cyan-500/40 hover:bg-[#0c1329] transition-all group flex flex-col items-start justify-between space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-sm group-hover:text-cyan-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Instant delivery & codes</p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-cyan-400">
                <span>Browse</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Coming Soon Banner */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-blue-950/30 to-slate-900 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
              COMING SOON TO DANO STORE
            </span>
            <h3 className="text-base font-extrabold text-white mt-1">
              GTA VI Pre-Orders & PlayStation 5 Iraq Digital Pass
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Stay tuned! Pre-registrations and automated instant delivery key locks are dropping soon.
            </p>
          </div>
        </div>
        <button
          onClick={() => alert('Notifications enabled! We will notify you on launch.')}
          className="px-4 py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-bold text-xs border border-purple-500/40 shrink-0 transition-all cursor-pointer"
        >
          Get Notified
        </button>
      </section>

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Most popular digital top-ups and games in Kurdistan right now"
        icon={Award}
        viewAllLink="/products"
        badge="Hot"
        products={featuredProducts}
      />

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on top gaming subscriptions and Steam titles"
        icon={Zap}
        viewAllLink="/products"
        badge="Sale"
        products={flashDeals}
      />

      {/* New & Trending */}
      <ProductSection
        title="New & Trending"
        subtitle="Fresh additions to our store catalog"
        icon={TrendingUp}
        viewAllLink="/products"
        badge="New"
        products={trendingProducts}
      />

      {/* Top Rated */}
      <ProductSection
        title="Top Rated Games & Services"
        subtitle="5-star customer rated items across all platforms"
        icon={Star}
        viewAllLink="/products"
        badge="5.0 Rating"
        products={topRated}
      />

      {/* Mobile Top-Ups Grid */}
      <ProductSection
        title="Mobile Game Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, Valorant VP, Mobile Legends, and COD CP"
        icon={Smartphone}
        viewAllLink="/products?category=mobile-topups"
        badge="Instant ID Credit"
        products={mobileTopups}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC & Steam Games"
        subtitle="Official paid Steam keys & digital codes"
        icon={Gamepad2}
        viewAllLink="/products?platform=PC"
        badge="PC Games"
        products={pcProducts}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Series X|S & Xbox One"
        subtitle="Xbox game keys, Game Pass, and wallet cards"
        icon={Gamepad2}
        viewAllLink="/products?platform=Xbox"
        badge="Xbox"
        products={xboxProducts}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation 5 & PS4"
        subtitle="PSN digital codes and game passes"
        icon={Gamepad2}
        viewAllLink="/products?platform=PlayStation"
        badge="PSN"
        products={psProducts}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards"
        subtitle="Steam Wallet, PSN, Xbox, Google Play, Apple, and Razer Gold"
        icon={Gift}
        viewAllLink="/products?category=gift-cards"
        badge="Digital Cards"
        products={giftCards}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify, Canva Pro & CapCut"
        icon={Layers}
        viewAllLink="/products?category=subscriptions"
        badge="Subscriptions"
        products={subscriptions}
      />
    </div>
  );
}
