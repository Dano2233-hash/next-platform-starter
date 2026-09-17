import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Gamepad2,
  Sparkles,
  Zap,
  TrendingUp,
  Flame,
  Award,
  Clock,
  ShieldCheck,
  Smartphone,
  Monitor,
  Box,
  CreditCard,
  ChevronRight,
  Gift,
  Star
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const navigate = useNavigate();
  const { products } = useProducts();

  const featuredProducts = products.filter((p) => p.isFeatured);
  const topSalesProducts = products.filter((p) => (p.soldCount && p.soldCount > 3000) || p.tag === 'Top Sale');
  const flashDealsProducts = products.filter((p) => p.isFlashDeal || (p.oldPrice && p.oldPrice > p.price));
  const newTrendingProducts = products.filter((p) => p.isTrending);
  const topRatedProducts = products.filter((p) => p.isTopRated || p.rating >= 4.9);

  // Platform and Category Filtered Sections
  const xboxProducts = products.filter((p) => p.category === 'xbox' || p.platform === 'Xbox');
  const psProducts = products.filter((p) => p.category === 'playstation' || p.platform === 'PlayStation');
  const pcProducts = products.filter((p) => p.category === 'pc' || p.platform === 'PC');
  const mobileProducts = products.filter((p) => p.category === 'mobile' || p.platform === 'Mobile');
  const giftCardsProducts = products.filter((p) => p.category === 'giftcards' || p.type === 'Gift Card');
  const subscriptionProducts = products.filter((p) => p.category === 'subscriptions' || p.type === 'Subscription');

  const comingSoonGames = [
    { title: "Grand Theft Auto VI", platform: "PS5 / Xbox Series X", release: "2025", tag: "Most Anticipated" },
    { title: "Monster Hunter Wilds", platform: "PC / Console", release: "Feb 2025", tag: "Pre-order Soon" },
    { title: "Assassin's Creed Shadows", platform: "PC / PS5 / Xbox", release: "2025", tag: "Upcoming" },
  ];

  return (
    <div className="space-y-12 pb-16">

      {/* Hero / Featured Showcase Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1327] via-[#080d1a] to-[#04060c] border border-slate-800 p-6 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wide">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>KURDISTAN'S #1 GAMING DIGITAL STORE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none font-sans">
              Instant Digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400">
                Gaming Top-Ups &amp; Keys
              </span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
              Get official PUBG UC, Free Fire Diamonds, Steam Wallet, PlayStation cards, and PC Steam games instantly. Local manual payments via FastPay, Korek, and MasterCard.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/products')}
                className="px-6 py-3.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:brightness-110 text-black font-black text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Explore Store Catalog</span>
              </button>
              <button
                onClick={() => navigate('/products?category=mobile')}
                className="px-6 py-3.5 bg-[#0e172a] hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm rounded-xl flex items-center gap-2 transition-all"
              >
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span>PUBG UC &amp; Mobile Top-Up</span>
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-semibold">100% Authorized</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold">Instant Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="font-semibold">Local IQD Price</span>
              </div>
            </div>
          </div>

          {/* Featured Cards Carousel / Mini Banner */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {featuredProducts.slice(0, 2).map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Navigation Row */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h2 className="text-base font-extrabold text-white uppercase tracking-wider font-sans">
            Quick Categories
          </h2>
          <span className="text-xs text-slate-400">Select category to filter</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { id: 'mobile', name: 'Mobile Top-Up', icon: Smartphone, bg: 'from-blue-900/40 to-cyan-900/30' },
            { id: 'pc', name: 'PC Steam', icon: Monitor, bg: 'from-indigo-900/40 to-blue-900/30' },
            { id: 'playstation', name: 'PlayStation', icon: Gamepad2, bg: 'from-blue-950/50 to-indigo-950/40' },
            { id: 'xbox', name: 'Xbox Series', icon: Box, bg: 'from-emerald-950/40 to-teal-950/30' },
            { id: 'giftcards', name: 'Gift Cards', icon: CreditCard, bg: 'from-purple-950/40 to-pink-950/30' },
            { id: 'subscriptions', name: 'Subscriptions', icon: Zap, bg: 'from-amber-950/40 to-orange-950/30' },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className={`bg-gradient-to-br ${cat.bg} hover:brightness-125 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-2 transition-all duration-200 group`}
              >
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales in Kurdistan"
        subtitle="Most ordered game keys, UC, and gift cards right now"
        icon={Flame}
        products={topSalesProducts}
        viewAllPath="/products"
        badge="Hot"
        maxItems={4}
      />

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals & Special Offers"
        subtitle="Limited time discounts on top gaming subscriptions and Steam games"
        icon={Zap}
        products={flashDealsProducts}
        viewAllPath="/products"
        badge="Sale"
        maxItems={4}
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending Games"
        subtitle="Trending blockbusters and newest digital additions"
        icon={TrendingUp}
        products={newTrendingProducts}
        viewAllPath="/products"
        badge="New"
        maxItems={4}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated Games & Services"
        subtitle="Highest customer satisfaction ratings across Iraq"
        icon={Award}
        products={topRatedProducts}
        viewAllPath="/products"
        badge="5.0 Rating"
        maxItems={4}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups (PUBG UC, Diamonds, VP)"
        subtitle="Instant recharge for PUBG Mobile, Free Fire, Valorant, Robux & MLBB"
        icon={Smartphone}
        products={mobileProducts}
        viewAllPath="/products?category=mobile"
        badge="Instant UC"
        maxItems={4}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming & Steam Store"
        subtitle="Steam keys, GTA V, Elden Ring, Black Myth Wukong & Cyberpunk"
        icon={Monitor}
        products={pcProducts}
        viewAllPath="/products?category=pc"
        maxItems={4}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Corner"
        subtitle="PS4/PS5 digital games and PSN Store Gift Cards"
        icon={Gamepad2}
        products={psProducts}
        viewAllPath="/products?category=playstation"
        maxItems={4}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Games & Game Pass"
        subtitle="Xbox Series X|S digital keys and wallet refill"
        icon={Box}
        products={xboxProducts}
        viewAllPath="/products?category=xbox"
        maxItems={4}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Digital Gift Cards"
        subtitle="Steam Wallet, iTunes, Google Play, Razer Gold & Amazon"
        icon={CreditCard}
        products={giftCardsProducts}
        viewAllPath="/products?category=giftcards"
        maxItems={4}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify & Canva Pro"
        icon={Zap}
        products={subscriptionProducts}
        viewAllPath="/products?category=subscriptions"
        maxItems={4}
      />

      {/* Coming Soon Teaser Section */}
      <section className="bg-gradient-to-r from-[#090e1a] via-[#0d162b] to-[#090e1a] border border-slate-800 rounded-3xl p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-cyan-400" />
          <h2 className="text-xl font-black text-white font-sans">Coming Soon to Dano Store</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {comingSoonGames.map((game, idx) => (
            <div key={idx} className="bg-[#070b14] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-2">
              <span className="text-[10px] font-extrabold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded w-max border border-cyan-500/30">
                {game.tag}
              </span>
              <div>
                <h4 className="font-bold text-white text-base">{game.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{game.platform}</p>
              </div>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Expected Release</span>
                <span className="text-slate-300 font-bold">{game.release}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
