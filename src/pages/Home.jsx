import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Zap,
  TrendingUp,
  Star,
  Flame,
  Gamepad2,
  Tv,
  CreditCard,
  Smartphone,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { products } = useProducts();
  const navigate = useNavigate();

  // Filter sections
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
  const topRatedProducts = products.filter((p) => p.isTopRated).slice(0, 4);

  const xboxGames = products.filter((p) => p.platform === 'Xbox').slice(0, 4);
  const playStationGames = products.filter((p) => p.platform === 'PlayStation').slice(0, 4);
  const pcGames = products.filter((p) => p.category === 'paid-games' && p.platform === 'PC').slice(0, 4);
  const mobileTopups = products.filter((p) => p.category === 'mobile-topups').slice(0, 4);
  const giftCards = products.filter((p) => p.category === 'gift-cards').slice(0, 4);
  const subscriptions = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#070d1e] to-[#130d2a] border border-cyan-500/20 p-6 md:p-12 shadow-2xl mt-4">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Instant Top-Ups & Digital Game Keys</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Level Up Your Gaming Experience in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Kurdistan & Iraq
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Buy PUBG UC, Free Fire Diamonds, Steam Cards, Paid PC Games, and Subscriptions. Fast delivery using local FastPay, Korek, and MasterCard.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => navigate('/products')}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:opacity-95 text-white font-extrabold text-sm shadow-xl shadow-cyan-500/20 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Browse All Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/products?category=mobile-topups')}
                className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-700 transition-all cursor-pointer"
              >
                Mobile Top-Ups
              </button>
            </div>
          </div>

          {/* Hero Featured Card Stack */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredProducts.slice(0, 2).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {[
          { title: 'Mobile Top-Ups', category: 'mobile-topups', icon: Smartphone, color: 'text-amber-400' },
          { title: 'Paid PC Games', category: 'paid-games', icon: Gamepad2, color: 'text-cyan-400' },
          { title: 'Gift Cards', category: 'gift-cards', icon: CreditCard, color: 'text-purple-400' },
          { title: 'Subscriptions', category: 'subscriptions', icon: Sparkles, color: 'text-pink-400' },
          { title: 'Console Store', category: 'all', icon: Tv, color: 'text-blue-400' }
        ].map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <Link
              key={idx}
              to={`/products?category=${cat.category}`}
              className="p-4 rounded-2xl bg-[#090d1a] border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all text-center flex flex-col items-center justify-center gap-2 group shadow-md"
            >
              <div className={`w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 group-hover:scale-110 transition-transform ${cat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
                {cat.title}
              </span>
            </Link>
          );
        })}
      </section>

      {/* Coming Soon Section */}
      <section className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-blue-950/40 border border-purple-500/30 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 text-purple-400 animate-spin-slow" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
              Expansion Update
            </span>
            <h3 className="text-base font-extrabold text-white mt-1">Coming Soon: Esports Tournament Passes & Direct FIB Bank Pay</h3>
            <p className="text-xs text-slate-400 mt-0.5">Automated 24/7 key redemption system coming in the next update.</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/products')}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shrink-0 cursor-pointer transition-all"
        >
          Explore Current Catalog
        </button>
      </section>

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on top gaming items"
        icon={Flame}
        viewAllLink="/products"
        products={flashDeals}
      />

      {/* New & Trending */}
      <ProductSection
        title="New & Trending"
        subtitle="Hot releases and most wanted items right now"
        icon={TrendingUp}
        viewAllLink="/products"
        products={trendingProducts}
      />

      {/* Top Rated */}
      <ProductSection
        title="Top Rated Games & Services"
        subtitle="Highly rated by Kurdistan gamers"
        icon={Star}
        viewAllLink="/products"
        products={topRatedProducts}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Game Top-Ups"
        subtitle="PUBG Mobile UC, Free Fire Diamonds, CODM CP & More"
        icon={Smartphone}
        viewAllLink="/products?category=mobile-topups"
        products={mobileTopups}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Keys"
        subtitle="Steam & Epic official digital game activations"
        icon={Gamepad2}
        viewAllLink="/products?category=paid-games"
        products={pcGames}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards & Wallet Codes"
        subtitle="Steam, PSN, Xbox, Apple, Google Play & Razer Gold"
        icon={CreditCard}
        viewAllLink="/products?category=gift-cards"
        products={giftCards}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify & Pro Apps"
        icon={Sparkles}
        viewAllLink="/products?category=subscriptions"
        products={subscriptions}
      />
    </div>
  );
}
