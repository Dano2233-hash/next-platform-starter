import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Flame,
  TrendingUp,
  Star,
  Clock,
  Sparkles,
  Gamepad2,
  Smartphone,
  CreditCard,
  ChevronRight,
  ShieldCheck,
  Headphones
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { products } = useProducts();

  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const topSales = products.filter((p) => p.tag === 'Top Sales' || p.soldCount > 2500).slice(0, 4);
  const trending = products.filter((p) => p.isTrending).slice(0, 4);
  const topRated = products.filter((p) => p.isTopRated).slice(0, 4);

  const pcGames = products.filter((p) => p.platform === 'PC').slice(0, 4);
  const xboxGames = products.filter((p) => p.platform === 'Xbox').slice(0, 4);
  const playstationGames = products.filter((p) => p.platform === 'PlayStation').slice(0, 4);
  const mobileTopUps = products.filter((p) => p.category === 'mobile').slice(0, 4);
  const giftCards = products.filter((p) => p.category === 'gift-cards').slice(0, 4);
  const subscriptions = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  const heroFeatured = products.find((p) => p.id === 'pubg-uc') || products[0];

  return (
    <div className="space-y-12 pb-16">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-cyan-900 to-purple-900 border-b border-cyan-500/20 py-2.5 px-4 text-center text-xs font-bold text-cyan-200 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
        <span>Instant UC, Steam Wallet & Subscriptions in Kurdistan & Iraq. FastPay & Korek Accepted!</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Section */}
        <section className="relative rounded-3xl overflow-hidden bg-slate-900/90 border border-slate-800 p-6 md:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-500/5 to-purple-600/10 pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-extrabold uppercase tracking-widest">
                <Zap className="w-3.5 h-3.5" />
                <span>#1 Gaming Store in Kurdistan</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight leading-tight">
                Level Up Your Gaming Experience with <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">Dano Store</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Get instant digital top-ups for PUBG Mobile UC, Free Fire Diamonds, Valorant VP, Steam Wallet gift cards, and official PC & console games with local Iraqi payment methods.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/products"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:via-cyan-400 hover:to-purple-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
                >
                  Explore Store
                </Link>
                <Link
                  to="/products?category=mobile"
                  className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all"
                >
                  Mobile Top-Ups
                </Link>
              </div>
            </div>

            {/* Hero Right Featured Spotlight */}
            <div className="lg:col-span-5">
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-cyan-400">
                  <span className="uppercase tracking-wider">Spotlight Item</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-[10px]">Instant ID Delivery</span>
                </div>
                {heroFeatured && <ProductCard product={heroFeatured} />}
              </div>
            </div>
          </div>
        </section>

        {/* Category Icons Row */}
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            <Link
              to="/products?category=mobile"
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 flex flex-col items-center justify-center text-center gap-3 group transition-all"
            >
              <div className="p-3.5 rounded-2xl bg-cyan-950/60 text-cyan-400 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-200 text-xs group-hover:text-cyan-400">
                Mobile Top-Ups
              </span>
            </Link>

            <Link
              to="/products?category=paid-games"
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 flex flex-col items-center justify-center text-center gap-3 group transition-all"
            >
              <div className="p-3.5 rounded-2xl bg-blue-950/60 text-blue-400 group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-200 text-xs group-hover:text-blue-400">
                Paid Games
              </span>
            </Link>

            <Link
              to="/products?category=gift-cards"
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 flex flex-col items-center justify-center text-center gap-3 group transition-all"
            >
              <div className="p-3.5 rounded-2xl bg-purple-950/60 text-purple-400 group-hover:scale-110 transition-transform">
                <CreditCard className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-200 text-xs group-hover:text-purple-400">
                Gift Cards
              </span>
            </Link>

            <Link
              to="/products?category=subscriptions"
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 flex flex-col items-center justify-center text-center gap-3 group transition-all"
            >
              <div className="p-3.5 rounded-2xl bg-indigo-950/60 text-cyan-300 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-200 text-xs group-hover:text-cyan-300">
                Subscriptions
              </span>
            </Link>

            <Link
              to="/products"
              className="col-span-2 sm:col-span-4 lg:col-span-1 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex flex-col items-center justify-center text-center gap-3 group transition-all"
            >
              <div className="p-3.5 rounded-2xl bg-slate-800 text-slate-300 group-hover:scale-110 transition-transform">
                <ChevronRight className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-200 text-xs">
                View All Categories
              </span>
            </Link>
          </div>
        </section>

        {/* Coming Soon Teaser Bar */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-950/80 border border-purple-800/60 text-purple-400">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">
                Coming Soon
              </span>
              <h4 className="text-base font-bold text-slate-100">
                GTA VI Pre-Orders & EA SPORTS FC 25 Ultimate Coins
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Stay tuned for automated instant key distribution and new localized Kurdistan payments.
              </p>
            </div>
          </div>
          <Link
            to="/products"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 hover:text-white shrink-0"
          >
            Notify Me
          </Link>
        </section>

        {/* Main Sections */}
        <ProductSection
          title="Flash Deals"
          subtitle="Limited time discounts on top digital gaming products"
          icon={Flame}
          tag="Hot Savings"
          viewAllLink="/products"
          products={flashDeals}
        />

        <ProductSection
          title="Top Sales"
          subtitle="Most purchased top-ups and gift cards in Iraq"
          icon={Zap}
          tag="Bestsellers"
          viewAllLink="/products"
          products={topSales}
        />

        <ProductSection
          title="New & Trending"
          subtitle="Latest games and viral digital passes"
          icon={TrendingUp}
          tag="Popular"
          viewAllLink="/products"
          products={trending}
        />

        <ProductSection
          title="Top Rated"
          subtitle="Highest customer satisfaction digital items"
          icon={Star}
          tag="5 Stars"
          viewAllLink="/products"
          products={topRated}
        />

        {/* Platform Sections */}
        <ProductSection
          title="Mobile Top-Ups"
          subtitle="PUBG UC, Free Fire Diamonds, Mobile Legends & More"
          icon={Smartphone}
          tag="Instant ID"
          viewAllLink="/products?category=mobile"
          products={mobileTopUps}
        />

        <ProductSection
          title="PC Gaming & Steam"
          subtitle="Official Steam games and PC activation keys"
          icon={Gamepad2}
          tag="PC Games"
          viewAllLink="/products?platform=PC"
          products={pcGames}
        />

        <ProductSection
          title="PlayStation Store"
          subtitle="PSN gift cards, memberships, and PS5 games"
          icon={Gamepad2}
          tag="PlayStation"
          viewAllLink="/products?platform=PlayStation"
          products={playstationGames}
        />

        <ProductSection
          title="Xbox Store"
          subtitle="Xbox Game Pass, gift cards, and Xbox titles"
          icon={Gamepad2}
          tag="Xbox"
          viewAllLink="/products?platform=Xbox"
          products={xboxGames}
        />

        <ProductSection
          title="Gift Cards"
          subtitle="Steam Wallet, Apple, Google Play, & Amazon"
          icon={CreditCard}
          tag="Gift Cards"
          viewAllLink="/products?category=gift-cards"
          products={giftCards}
        />

        <ProductSection
          title="Subscriptions"
          subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify"
          icon={Sparkles}
          tag="Pro Accounts"
          viewAllLink="/products?category=subscriptions"
          products={subscriptions}
        />
      </div>
    </div>
  );
}
