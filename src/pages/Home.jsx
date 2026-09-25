import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Zap, Flame, Star, Sparkles, Gamepad2, Gamepad, Monitor,
  Smartphone, Gift, Clock, ShieldCheck, ArrowRight, ShieldAlert
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import ProductSection from '../components/ProductSection';
import CategoryTabs from '../components/CategoryTabs';

export default function Home() {
  const { products } = useProducts();
  const navigate = useNavigate();

  // Filtered collections
  const flashDeals = products.filter(p => p.isFlashDeal);
  const topSales = products.filter(p => p.soldCount >= 2000).slice(0, 4);
  const trending = products.filter(p => p.isTrending);
  const topRated = products.filter(p => p.isTopRated || p.rating >= 4.8);

  const xboxProducts = products.filter(p => p.category === 'xbox' || p.platform === 'Xbox');
  const psProducts = products.filter(p => p.category === 'playstation' || p.platform === 'PlayStation');
  const pcProducts = products.filter(p => p.category === 'pc' || p.platform === 'PC');
  const mobileProducts = products.filter(p => p.category === 'mobile' || p.platform === 'Mobile');
  const giftCardProducts = products.filter(p => p.category === 'gift-cards' || p.platform === 'Gift Card');
  const subscriptionProducts = products.filter(p => p.category === 'subscriptions' || p.platform === 'Subscription');

  const heroFeaturedProduct = products.find(p => p.id === 'pubg-mobile-uc') || products[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">

      {/* HERO / FEATURED BANNER */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0d162f] via-[#0b1226] to-[#05070f] border border-slate-800 shadow-2xl p-6 sm:p-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Official Gaming Store in Kurdistan & Iraq</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Top-Up Game Cards, UC, & PC Keys <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Instantly</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto lg:mx-0">
              Get instant PUBG UC, Free Fire Diamonds, Valorant VP, Steam Wallet codes, and original PC/Console keys with direct Kurdistan & Iraq local payment support.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => navigate('/products')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-cyan-950/50 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Browse Store</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/products?category=mobile')}
                className="px-6 py-3 bg-[#0a0f21] hover:bg-slate-800 text-slate-200 font-bold text-sm rounded-xl border border-slate-700 transition-colors cursor-pointer"
              >
                Mobile Top-Ups
              </button>
            </div>

            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-slate-400 text-xs border-t border-slate-800/80">
              <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>FastPay & Korek</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Instant Delivery</span>
              </div>
            </div>
          </div>

          {/* Hero Featured Card Highlight */}
          {heroFeaturedProduct && (
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-[#080d1e] border border-cyan-500/30 rounded-2xl p-5 shadow-2xl relative group hover:border-cyan-400/60 transition-all">
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-[10px] uppercase rounded-md shadow">
                  #1 Best Seller
                </div>
                <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider mb-2">
                  Featured Instant Top-Up
                </div>
                <h3 className="text-lg font-black text-white mb-2">{heroFeaturedProduct.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-4">{heroFeaturedProduct.description}</p>
                <div className="flex items-baseline justify-between pt-2 border-t border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Starting From</span>
                    <span className="text-lg font-black text-cyan-400">{heroFeaturedProduct.price} IQD</span>
                  </div>
                  <button
                    onClick={() => navigate(`/product/${heroFeaturedProduct.id}`)}
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Get Code Now
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* CATEGORY SELECTOR ROW */}
      <section>
        <div className="mb-4">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest">
            Quick Categories
          </h2>
        </div>
        <CategoryTabs selectedCategory="all" onSelectCategory={(catId) => {
          if (catId === 'all') navigate('/products');
          else navigate(`/products?category=${catId}`);
        }} />
      </section>

      {/* COMING SOON BANNER */}
      <section className="bg-gradient-to-r from-purple-950/40 via-[#0a0f21] to-[#05070f] border border-purple-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 flex-shrink-0">
            <Sparkles className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-500/20 text-purple-300 rounded uppercase">
              Coming Soon
            </span>
            <h4 className="font-extrabold text-slate-100 text-sm mt-0.5">
              GTA 6 Digital Pre-Orders & EA Sports FC 25 Coins
            </h4>
            <p className="text-xs text-slate-400">
              New official global gift card brands & instant top-up systems joining Dano Store soon.
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/products')}
          className="px-4 py-2 bg-purple-900/60 hover:bg-purple-800 text-purple-200 text-xs font-bold rounded-xl border border-purple-500/40 whitespace-nowrap"
        >
          Explore Catalog
        </button>
      </section>

      {/* FLASH DEALS */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on top gaming codes"
        icon={Zap}
        viewAllPath="/products?filter=flash"
        products={flashDeals.slice(0, 4)}
      />

      {/* TOP SALES */}
      <ProductSection
        title="Top Sales in Iraq"
        subtitle="Most purchased packages by gamers across Erbil, Sulaymaniyah, and Baghdad"
        icon={Flame}
        viewAllPath="/products?filter=top-sales"
        products={topSales}
      />

      {/* NEW & TRENDING */}
      <ProductSection
        title="New & Trending"
        subtitle="Hot trending releases and recently updated game titles"
        icon={Sparkles}
        viewAllPath="/products?filter=trending"
        products={trending.slice(0, 4)}
      />

      {/* TOP RATED */}
      <ProductSection
        title="Top Rated Games & Services"
        subtitle="Highest customer rating and 100% positive feedback"
        icon={Star}
        viewAllPath="/products?filter=top-rated"
        products={topRated.slice(0, 4)}
      />

      {/* MOBILE TOP-UPS SECTION */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, Roblox Robux, Mobile Legends"
        icon={Smartphone}
        viewAllPath="/products?category=mobile"
        products={mobileProducts.slice(0, 4)}
      />

      {/* PC GAMING SECTION */}
      <ProductSection
        title="PC Gaming Store"
        subtitle="Steam keys for GTA V, Elden Ring, Red Dead Redemption 2, Valorant VP"
        icon={Monitor}
        viewAllPath="/products?category=pc"
        products={pcProducts.slice(0, 4)}
      />

      {/* GIFT CARDS SECTION */}
      <ProductSection
        title="Gift Cards"
        subtitle="Steam Wallet, PlayStation, Xbox, Google Play, Apple Gift Cards"
        icon={Gift}
        viewAllPath="/products?category=gift-cards"
        products={giftCardProducts.slice(0, 4)}
      />

      {/* SUBSCRIPTIONS SECTION */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix 4K, Spotify Premium"
        icon={Sparkles}
        viewAllPath="/products?category=subscriptions"
        products={subscriptionProducts.slice(0, 4)}
      />

      {/* PLAYSTATION SECTION */}
      <ProductSection
        title="PlayStation Section"
        subtitle="PSN Gift Cards and PlayStation game codes"
        icon={Gamepad}
        viewAllPath="/products?category=playstation"
        products={psProducts.slice(0, 4)}
      />

      {/* XBOX SECTION */}
      <ProductSection
        title="Xbox Section"
        subtitle="Xbox Gift Cards and Xbox Digital games"
        icon={Gamepad2}
        viewAllPath="/products?category=xbox"
        products={xboxProducts.slice(0, 4)}
      />

    </div>
  );
}
