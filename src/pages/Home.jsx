import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductSection } from '../components/ProductSection';
import { CategoryTabs } from '../components/CategoryTabs';
import {
  Flame,
  Zap,
  TrendingUp,
  Star,
  Gamepad2,
  Tv,
  Monitor,
  Smartphone,
  CreditCard,
  Sparkles,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const Home = () => {
  const { products } = useProducts();

  // Filter products for various sections
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const topSales = products.filter((p) => p.isFeatured || p.soldCount > 2000);
  const trending = products.filter((p) => p.isTrending);
  const topRated = products.filter((p) => p.isTopRated || p.rating >= 4.9);
  const comingSoon = products.filter((p) => p.isComingSoon || p.stock === 0);

  const pcGames = products.filter((p) => p.platform === 'PC' && !p.isComingSoon);
  const xboxGames = products.filter((p) => p.platform === 'Xbox' || p.category === 'Xbox Games');
  const playstationGames = products.filter((p) => p.platform === 'PlayStation' || p.category === 'PlayStation');
  const mobileTopUps = products.filter((p) => p.category === 'Mobile Top-Ups' || p.platform === 'Mobile');
  const giftCards = products.filter((p) => p.category === 'Gift Cards' || p.type === 'Gift Card');
  const subscriptions = products.filter((p) => p.category === 'Subscriptions' || p.type === 'Subscription');

  // Hero Featured Product
  const heroProduct = products.find((p) => p.id === 'pubg-mobile-uc') || products[0];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Banner Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0a0d1f] via-[#0d1636] to-[#090b17] border border-cyan-500/20 p-6 sm:p-10 lg:p-12 shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              <span>Instant Digital Delivery in Kurdistan & Iraq</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Level Up Your Gaming with <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Dano Store</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Buy official PUBG UC, Free Fire Diamonds, Steam Keys, PlayStation & Xbox Gift Cards, and Subscriptions. 100% verified digital codes with instant local payment via FastPay, Korek, and MasterCard.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/products"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm flex items-center gap-2 shadow-xl shadow-cyan-950 transition-all hover:scale-105 active:scale-95"
              >
                <span>Browse Store Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/products?category=Mobile Top-Ups"
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/50 font-bold text-sm transition-all"
              >
                Mobile Top-Ups
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Instant Code</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Safe & Legal</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                <Star className="w-4 h-4 text-amber-400 shrink-0" />
                <span>5.0 Rating</span>
              </div>
            </div>
          </div>

          {/* Hero Featured Card Highlight */}
          <div className="lg:col-span-5">
            <div className="bg-[#090d1a]/90 border border-cyan-500/30 rounded-2xl p-5 shadow-2xl relative group hover:border-cyan-400/50 transition-all">
              <div className="absolute -top-3 left-4 px-3 py-1 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-black text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                Featured Product
              </div>

              <div className="mt-2 space-y-4">
                <div className="aspect-video rounded-xl overflow-hidden bg-slate-900 relative">
                  <img
                    src={heroProduct.image || 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg'}
                    alt={heroProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d1a] via-transparent to-transparent" />
                </div>

                <div>
                  <h3 className="font-extrabold text-lg text-white group-hover:text-cyan-400 transition-colors">
                    {heroProduct.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {heroProduct.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Starting From</span>
                    <span className="text-xl font-extrabold text-cyan-400">{heroProduct.price ? `${new Intl.NumberFormat('en-US').format(heroProduct.price)} IQD` : '1,500 IQD'}</span>
                  </div>

                  <Link
                    to={`/product/${heroProduct.id}`}
                    className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-extrabold text-xs hover:bg-cyan-400 transition-colors"
                  >
                    Get Top-Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Selection Row */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-400">
            Explore Categories
          </h2>
        </div>
        <CategoryTabs selectedCategory="All" onSelectCategory={() => {}} />
      </section>

      {/* Coming Soon Section */}
      {comingSoon.length > 0 && (
        <ProductSection
          title="Coming Soon & Pre-Orders"
          subtitle="Be first in line for upcoming blockbusters and upcoming game releases"
          icon={Clock}
          products={comingSoon}
          linkTo="/products"
          limit={4}
        />
      )}

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Most purchased digital games and top-up packages this week"
        icon={Flame}
        products={topSales}
        linkTo="/products"
        limit={8}
      />

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on top gaming codes and gift cards"
        icon={Zap}
        products={flashDeals}
        linkTo="/products"
        limit={4}
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="Hot trending items and new package additions"
        icon={TrendingUp}
        products={trending}
        linkTo="/products"
        limit={8}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated Products"
        subtitle="Highest customer rating and 100% positive feedback"
        icon={Star}
        products={topRated}
        linkTo="/products"
        limit={4}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Console & PC Games"
        subtitle="Xbox Game Pass, gift cards, and Xbox digital games"
        icon={Gamepad2}
        products={xboxGames}
        linkTo="/products?platform=Xbox"
        limit={4}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Network"
        subtitle="PSN Store Gift Cards and PlayStation titles"
        icon={Tv}
        products={playstationGames}
        linkTo="/products?platform=PlayStation"
        limit={4}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming & Steam"
        subtitle="Steam keys, Valorant Points, Fortnite V-Bucks, and PC titles"
        icon={Monitor}
        products={pcGames}
        linkTo="/products?platform=PC"
        limit={8}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Game Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, MLBB, CODM CP, and eFootball Coins"
        icon={Smartphone}
        products={mobileTopUps}
        linkTo="/products?category=Mobile Top-Ups"
        limit={8}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Digital Gift Cards"
        subtitle="Steam, PSN, Xbox, Google Play, Apple iTunes, Razer Gold, Amazon"
        icon={CreditCard}
        products={giftCards}
        linkTo="/products?category=Gift Cards"
        limit={8}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify, Canva Pro, CapCut Pro"
        icon={Sparkles}
        products={subscriptions}
        linkTo="/products?category=Subscriptions"
        limit={8}
      />
    </div>
  );
};
