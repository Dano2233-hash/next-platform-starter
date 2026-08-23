import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, Sparkles, Trophy, Gamepad2, Smartphone, Gift, Zap, Star, ShieldCheck, ArrowRight } from 'lucide-react';
import { ProductSection } from '../components/ProductSection';
import { CategoryTabs } from '../components/CategoryTabs';
import { ProductCard } from '../components/ProductCard';

export function Home({ products, onAddToCart, onBuyNow }) {
  const navigate = useNavigate();

  // Filter categories and tags for home sections
  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
  const topRatedProducts = products.filter((p) => p.isTopRated).slice(0, 4);
  const xboxProducts = products.filter((p) => p.platform === 'xbox').slice(0, 4);
  const playstationProducts = products.filter((p) => p.platform === 'playstation').slice(0, 4);
  const pcProducts = products.filter((p) => p.platform === 'pc').slice(0, 4);
  const mobileTopUps = products.filter((p) => p.category === 'mobile').slice(0, 4);
  const giftCards = products.filter((p) => p.category === 'gift-cards').slice(0, 4);
  const subscriptions = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  const featuredHero = products.find((p) => p.id === 'gta-v') || products[0];

  return (
    <div className="space-y-12">
      {/* Hero / Featured Showcase Section */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-r from-[#070d1e] via-[#0d162d] to-[#080d1a] shadow-2xl p-6 sm:p-10">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Gaming Store for Iraq & Kurdistan</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              Level Up Your Game with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Dano Store</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Buy PC & Console Games, Mobile Top-Ups (UC, Diamonds, VP, V-Bucks), Gift Cards & Premium Subscriptions with instant local delivery via FastPay, Korek & MasterCard.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/products"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/20 flex items-center gap-2 transition-all"
              >
                <span>Browse All Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/products?category=mobile"
                className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-bold text-sm transition-colors"
              >
                Mobile Top-Ups
              </Link>
            </div>
          </div>

          {/* Featured Game Hero Card */}
          {featuredHero && (
            <div className="lg:col-span-5">
              <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-4 shadow-xl relative backdrop-blur-md">
                <span className="absolute top-6 right-6 z-10 px-2.5 py-1 rounded-md bg-cyan-500 text-slate-950 font-black text-xs">
                  FEATURED
                </span>

                <img
                  src={featuredHero.image}
                  alt={featuredHero.name}
                  className="w-full h-52 object-cover rounded-xl border border-slate-800 mb-4"
                />

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">{featuredHero.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{featuredHero.description}</p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-black text-cyan-400">{featuredHero.price} IQD</span>
                    <button
                      onClick={() => onBuyNow(featuredHero)}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-md shadow-cyan-500/20 transition-colors"
                    >
                      Instant Purchase
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Categories</h3>
        <CategoryTabs
          activeCategory="all"
          onSelectCategory={(catId) => navigate(`/products?category=${catId}`)}
        />
      </section>

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on top gaming items"
        viewAllLink="/products"
        icon={Zap}
        products={flashDeals}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="What gamers in Kurdistan & Iraq are buying right now"
        viewAllLink="/products"
        icon={Flame}
        products={trendingProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, Mobile Legends, COD Mobile CP & more"
        viewAllLink="/products?category=mobile"
        icon={Smartphone}
        products={mobileTopUps}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* Xbox Section */}
      {xboxProducts.length > 0 && (
        <ProductSection
          title="Xbox Section"
          subtitle="Xbox Game Pass, Xbox Live & Digital Xbox Cards"
          viewAllLink="/products?platform=xbox"
          icon={Gamepad2}
          products={xboxProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      )}

      {/* PlayStation Section */}
      {playstationProducts.length > 0 && (
        <ProductSection
          title="PlayStation Section"
          subtitle="PSN Gift Cards, PlayStation Plus & Console Game Codes"
          viewAllLink="/products?platform=playstation"
          icon={Gamepad2}
          products={playstationProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      )}

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Section"
        subtitle="Top Steam keys, Valorant Points & PC Masterpieces"
        viewAllLink="/products?platform=pc"
        icon={Gamepad2}
        products={pcProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards Section"
        subtitle="Steam Wallet, iTunes, Google Play, Razer Gold & Amazon"
        viewAllLink="/products?category=gift-cards"
        icon={Gift}
        products={giftCards}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Subscriptions Section"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify & Canva Pro"
        viewAllLink="/products?category=subscriptions"
        icon={Sparkles}
        products={subscriptions}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated Products"
        subtitle="Highest customer ratings & verified reviews"
        viewAllLink="/products"
        icon={Trophy}
        products={topRatedProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* Coming Soon Banner */}
      <section className="p-8 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/60 border border-purple-500/30 text-center space-y-3">
        <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold uppercase tracking-wider">
          Coming Soon
        </div>
        <h3 className="text-2xl font-black text-white">Console Game Digital Keys & Hardware pre-orders</h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          We are expanding Dano Store with direct console license keys, custom gaming hardware, and regional tournament passes!
        </p>
      </section>
    </div>
  );
}
