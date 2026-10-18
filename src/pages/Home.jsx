import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Gamepad2,
  Smartphone,
  Gift,
  Sparkles,
  Zap,
  TrendingUp,
  Star,
  Clock,
  ShieldCheck,
  ChevronRight,
  Flame,
  Search,
  Monitor,
  Tv
} from 'lucide-react';

import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';
import ProductImage from '../components/ProductImage';
import { useProducts } from '../hooks/useProducts';

export default function Home() {
  const { products } = useProducts();
  const navigate = useNavigate();

  // Filtered lists for Home sections
  const featuredProducts = products.filter((p) => p.isFeatured);
  const comingSoonProducts = products.filter((p) => p.stock === 0 || p.tag === 'Coming Soon');
  const topSalesProducts = [...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, 8);
  const flashDealsProducts = products.filter((p) => p.isFlashDeal);
  const newAndTrendingProducts = products.filter((p) => p.isTrending);
  const topRatedProducts = products.filter((p) => p.isTopRated);

  const xboxProducts = products.filter((p) => p.platform === 'Xbox');
  const psProducts = products.filter((p) => p.platform === 'PlayStation');
  const pcProducts = products.filter((p) => p.platform === 'PC');
  const mobileProducts = products.filter((p) => p.category === 'mobile-topups');
  const giftCardsProducts = products.filter((p) => p.category === 'gift-cards');
  const subProducts = products.filter((p) => p.category === 'subscriptions');

  const categoriesOverview = [
    { name: 'PC Gaming', icon: Monitor, count: pcProducts.length, link: '/products?platform=PC', color: 'from-blue-600/20 to-cyan-500/20 border-cyan-500/40 text-cyan-400' },
    { name: 'Mobile Top-Ups', icon: Smartphone, count: mobileProducts.length, link: '/products?category=mobile-topups', color: 'from-cyan-600/20 to-blue-500/20 border-blue-500/40 text-blue-400' },
    { name: 'Gift Cards', icon: Gift, count: giftCardsProducts.length, link: '/products?category=gift-cards', color: 'from-purple-600/20 to-indigo-500/20 border-purple-500/40 text-purple-400' },
    { name: 'Subscriptions', icon: Sparkles, count: subProducts.length, link: '/products?category=subscriptions', color: 'from-indigo-600/20 to-pink-500/20 border-indigo-500/40 text-indigo-400' },
    { name: 'PlayStation', icon: Tv, count: psProducts.length, link: '/products?platform=PlayStation', color: 'from-blue-700/20 to-purple-600/20 border-blue-400/40 text-blue-300' },
    { name: 'Xbox Series', icon: Gamepad2, count: xboxProducts.length, link: '/products?platform=Xbox', color: 'from-emerald-600/20 to-green-500/20 border-emerald-500/40 text-emerald-400' }
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12 bg-gradient-to-b from-[#080d1e] via-[#05070f] to-[#05070f] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                <Flame className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Iraq & Kurdistan #1 Digital Gaming Store</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Level Up Your Gaming Experience with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Dano Store</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Instant delivery on PC games, PUBG Mobile UC, Free Fire Diamonds, Steam Gift Cards, Discord Nitro, and digital memberships in IQD. Fast & 100% verified.
              </p>

              {/* Quick Search & CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start pt-2">
                <Link
                  to="/products"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-lg shadow-cyan-500/25 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Browse All Products</span>
                </Link>

                <Link
                  to="/products?category=mobile-topups"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-700 hover:border-slate-600 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  <span>Mobile Top-Ups</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-medium border-t border-slate-800/80">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" /> Instant Key & ID Delivery
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" /> FastPay / Korek / MasterCard
                </span>
              </div>
            </div>

            {/* Hero Right Featured Spotlight Card */}
            <div className="lg:col-span-5">
              {featuredProducts.length > 0 && (
                <div className="relative bg-[#0b0f1d] border border-cyan-500/40 rounded-2xl p-4 shadow-2xl shadow-cyan-500/10 hover:border-cyan-400 transition-all">
                  <div className="absolute top-6 left-6 z-10 px-2.5 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-black rounded-md uppercase tracking-wider shadow-md">
                    Featured Spotlight
                  </div>
                  <ProductImage
                    src={featuredProducts[0].image}
                    alt={featuredProducts[0].name}
                    category={featuredProducts[0].category}
                    platform={featuredProducts[0].platform}
                    className="w-full h-64 rounded-xl object-cover mb-4"
                  />
                  <div className="space-y-2">
                    <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                      {featuredProducts[0].platform} • {featuredProducts[0].type}
                    </span>
                    <h3 className="text-lg font-extrabold text-white line-clamp-1">
                      {featuredProducts[0].name}
                    </h3>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-cyan-400 text-xl font-black">
                        From {featuredProducts[0].price.toLocaleString()} IQD
                      </span>
                      <button
                        onClick={() => navigate(`/product/${featuredProducts[0].id}`)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold rounded-lg cursor-pointer hover:brightness-110"
                      >
                        Get Key
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categoriesOverview.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                to={cat.link}
                className={`p-4 rounded-xl bg-gradient-to-br ${cat.color} border transition-all duration-200 hover:scale-105 flex flex-col items-center text-center justify-center gap-2 group cursor-pointer shadow-md`}
              >
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 group-hover:border-cyan-400/50">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-100 text-xs group-hover:text-cyan-300">
                    {cat.name}
                  </h4>
                  <span className="text-[10px] text-slate-400">{cat.count} items</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Most popular items bought by Kurdish and Iraqi gamers this week"
        icon={Flame}
        badge="Best Sellers"
        products={topSalesProducts}
        viewAllLink="/products"
        limit={8}
      />

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on games and gift cards"
        icon={Zap}
        badge="On Sale"
        products={flashDealsProducts}
        viewAllLink="/products?category=paid-games"
        limit={4}
      />

      {/* New & Trending */}
      <ProductSection
        title="New & Trending"
        subtitle="Hot releases and popular top-ups right now"
        icon={TrendingUp}
        badge="Trending"
        products={newAndTrendingProducts}
        viewAllLink="/products"
        limit={8}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups & In-Game Coins"
        subtitle="Instant UC, Free Fire Diamonds, V-Bucks, Robux & COD Points"
        icon={Smartphone}
        badge="Instant Player ID"
        products={mobileProducts}
        viewAllLink="/products?category=mobile-topups"
        limit={8}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Store"
        subtitle="Original Steam, Epic & Ubisoft license keys"
        icon={Monitor}
        badge="Steam CDN"
        products={pcProducts}
        viewAllLink="/products?platform=PC"
        limit={8}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated Products"
        subtitle="Highest customer satisfaction ratings"
        icon={Star}
        badge="5.0 Stars"
        products={topRatedProducts}
        viewAllLink="/products"
        limit={4}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Digital Gift Cards"
        subtitle="Steam, PlayStation, Xbox, Google Play, Apple & Razer Gold"
        icon={Gift}
        badge="Global Codes"
        products={giftCardsProducts}
        viewAllLink="/products?category=gift-cards"
        limit={8}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Subscriptions & Digital Services"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify & Canva Pro"
        icon={Sparkles}
        badge="Instant Upgrade"
        products={subProducts}
        viewAllLink="/products?category=subscriptions"
        limit={8}
      />

      {/* Xbox & PlayStation Dual Highlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PlayStation Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/80 to-slate-900 border border-blue-500/30 flex flex-col justify-between space-y-4">
            <div>
              <span className="px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold text-xs uppercase">
                PlayStation Store
              </span>
              <h3 className="text-xl font-extrabold text-white mt-2">
                PSN Gift Cards & PS Plus Subscriptions
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Recharge your PS4 and PS5 account safely in IQD. Instant digital code delivery.
              </p>
            </div>
            <Link
              to="/products?platform=PlayStation"
              className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 self-start"
            >
              <span>Explore PlayStation</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Xbox Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/30 flex flex-col justify-between space-y-4">
            <div>
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase">
                Xbox Series X|S
              </span>
              <h3 className="text-xl font-extrabold text-white mt-2">
                Xbox Game Pass Ultimate & Cards
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Access hundreds of high quality games on Xbox and PC with official gift codes.
              </p>
            </div>
            <Link
              to="/products?platform=Xbox"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 self-start"
            >
              <span>Explore Xbox</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      {comingSoonProducts.length > 0 && (
        <ProductSection
          title="Coming Soon"
          subtitle="Upcoming title pre-orders and restocks"
          icon={Clock}
          badge="Restocking"
          products={comingSoonProducts}
          viewAllLink="/products"
          limit={4}
        />
      )}
    </div>
  );
}
