import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flame,
  Zap,
  Star,
  Sparkles,
  Box,
  Gamepad2,
  Monitor,
  Smartphone,
  CreditCard,
  Clock,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import ProductSection from '../components/ProductSection';
import CategoryTabs from '../components/CategoryTabs';
import ProductCard from '../components/ProductCard';

export default function Home({ products, onAddToCart, onBuyNow }) {
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  // Filter sections
  const featuredProducts = products.filter((p) => p.isFeatured);
  const trendingProducts = products.filter((p) => p.isTrending);
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const topRatedProducts = products.filter((p) => p.isTopRated);

  const xboxProducts = products.filter((p) => p.platform === 'Xbox' || p.category === 'xbox');
  const psProducts = products.filter((p) => p.platform === 'PlayStation' || p.category === 'playstation');
  const pcProducts = products.filter((p) => p.platform === 'PC' || p.category === 'pc');
  const mobileProducts = products.filter((p) => p.platform === 'Mobile' || p.category === 'mobile');
  const giftCards = products.filter((p) => p.platform === 'Gift Card' || p.category === 'gift-cards');
  const subscriptions = products.filter((p) => p.type === 'Subscription' || p.category === 'subscriptions');

  // Filtered catalog by tab
  const tabProducts = activeTab === 'all'
    ? products.slice(0, 8)
    : products.filter((p) => p.category === activeTab).slice(0, 8);

  return (
    <div className="space-y-12 pb-16">

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-[#05070f] border border-slate-800/80 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Official Gaming Store in Kurdistan & Iraq</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Instant Game Top-Ups, Digital Keys & Subscriptions
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Fast, secure, and direct manual payments via <strong className="text-cyan-400 font-bold">FastPay</strong>, <strong className="text-cyan-400 font-bold">Korek Cash</strong>, and <strong className="text-cyan-400 font-bold">MasterCard</strong>. Get your PUBG UC, Free Fire Diamonds, Steam Wallet, and PC/Console game licenses delivered instantly.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/products"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white font-extrabold text-sm hover:brightness-110 transition shadow-lg shadow-blue-600/30 flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Browse Store Catalog</span>
            </Link>

            <Link
              to="/products?category=mobile"
              className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-200 hover:text-white hover:bg-slate-800 font-bold text-sm transition"
            >
              Mobile Top-Ups
            </Link>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Explore Categories</h3>
        <CategoryTabs activeCategory={activeTab} onSelectCategory={setActiveTab} />

        {/* Category Filter Output Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {tabProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      </section>

      {/* Coming Soon Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-blue-950 border border-purple-800/40 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">Upcoming Releases</span>
            <h3 className="text-lg font-extrabold text-white">GTA VI & Monster Hunter Wilds Coming Soon!</h3>
            <p className="text-xs text-slate-400 mt-0.5">Pre-order reservations opening shortly for Kurdistan gamers.</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/products')}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shrink-0"
        >
          View All Games
        </button>
      </section>

      {/* Flash Deals */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on top gaming codes & top-ups"
        icon={Zap}
        products={flashDeals}
        viewAllLink="/products?filter=flash"
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        limit={4}
      />

      {/* Top Sales */}
      <ProductSection
        title="Top Sales"
        subtitle="Most popular items bought by gamers in Erbil, Sulaymaniyah & Duhok"
        icon={Flame}
        products={featuredProducts}
        viewAllLink="/products"
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        limit={4}
      />

      {/* New & Trending */}
      <ProductSection
        title="New & Trending"
        subtitle="Fresh additions, trending game codes and pass memberships"
        icon={TrendingUp}
        products={trendingProducts}
        viewAllLink="/products"
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        limit={4}
      />

      {/* Top Rated */}
      <ProductSection
        title="Top Rated Products"
        subtitle="Highest rated digital items verified by player reviews"
        icon={Star}
        products={topRatedProducts}
        viewAllLink="/products"
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        limit={4}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, MLBB, COD CP and more"
        icon={Smartphone}
        products={mobileProducts}
        viewAllLink="/products?category=mobile"
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        limit={4}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming & Steam Keys"
        subtitle="Official paid Steam game licenses & Valorant Points"
        icon={Monitor}
        products={pcProducts}
        viewAllLink="/products?category=pc"
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        limit={4}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Section"
        subtitle="PS5 & PS4 digital games, network cards and add-ons"
        icon={Gamepad2}
        products={psProducts}
        viewAllLink="/products?platform=PlayStation"
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        limit={4}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Section"
        subtitle="Xbox Series X|S digital licenses and Xbox Gift Cards"
        icon={Box}
        products={xboxProducts}
        viewAllLink="/products?platform=Xbox"
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        limit={4}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards Section"
        subtitle="Steam, PSN, Xbox, Google Play, Apple & Razer Gold"
        icon={CreditCard}
        products={giftCards}
        viewAllLink="/products?category=gift-cards"
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        limit={4}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify & Canva Pro"
        icon={Zap}
        products={subscriptions}
        viewAllLink="/products?category=subscriptions"
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        limit={4}
      />

    </div>
  );
}
