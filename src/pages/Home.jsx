import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Zap,
  TrendingUp,
  Star,
  Clock,
  Box,
  Gamepad2,
  Monitor,
  Smartphone,
  CreditCard,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Gift
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductSection from '../components/ProductSection';
import ProductImage from '../components/ProductImage';
import { categories } from '../data/categories';

export default function Home({ products = [], onAddToCart }) {
  // Filter products by section
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const flashDeals = products.filter(p => p.isFlashDeal).slice(0, 4);
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);
  const topRatedProducts = products.filter(p => p.isTopRated).slice(0, 4);
  const comingSoonProducts = products.filter(p => p.isComingSoon);

  const xboxProducts = products.filter(p => p.category === 'xbox' || p.platform === 'Xbox').slice(0, 4);
  const playstationProducts = products.filter(p => p.category === 'playstation' || p.platform === 'PlayStation').slice(0, 4);
  const pcProducts = products.filter(p => p.category === 'pc' || p.platform === 'PC').slice(0, 4);
  const mobileProducts = products.filter(p => p.category === 'mobile' || p.platform === 'Mobile').slice(0, 4);
  const giftCardProducts = products.filter(p => p.category === 'giftcards' || p.platform === 'Gift Card').slice(0, 4);
  const subscriptionProducts = products.filter(p => p.category === 'subscriptions' || p.type === 'Subscription').slice(0, 4);

  // Hero main product showcase
  const heroProduct = products.find(p => p.id === 'pubg-mobile-uc') || products[0];

  return (
    <div className="space-y-12 pb-12">

      {/* Hero / Featured Showcase */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0b0f19] via-[#111827] to-[#0b0f19] border border-slate-800/80 shadow-2xl p-6 md:p-10">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

          {/* Left Text & Call to Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/80 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Gaming Store Kurdistan & Iraq</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Level Up Your Game With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">Dano Store</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Instant digital codes, mobile top-ups, game keys, gift cards, and premium subscriptions. Fast delivery with local payment support via FastPay, Korek, and MasterCard.
            </p>

            {/* Quick Hero Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/products"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-xl shadow-blue-600/25 transition-all flex items-center gap-2"
              >
                <span>Browse Store Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products?category=mobile"
                className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm transition-colors flex items-center gap-2"
              >
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span>Mobile Top-Ups</span>
              </Link>
            </div>

            {/* Key Trust Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 text-xs">
              <div>
                <span className="block font-black text-white text-base sm:text-lg">Instant</span>
                <span className="text-slate-400">Digital Delivery</span>
              </div>
              <div>
                <span className="block font-black text-cyan-400 text-base sm:text-lg">100%</span>
                <span className="text-slate-400">Legal & Guaranteed</span>
              </div>
              <div>
                <span className="block font-black text-blue-400 text-base sm:text-lg">24/7</span>
                <span className="text-slate-400">Local Support</span>
              </div>
            </div>
          </div>

          {/* Right Hero Product Feature Card */}
          {heroProduct && (
            <div className="lg:col-span-5 bg-[#090d16] border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase rounded bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  Featured Deal
                </span>
                <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{heroProduct.rating} Rating</span>
                </span>
              </div>

              <div className="h-44 rounded-xl overflow-hidden border border-slate-800">
                <ProductImage product={heroProduct} className="h-full w-full object-cover" />
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-1">{heroProduct.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{heroProduct.description}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div>
                  <span className="text-[11px] text-slate-400 block">Starting from</span>
                  <span className="text-lg font-black text-cyan-400">
                    {heroProduct.packages?.[0]?.price.toLocaleString()} IQD
                  </span>
                </div>
                <Link
                  to={`/product/${heroProduct.slug || heroProduct.id}`}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
                >
                  View Options
                </Link>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Category Icon Row */}
      <section>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
          Browse By Category
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.id === 'all' ? '/products' : `/products?category=${cat.id}`}
              className="p-3.5 rounded-xl bg-[#0b0f19] hover:bg-slate-800/80 border border-slate-800/80 hover:border-cyan-500/40 text-center transition-all group flex flex-col items-center gap-2"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700/60 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow">
                {cat.id === 'mobile' && <Smartphone className="w-5 h-5" />}
                {cat.id === 'pc' && <Monitor className="w-5 h-5" />}
                {cat.id === 'playstation' && <Gamepad2 className="w-5 h-5" />}
                {cat.id === 'xbox' && <Box className="w-5 h-5" />}
                {cat.id === 'giftcards' && <CreditCard className="w-5 h-5" />}
                {cat.id === 'subscriptions' && <Sparkles className="w-5 h-5" />}
                {cat.id === 'others' && <Gift className="w-5 h-5" />}
                {cat.id === 'all' && <Flame className="w-5 h-5" />}
              </div>
              <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Deals Section */}
      {flashDeals.length > 0 && (
        <ProductSection
          title="Flash Deals"
          subtitle="Limited time discounts on top digital games and codes"
          icon={<Zap className="w-5 h-5 text-amber-400" />}
          tag="Hot Deals"
          viewAllLink="/products"
          products={flashDeals}
          onAddToCart={onAddToCart}
        />
      )}

      {/* Coming Soon Section */}
      {comingSoonProducts.length > 0 && (
        <ProductSection
          title="Coming Soon"
          subtitle="Upcoming blockbuster game releases and pre-orders"
          icon={<Clock className="w-5 h-5 text-indigo-400" />}
          tag="Pre-Orders"
          viewAllLink="/products"
          products={comingSoonProducts}
          onAddToCart={onAddToCart}
        />
      )}

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Gaming Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, Roblox Robux, CODM CP & more"
        icon={<Smartphone className="w-5 h-5 text-cyan-400" />}
        viewAllLink="/products?category=mobile"
        products={mobileProducts}
        onAddToCart={onAddToCart}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Keys"
        subtitle="Steam, Epic, Rockstar official games with CDN images"
        icon={<Monitor className="w-5 h-5 text-blue-400" />}
        viewAllLink="/products?category=pc"
        products={pcProducts}
        onAddToCart={onAddToCart}
      />

      {/* New & Trending */}
      <ProductSection
        title="New & Trending"
        subtitle="Most popular items among gamers in Kurdistan & Iraq"
        icon={<TrendingUp className="w-5 h-5 text-emerald-400" />}
        viewAllLink="/products"
        products={trendingProducts}
        onAddToCart={onAddToCart}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Section"
        subtitle="PS5 / PS4 digital games and PSN Store Gift Cards"
        icon={<Gamepad2 className="w-5 h-5 text-indigo-400" />}
        viewAllLink="/products?category=playstation"
        products={playstationProducts}
        onAddToCart={onAddToCart}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Section"
        subtitle="Xbox Series X|S games, Xbox Game Pass & Store Gift Cards"
        icon={<Box className="w-5 h-5 text-emerald-400" />}
        viewAllLink="/products?category=xbox"
        products={xboxProducts}
        onAddToCart={onAddToCart}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Digital Gift Cards"
        subtitle="Steam Wallet, Apple, Google Play, Razer Gold & Amazon cards"
        icon={<CreditCard className="w-5 h-5 text-amber-400" />}
        viewAllLink="/products?category=giftcards"
        products={giftCardProducts}
        onAddToCart={onAddToCart}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify & Canva Pro"
        icon={<Sparkles className="w-5 h-5 text-purple-400" />}
        viewAllLink="/products?category=subscriptions"
        products={subscriptionProducts}
        onAddToCart={onAddToCart}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated Games & Services"
        subtitle="Highest customer satisfaction digital items"
        icon={<Star className="w-5 h-5 text-amber-400" />}
        viewAllLink="/products"
        products={topRatedProducts}
        onAddToCart={onAddToCart}
      />

    </div>
  );
}
