import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Zap,
  Flame,
  Star,
  Clock,
  Sparkles,
  Smartphone,
  CreditCard,
  Gamepad2,
  Tv,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Headphones,
  Laptop
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import SectionHeader from '../components/SectionHeader';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { products } = useProducts();
  const navigate = useNavigate();

  // Categories & platform filters
  const mobileTopups = products.filter((p) => p.category === 'mobile-topups');
  const paidGames = products.filter((p) => p.category === 'games');
  const giftCards = products.filter((p) => p.category === 'gift-cards');
  const subscriptions = products.filter((p) => p.category === 'subscriptions');

  const xboxProducts = products.filter((p) => p.platform === 'xbox');
  const psProducts = products.filter((p) => p.platform === 'playstation');
  const pcProducts = products.filter((p) => p.platform === 'pc');

  const topSales = products.filter((p) => p.soldCount && p.soldCount > 2000);
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const trending = products.filter((p) => p.isTrending);
  const topRated = products.filter((p) => p.isTopRated || p.rating >= 4.9);

  return (
    <div className="space-y-12 pb-12">

      {/* Hero / Featured Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-[#0a1228] to-[#120e2e] border border-slate-800 p-6 sm:p-10 lg:p-12 shadow-2xl">
        {/* Glow backdrop circles */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Direct Player ID & Instant Delivery
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-wide leading-tight">
              Kurdistan’s #1 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Digital Gaming Store
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Buy PUBG UC, Free Fire Diamonds, Steam Wallet, Valorant VP, Discord Nitro, and PC/Console games. Fast local payment via FastPay, Korek, and MasterCard.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigate('/products')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:opacity-95 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-cyan-950/50 transition-all flex items-center gap-2"
              >
                Explore All Products <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/products?category=mobile-topups')}
                className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-slate-200 font-bold text-sm transition-all"
              >
                Mobile Top-Ups
              </button>
            </div>

            {/* Guarantees */}
            <div className="pt-4 grid grid-cols-3 gap-2 sm:gap-4 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Instant Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                <span>100% Guaranteed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Headphones className="w-4 h-4 text-blue-400 shrink-0" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Hero Feature Showcase Card */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-2xl relative space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                  ★ Hot Release
                </span>
                <span className="px-2.5 py-0.5 rounded bg-rose-950 text-rose-300 font-bold text-[11px]">
                  Trending
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-heading font-black text-2xl text-white">PUBG Mobile 8100 UC</h3>
                <p className="text-xs text-slate-400">Direct Player ID top-up. No password required.</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Price</span>
                  <span className="font-heading font-black text-xl text-cyan-400">145,000 IQD</span>
                </div>
                <button
                  onClick={() => navigate('/product/pubg-mobile-uc')}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  Top Up Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section>
        <SectionHeader title="Browse Categories" subtitle="Select your gaming product category" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/products?category=mobile-topups"
            className="group p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 transition-all flex flex-col items-center text-center space-y-2"
          >
            <div className="p-3.5 rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 group-hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-slate-100 text-sm">Mobile Top-Ups</h4>
            <p className="text-[11px] text-slate-400">PUBG UC, Free Fire, VP, Robux</p>
          </Link>

          <Link
            to="/products?category=games"
            className="group p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all flex flex-col items-center text-center space-y-2"
          >
            <div className="p-3.5 rounded-xl bg-blue-950/60 border border-blue-800/60 text-blue-400 group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-slate-100 text-sm">Paid Games</h4>
            <p className="text-[11px] text-slate-400">GTA V, RDR2, Elden Ring</p>
          </Link>

          <Link
            to="/products?category=gift-cards"
            className="group p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/80 transition-all flex flex-col items-center text-center space-y-2"
          >
            <div className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-800/60 text-purple-400 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-slate-100 text-sm">Gift Cards</h4>
            <p className="text-[11px] text-slate-400">Steam, PSN, Xbox, iTunes</p>
          </Link>

          <Link
            to="/products?category=subscriptions"
            className="group p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/80 transition-all flex flex-col items-center text-center space-y-2"
          >
            <div className="p-3.5 rounded-xl bg-amber-950/60 border border-amber-800/60 text-amber-400 group-hover:scale-110 transition-transform">
              <Tv className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-slate-100 text-sm">Subscriptions</h4>
            <p className="text-[11px] text-slate-400">Nitro, YouTube, Netflix, Spotify</p>
          </Link>
        </div>
      </section>

      {/* Top Sales */}
      <ProductSection
        title="Top Sales"
        subtitle="Most purchased gaming codes & top-ups this month"
        icon={Flame}
        products={topSales}
        badge="Best Sellers"
        viewAllLink="/products"
      />

      {/* Flash Deals */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on selected items"
        icon={Clock}
        products={flashDeals}
        badge="Special Offer"
        viewAllLink="/products"
      />

      {/* New & Trending */}
      <ProductSection
        title="New & Trending"
        subtitle="Freshly added titles and popular digital products"
        icon={Zap}
        products={trending}
        badge="Hot"
        viewAllLink="/products"
      />

      {/* Top Rated */}
      <ProductSection
        title="Top Rated Products"
        subtitle="Highest customer satisfaction rating (5.0 Stars)"
        icon={Star}
        products={topRated}
        badge="5.0 Rating"
        viewAllLink="/products"
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups & In-Game Currency"
        subtitle="Instant Player ID refill for PUBG, Free Fire, Mobile Legends, Robux & VP"
        icon={Smartphone}
        products={mobileTopups}
        badge="Mobile"
        viewAllLink="/products?category=mobile-topups"
        limit={8}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Store"
        subtitle="Steam keys and top titles for PC gamers"
        icon={Laptop}
        products={pcProducts}
        badge="PC"
        viewAllLink="/products?platform=pc"
        limit={4}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Store & Games"
        subtitle="PSN gift cards and PlayStation game keys"
        icon={Gamepad2}
        products={psProducts}
        badge="PS4 / PS5"
        viewAllLink="/products?platform=playstation"
        limit={4}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Gaming"
        subtitle="Xbox gift cards, Forza Horizon 5, and digital keys"
        icon={Gamepad2}
        products={xboxProducts}
        badge="Xbox"
        viewAllLink="/products?platform=xbox"
        limit={4}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards"
        subtitle="Steam Wallet, PlayStation, Xbox, Google Play, Apple & Razer Gold"
        icon={CreditCard}
        products={giftCards}
        badge="Wallet Code"
        viewAllLink="/products?category=gift-cards"
        limit={4}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify & Canva Pro"
        icon={Tv}
        products={subscriptions}
        badge="Premium"
        viewAllLink="/products?category=subscriptions"
        limit={4}
      />

      {/* Coming Soon Section */}
      <section className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-cyan-950/40 border border-purple-800/40 rounded-3xl p-8 text-center space-y-4">
        <span className="px-3 py-1 rounded-full bg-purple-900/60 text-purple-300 font-bold text-xs uppercase tracking-widest">
          🚀 Coming Soon
        </span>
        <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
          GTA VI Pre-Orders & Custom Gaming Accounts
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          We are preparing exclusive pre-order access for Grand Theft Auto VI, specialized gaming accounts, and direct fast-refill options for upcoming esports games in Iraq.
        </p>
      </section>

    </div>
  );
}
