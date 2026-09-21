import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Zap,
  Star,
  Gamepad2,
  Clock,
  Sparkles,
  Smartphone,
  CreditCard,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Headphones
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { ProductSection } from '../components/ProductSection';
import { CATEGORIES } from '../data/categories';

export const Home = () => {
  const { products } = useProducts();

  // Featured sections filter
  const heroFeatured = products.filter((p) => p.isFeatured).slice(0, 3);
  const comingSoonProducts = products.slice(0, 4); // Featured coming soon highlight
  const topSales = products.filter((p) => p.soldCount > 2000).slice(0, 5);
  const flashDeals = products.filter((p) => p.isFlashDeal || (p.oldPrice && p.oldPrice > p.price)).slice(0, 5);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 5);
  const topRatedProducts = products.filter((p) => p.isTopRated || p.rating >= 4.9).slice(0, 5);

  // Category specific sections
  const xboxProducts = products.filter((p) => p.platform === 'Xbox' || p.name.includes('Xbox')).slice(0, 5);
  const psProducts = products.filter((p) => p.platform === 'PlayStation' || p.name.includes('PlayStation')).slice(0, 5);
  const pcProducts = products.filter((p) => p.platform === 'PC' && p.category === 'paid-games').slice(0, 5);
  const mobileProducts = products.filter((p) => p.category === 'mobile-topup' || p.platform === 'Mobile').slice(0, 5);
  const giftCardProducts = products.filter((p) => p.category === 'gift-cards').slice(0, 5);
  const subscriptionProducts = products.filter((p) => p.category === 'subscriptions').slice(0, 5);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero / Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c162e] via-[#080f22] to-[#111933] border border-cyan-500/20 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-cyan-500/30 px-3 py-1.5 rounded-full text-xs font-bold text-cyan-400">
              <Zap className="w-3.5 h-3.5 fill-cyan-400" />
              <span>KURDISTAN & IRAQ DIGITAL GAMING STORE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Instant Top-Ups, Paid Games & Digital Cards
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Get PUBG UC, Free Fire Diamonds, Steam Games, PSN Cards & Discord Nitro instantly. Local Iraqi payments via FastPay, Korek & MasterCard with instant delivery.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                to="/products"
                className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-extrabold text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
              >
                <span>Browse Store</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </Link>
              <Link
                to="/products?category=mobile-topup"
                className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-bold px-6 py-3.5 rounded-xl transition-colors"
              >
                Mobile Top-Ups
              </Link>
            </div>

            {/* Quick feature stats */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-lg font-black text-white">100%</p>
                <p className="text-xs text-slate-400">Legal & Safe</p>
              </div>
              <div>
                <p className="text-lg font-black text-cyan-400">24/7</p>
                <p className="text-xs text-slate-400">Instant Delivery</p>
              </div>
              <div>
                <p className="text-lg font-black text-purple-400">IQD</p>
                <p className="text-xs text-slate-400">Local Payment</p>
              </div>
            </div>
          </div>

          {/* Hero Side Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Featured Deals</span>
            </p>
            {heroFeatured.map((prod) => (
              <Link
                key={prod.id}
                to={`/products/${prod.slug || prod.id}`}
                className="bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 p-3 rounded-2xl flex items-center gap-3 transition-all group"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950 shrink-0">
                  {prod.image ? (
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-cyan-400 text-xs">
                      DS
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                    {prod.platform}
                  </span>
                  <h3 className="font-bold text-white text-sm truncate mt-0.5 group-hover:text-cyan-400 transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-xs font-extrabold text-cyan-400 mt-0.5">
                    From {prod.price.toLocaleString()} IQD
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Row Cards */}
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            to="/products?category=mobile-topup"
            className="bg-[#090f1e] hover:bg-[#0d162d] border border-slate-800 hover:border-cyan-500/40 p-4 rounded-2xl flex items-center gap-3 transition-all group"
          >
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-cyan-400">Mobile Top-Up</h4>
              <p className="text-[11px] text-slate-400">UC, Diamonds, VP</p>
            </div>
          </Link>

          <Link
            to="/products?category=paid-games"
            className="bg-[#090f1e] hover:bg-[#0d162d] border border-slate-800 hover:border-blue-500/40 p-4 rounded-2xl flex items-center gap-3 transition-all group"
          >
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-blue-400">Paid Games</h4>
              <p className="text-[11px] text-slate-400">Steam & PC Keys</p>
            </div>
          </Link>

          <Link
            to="/products?category=gift-cards"
            className="bg-[#090f1e] hover:bg-[#0d162d] border border-slate-800 hover:border-purple-500/40 p-4 rounded-2xl flex items-center gap-3 transition-all group"
          >
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-purple-400">Gift Cards</h4>
              <p className="text-[11px] text-slate-400">Steam, PSN, Xbox</p>
            </div>
          </Link>

          <Link
            to="/products?category=subscriptions"
            className="bg-[#090f1e] hover:bg-[#0d162d] border border-slate-800 hover:border-amber-500/40 p-4 rounded-2xl flex items-center gap-3 transition-all group"
          >
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-amber-400">Subscriptions</h4>
              <p className="text-[11px] text-slate-400">Nitro, Netflix, Canva</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on top game titles & gift cards"
        icon={Zap}
        products={flashDeals}
        viewAllLink="/products"
      />

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Most ordered digital products in Kurdistan & Iraq"
        icon={Flame}
        products={topSales}
        viewAllLink="/products"
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="Recently updated games, memberships, and packages"
        icon={TrendingUp}
        products={trendingProducts}
        viewAllLink="/products"
      />

      {/* Coming Soon Section */}
      <section className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-cyan-950/40 border border-purple-500/20 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/20 text-purple-400 rounded-2xl border border-purple-500/30">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">Coming Soon & Pre-Orders</h2>
              <p className="text-xs text-slate-400">Upcoming major gaming releases & new top-up packages</p>
            </div>
          </div>
          <span className="text-xs font-bold text-purple-300 bg-purple-900/60 px-3 py-1.5 rounded-xl border border-purple-500/30 self-start md:self-auto">
            Notify Me Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-extrabold uppercase bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20">
              PC & Console
            </span>
            <h3 className="font-bold text-white text-sm">GTA VI Pre-Order Access</h3>
            <p className="text-xs text-slate-400">Official reservation list for Kurdistan gamers upon release.</p>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-extrabold uppercase bg-purple-950 text-purple-400 px-2 py-0.5 rounded border border-purple-500/20">
              Mobile
            </span>
            <h3 className="font-bold text-white text-sm">PUBG Mobile Royal Pass Next Season</h3>
            <p className="text-xs text-slate-400">Early bird UC reservation bundles with bonus points.</p>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-extrabold uppercase bg-amber-950 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
              Subscription
            </span>
            <h3 className="font-bold text-white text-sm">Spotify Duo & Family Kurdistan</h3>
            <p className="text-xs text-slate-400">Multi-account localized premium payment plans.</p>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-extrabold uppercase bg-blue-950 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">
              Steam
            </span>
            <h3 className="font-bold text-white text-sm">Steam Winter Sale Event</h3>
            <p className="text-xs text-slate-400">Discounted wallet codes & instant game keys.</p>
          </div>
        </div>
      </section>

      {/* Platform Category Sections */}
      <ProductSection
        title="Mobile Game Top-Ups"
        subtitle="UC, Diamonds, CP, Coins & Memberships for Android & iOS"
        icon={Smartphone}
        products={mobileProducts}
        viewAllLink="/products?category=mobile-topup"
      />

      <ProductSection
        title="PC Gaming & Paid Steam Games"
        subtitle="Official keys & digital downloads for PC gamers"
        icon={Gamepad2}
        products={pcProducts}
        viewAllLink="/products?platform=PC"
      />

      <ProductSection
        title="PlayStation Store"
        subtitle="PSN Gift Cards & PS Plus digital codes"
        icon={Gamepad2}
        products={psProducts}
        viewAllLink="/products?platform=PlayStation"
      />

      <ProductSection
        title="Xbox Store"
        subtitle="Xbox Gift Cards & Game Pass Ultimate memberships"
        icon={Gamepad2}
        products={xboxProducts}
        viewAllLink="/products?platform=Xbox"
      />

      <ProductSection
        title="Gift Cards"
        subtitle="Steam, PSN, Xbox, Apple, Google Play & Razer Gold"
        icon={CreditCard}
        products={giftCardProducts}
        viewAllLink="/products?category=gift-cards"
      />

      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Canva & CapCut"
        icon={Sparkles}
        products={subscriptionProducts}
        viewAllLink="/products?category=subscriptions"
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated Games & Services"
        subtitle="Highest customer rated items by Iraqi gamers"
        icon={Star}
        products={topRatedProducts}
        viewAllLink="/products"
      />
    </div>
  );
};
