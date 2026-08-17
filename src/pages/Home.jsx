import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductSection from '../components/ProductSection';
import CategoryTabs from '../components/CategoryTabs';
import {
  Flame,
  Zap,
  TrendingUp,
  Star,
  Clock,
  Tv,
  Gamepad2,
  Monitor,
  Smartphone,
  CreditCard,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function Home({ products, onAddToCart, onBuyNow }) {
  const navigate = useNavigate();

  // Filter sections
  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const topSales = products.filter((p) => p.isFeatured || p.soldCount > 2000).slice(0, 4);
  const newAndTrending = products.filter((p) => p.isTrending).slice(0, 4);
  const topRated = products.filter((p) => p.isTopRated || p.rating >= 4.9).slice(0, 4);

  // Category specific sections
  const xboxProducts = products.filter((p) => p.category === 'xbox' || p.platform === 'Xbox').slice(0, 4);
  const psProducts = products.filter((p) => p.category === 'playstation' || p.platform === 'PlayStation').slice(0, 4);
  const pcProducts = products.filter((p) => p.category === 'pc' || p.platform === 'PC').slice(0, 4);
  const mobileProducts = products.filter((p) => p.category === 'mobile' || p.platform === 'Mobile').slice(0, 4);
  const giftCardProducts = products.filter((p) => p.category === 'giftcards' || p.type === 'Gift Card').slice(0, 4);
  const subscriptionProducts = products.filter((p) => p.category === 'subscriptions' || p.type === 'Subscription').slice(0, 4);

  return (
    <div className="space-y-12">
      {/* Hero / Featured Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-[#0a1024] to-[#040814] border border-slate-800 p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Instant Digital Delivery in Iraq & Kurdistan</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              Level Up Your Game with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
                Dano Store
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Buy PUBG Mobile UC, Steam Games, Valorant VP, Discord Nitro, and Gift Cards instantly. Pay safely using FastPay, Korek Cash, or MasterCard.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/products')}
                className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-black font-extrabold text-sm hover:brightness-110 shadow-lg shadow-cyan-500/25 transition flex items-center gap-2"
              >
                <span>Browse Store Catalog</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/products?category=mobile')}
                className="py-3.5 px-6 rounded-xl bg-slate-900/90 text-slate-200 font-bold text-sm hover:bg-slate-800 border border-slate-700/80 transition"
              >
                PUBG UC & Top-Ups
              </button>
            </div>

            {/* Quick stats row */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-xs">
              <div>
                <p className="text-lg font-extrabold text-cyan-400">100%</p>
                <p className="text-slate-400">Official Keys</p>
              </div>
              <div>
                <p className="text-lg font-extrabold text-purple-400">Instant</p>
                <p className="text-slate-400">Delivery</p>
              </div>
              <div>
                <p className="text-lg font-extrabold text-emerald-400">FastPay</p>
                <p className="text-slate-400">& Korek Cash</p>
              </div>
            </div>
          </div>

          {/* Right Hero Showcase Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div
              onClick={() => navigate('/product/pubg-mobile-uc')}
              className="cursor-pointer group p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 font-bold">PUBG</span>
                <span className="text-emerald-400 font-semibold">Fast Delivery</span>
              </div>
              <div className="my-3">
                <p className="text-xs font-extrabold text-white group-hover:text-cyan-400">PUBG Mobile UC</p>
                <p className="text-[11px] text-slate-400">From 1,500 IQD</p>
              </div>
              <span className="text-[10px] font-bold text-cyan-400 flex items-center gap-1">
                Top Up Now <ChevronRight className="w-3 h-3" />
              </span>
            </div>

            <div
              onClick={() => navigate('/product/gta-v')}
              className="cursor-pointer group p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 transition flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-400 font-bold">STEAM</span>
                <span className="text-amber-400 font-semibold">Bestseller</span>
              </div>
              <div className="my-3">
                <p className="text-xs font-extrabold text-white group-hover:text-purple-400">Grand Theft Auto V</p>
                <p className="text-[11px] text-slate-400">From 22,000 IQD</p>
              </div>
              <span className="text-[10px] font-bold text-purple-400 flex items-center gap-1">
                Buy Key <ChevronRight className="w-3 h-3" />
              </span>
            </div>

            <div
              onClick={() => navigate('/product/discord-nitro')}
              className="cursor-pointer group p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 transition flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 font-bold">DISCORD</span>
                <span className="text-cyan-400 font-semibold">Nitro</span>
              </div>
              <div className="my-3">
                <p className="text-xs font-extrabold text-white group-hover:text-indigo-400">Discord Nitro</p>
                <p className="text-[11px] text-slate-400">From 5,000 IQD</p>
              </div>
              <span className="text-[10px] font-bold text-indigo-400 flex items-center gap-1">
                Upgrade <ChevronRight className="w-3 h-3" />
              </span>
            </div>

            <div
              onClick={() => navigate('/product/steam-wallet-card')}
              className="cursor-pointer group p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 font-bold">WALLET</span>
                <span className="text-emerald-400 font-semibold">Global</span>
              </div>
              <div className="my-3">
                <p className="text-xs font-extrabold text-white group-hover:text-cyan-400">Steam Gift Card</p>
                <p className="text-[11px] text-slate-400">From 15,000 IQD</p>
              </div>
              <span className="text-[10px] font-bold text-cyan-400 flex items-center gap-1">
                Get Code <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Selection Row */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Store Categories</h3>
        <CategoryTabs onSelectCategory={(catId) => navigate(catId === 'all' ? '/products' : `/products?category=${catId}`)} />
      </section>

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on top game codes & credits"
        icon={Flame}
        badgeText="HOT SALE"
        viewAllPath="/products?tag=Flash Deal"
        products={flashDeals}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Most purchased digital products this month"
        icon={Zap}
        badgeText="POPULAR"
        viewAllPath="/products"
        products={topSales}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* Coming Soon Teaser Banner */}
      <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-blue-950 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-purple-900/60 text-purple-300 border border-purple-500/40 shrink-0">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-purple-400 tracking-widest">Coming Soon</span>
            <h3 className="text-lg font-extrabold text-white">New Game Releases & Direct Console Top-Ups</h3>
            <p className="text-xs text-slate-400">Stay tuned for upcoming GTA VI pre-orders, EA Sports FC 25 top-ups, and PlayStation Plus automated keys.</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/products')}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shrink-0 transition"
        >
          Explore Store
        </button>
      </section>

      {/* New & Trending */}
      <ProductSection
        title="New & Trending"
        subtitle="Freshly added games, subscriptions & passes"
        icon={TrendingUp}
        badgeText="TRENDING"
        viewAllPath="/products"
        products={newAndTrending}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* Top Rated */}
      <ProductSection
        title="Top Rated Products"
        subtitle="Rated 4.9+ stars by Kurdistan & Iraq gamers"
        icon={Star}
        badgeText="5.0 RATING"
        viewAllPath="/products"
        products={topRated}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Games & Game Pass"
        subtitle="Xbox Game Pass Ultimate & Digital Codes"
        icon={Tv}
        viewAllPath="/products?category=xbox"
        products={xboxProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Network"
        subtitle="PSN Gift Cards and Console Subscriptions"
        icon={Gamepad2}
        viewAllPath="/products?category=playstation"
        products={psProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming & Steam"
        subtitle="Steam Keys, Valorant VP & PC Masterpieces"
        icon={Monitor}
        viewAllPath="/products?category=pc"
        products={pcProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Game Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, Robux & CP"
        icon={Smartphone}
        viewAllPath="/products?category=mobile"
        products={mobileProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Store Gift Cards"
        subtitle="Steam Wallet, Google Play, Apple & Razer Gold"
        icon={CreditCard}
        viewAllPath="/products?category=giftcards"
        products={giftCardProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix & Pro Tools"
        icon={Zap}
        viewAllPath="/products?category=subscriptions"
        products={subscriptionProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />
    </div>
  );
}
