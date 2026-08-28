import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';
import ProductImage from '../components/ProductImage';
import {
  Flame,
  Zap,
  TrendingUp,
  Star,
  Clock,
  Gamepad2,
  Smartphone,
  CreditCard,
  Tv,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export function Home({ products = [], onAddToCart, onBuyNow }) {
  const navigate = useNavigate();

  // Filtered lists for all required home sections
  const featuredProducts = products.filter((p) => p.isFeatured && !p.isComingSoon);
  const topSales = products.filter((p) => p.soldCount > 2000 && !p.isComingSoon).slice(0, 4);
  const flashDeals = products.filter((p) => p.isFlashDeal && !p.isComingSoon).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending && !p.isComingSoon).slice(0, 4);
  const topRatedProducts = products.filter((p) => p.isTopRated && !p.isComingSoon).slice(0, 4);

  const xboxProducts = products.filter((p) => p.platform === 'xbox' && !p.isComingSoon).slice(0, 4);
  const playstationProducts = products.filter((p) => p.platform === 'playstation' && !p.isComingSoon).slice(0, 4);
  const pcProducts = products.filter((p) => p.platform === 'pc' && !p.isComingSoon).slice(0, 4);
  const mobileProducts = products.filter((p) => p.category === 'mobile' && !p.isComingSoon).slice(0, 4);
  const giftCardsProducts = products.filter((p) => p.category === 'giftcards' && !p.isComingSoon).slice(0, 4);
  const subscriptionsProducts = products.filter((p) => p.category === 'subscriptions' && !p.isComingSoon).slice(0, 4);
  const comingSoonProducts = products.filter((p) => p.isComingSoon);

  // Main banner featured item
  const heroItem = featuredProducts[0] || products[0];

  return (
    <div className="space-y-12 pb-12">

      {/* 1. HERO / FEATURED SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kurdistan #1 Digital Gaming Store</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Instant Top-Ups & <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                Official Digital Games
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Fast, 100% legal digital delivery across Kurdistan & Iraq. Instant PUBG UC, Free Fire Diamonds, Steam Wallet, PSN Cards & PC Games via FastPay, Korek & MasterCard.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/products"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm flex items-center gap-2 shadow-xl shadow-cyan-500/25 transition-all"
              >
                <span>Browse Store Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/products?category=mobile"
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-700/80 transition-all"
              >
                Instant Mobile Top-Up
              </Link>
            </div>

            {/* Guarantees */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-medium border-t border-slate-800/80">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-cyan-400" /> 100% Legal & Safe</span>
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-400" /> Instant Delivery</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" /> Local Kurdistan Payment</span>
            </div>
          </div>

          {/* Hero Featured Card Highlight */}
          {heroItem && (
            <div className="lg:col-span-5 max-w-sm mx-auto w-full">
              <div className="relative p-1 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 shadow-2xl">
                <div className="bg-slate-950 rounded-[14px] p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-cyan-400">
                    <span className="uppercase tracking-wider">Featured Item</span>
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Hot Popular</span>
                  </div>
                  <ProductCard product={heroItem} onAddToCart={onAddToCart} onBuyNow={onBuyNow} />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. CATEGORY ROW */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">Explore Categories</h2>
          <Link to="/products" className="text-xs font-semibold text-cyan-400 hover:underline">All Categories &rarr;</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/products?category=mobile"
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center gap-3 group"
          >
            <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 group-hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-400">Mobile Top-Ups</h3>
              <p className="text-[11px] text-slate-400">PUBG, Free Fire, Valorant</p>
            </div>
          </Link>

          <Link
            to="/products?category=games"
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all flex items-center gap-3 group"
          >
            <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800/50 text-blue-400 group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 group-hover:text-blue-400">Paid Games</h3>
              <p className="text-[11px] text-slate-400">GTA V, Red Dead 2, Elden Ring</p>
            </div>
          </Link>

          <Link
            to="/products?category=giftcards"
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition-all flex items-center gap-3 group"
          >
            <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/50 text-purple-400 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 group-hover:text-purple-400">Gift Cards</h3>
              <p className="text-[11px] text-slate-400">Steam, PSN, Xbox, Google</p>
            </div>
          </Link>

          <Link
            to="/products?category=subscriptions"
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all flex items-center gap-3 group"
          >
            <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-800/50 text-amber-400 group-hover:scale-110 transition-transform">
              <Tv className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 group-hover:text-amber-400">Subscriptions</h3>
              <p className="text-[11px] text-slate-400">Discord Nitro, Netflix, YT</p>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. COMING SOON SECTION */}
      {comingSoonProducts.length > 0 && (
        <section className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-800/40 space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-black text-white">Coming Soon / Upcoming Releases</h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300">Pre-Order Reserve</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {comingSoonProducts.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onBuyNow={onBuyNow} />
            ))}
          </div>
        </section>
      )}

      {/* 4. TOP SALES SECTION */}
      <ProductSection
        title="Top Sales & Best Sellers"
        subtitle="Most purchased digital products by Kurdistan gamers"
        icon={Flame}
        badge="Best Sellers"
        viewAllLink="/products"
        products={topSales}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* 5. FLASH DEALS SECTION */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on top gaming products"
        icon={Zap}
        badge="Hot Deals"
        viewAllLink="/products"
        products={flashDeals}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* 6. NEW & TRENDING SECTION */}
      <ProductSection
        title="New & Trending"
        subtitle="Freshly added games, subscriptions, and top-up packages"
        icon={TrendingUp}
        badge="Trending"
        viewAllLink="/products"
        products={trendingProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* 7. TOP RATED SECTION */}
      <ProductSection
        title="Top Rated Products"
        subtitle="Rated 5.0 stars by verified local customers"
        icon={Star}
        badge="5.0 Stars"
        viewAllLink="/products"
        products={topRatedProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* 8. XBOX SECTION */}
      <ProductSection
        title="Xbox Gaming"
        subtitle="Xbox Game Pass, Console digital games, and cards"
        icon={Gamepad2}
        badge="Xbox"
        viewAllLink="/products?platform=xbox"
        products={xboxProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* 9. PLAYSTATION SECTION */}
      <ProductSection
        title="PlayStation Gaming"
        subtitle="PSN gift cards, Tekken 8, Mortal Kombat & PS4/PS5 games"
        icon={Gamepad2}
        badge="PlayStation"
        viewAllLink="/products?platform=playstation"
        products={playstationProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* 10. PC GAMING SECTION */}
      <ProductSection
        title="PC Gaming"
        subtitle="Official Steam keys & PC games (GTA V, Red Dead 2, Elden Ring, Black Myth Wukong)"
        icon={Gamepad2}
        badge="PC Steam"
        viewAllLink="/products?platform=pc"
        products={pcProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* 11. MOBILE TOP-UPS SECTION */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, COD CP, Mobile Legends & Robux"
        icon={Smartphone}
        badge="Instant Player ID"
        viewAllLink="/products?category=mobile"
        products={mobileProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* 12. GIFT CARDS SECTION */}
      <ProductSection
        title="Gift Cards"
        subtitle="Steam Wallet, PSN, Xbox, Google Play, Apple & Razer Gold"
        icon={CreditCard}
        badge="Digital Codes"
        viewAllLink="/products?category=giftcards"
        products={giftCardsProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* 13. SUBSCRIPTIONS SECTION */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify & Canva Pro"
        icon={Tv}
        badge="Subscriptions"
        viewAllLink="/products?category=subscriptions"
        products={subscriptionsProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

    </div>
  );
}

export default Home;
