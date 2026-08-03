import React from 'react';
import { ShoppingBag, ArrowRight, ShieldCheck, Flame, Star, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import ProductSection from '../components/ProductSection';
import SectionHeader from '../components/SectionHeader';
import { formatPrice } from '../utils/formatPrice';

export default function Home({ products, onAddToCart, onBuyNow }) {
  const navigate = useNavigate();

  // Find Featured Hero product (with standard visual image check)
  const heroProduct = products.find((p) => p.isFeatured) || products[0];

  // Filters for Homepage sections
  const comingSoonProducts = products.filter((p) => p.tag?.toLowerCase() === 'coming soon').slice(0, 4);
  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
  const topRated = products.filter((p) => p.isTopRated).slice(0, 4);

  // Platform sections
  const xboxSection = products.filter((p) => p.category === 'xbox').slice(0, 4);
  const playstationSection = products.filter((p) => p.category === 'playstation').slice(0, 4);
  const pcSection = products.filter((p) => p.category === 'pc' && p.type === 'Game').slice(0, 4);
  const mobileSection = products.filter((p) => p.category === 'mobile').slice(0, 4);
  const giftcardsSection = products.filter((p) => p.category === 'giftcards').slice(0, 4);
  const subscriptionsSection = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  return (
    <div className="space-y-12">
      {/* 1. HERO / FEATURED SECTION */}
      {heroProduct && (
        <section className="relative rounded-2xl overflow-hidden bg-[#070712] border border-[#111125] p-6 sm:p-10 md:p-16 flex flex-col md:flex-row items-center gap-8 min-h-[400px]">
          {/* Subtle Cyber Glow background behind Hero */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#0066ff]/5 rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-[#7000ff]/5 rounded-full filter blur-2xl pointer-events-none" />

          {/* Left Hero Details */}
          <div className="flex-1 space-y-4 z-10">
            <span className="bg-[#7000ff]/30 text-[#00e5ff] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-[#7000ff]/40">
              🔥 TOP SPOTLIGHT
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
              {heroProduct.name}
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm max-w-lg leading-relaxed">
              {heroProduct.description}
            </p>

            <div className="flex items-center gap-4 py-2">
              <div>
                <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest block">Kurdistan Price</span>
                <span className="text-xl sm:text-2xl font-black text-[#00e5ff] tracking-tight">{formatPrice(heroProduct.price)}</span>
              </div>
              {heroProduct.oldPrice && (
                <div>
                  <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest block line-through">Retail price</span>
                  <span className="text-xs font-bold text-gray-500 line-through">{formatPrice(heroProduct.oldPrice)}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => onBuyNow(heroProduct)}
                className="bg-gradient-to-r from-[#0066ff] to-[#7000ff] hover:glow-blue text-white text-xs font-black px-8 py-3.5 rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 transition-premium"
              >
                Instant Buy Now
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
              <Link
                to={`/products/${heroProduct.slug}`}
                className="bg-[#0a0a16] border border-[#1a1a2e] hover:border-gray-700 text-gray-300 text-xs font-bold px-6 py-3.5 rounded-xl uppercase tracking-wider text-center transition-premium"
              >
                View Packages
              </Link>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="w-full md:w-5/12 aspect-video md:aspect-auto md:h-64 rounded-xl overflow-hidden bg-[#030308] border border-[#111122] shadow-2xl relative group shrink-0">
            <ProductImage product={heroProduct} className="w-full h-full object-cover group-hover:scale-105" />
          </div>
        </section>
      )}

      {/* 2. CATEGORY ROW */}
      <section className="bg-[#090911]/60 border border-[#121225] p-5 rounded-2xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
          <Link to="/products?category=xbox" className="p-3 bg-black/40 rounded-xl border border-[#121225] hover:border-[#107c10]/40 transition-premium group">
            <span className="text-lg block group-hover:scale-110 transition-premium">🎮</span>
            <span className="text-[10px] uppercase font-black text-gray-400 group-hover:text-white transition-premium tracking-wide block mt-2">Xbox</span>
          </Link>
          <Link to="/products?category=playstation" className="p-3 bg-black/40 rounded-xl border border-[#121225] hover:border-[#003785]/40 transition-premium group">
            <span className="text-lg block group-hover:scale-110 transition-premium">👾</span>
            <span className="text-[10px] uppercase font-black text-gray-400 group-hover:text-white transition-premium tracking-wide block mt-2">PlayStation</span>
          </Link>
          <Link to="/products?category=pc" className="p-3 bg-black/40 rounded-xl border border-[#121225] hover:border-[#7000ff]/40 transition-premium group">
            <span className="text-lg block group-hover:scale-110 transition-premium">💻</span>
            <span className="text-[10px] uppercase font-black text-gray-400 group-hover:text-white transition-premium tracking-wide block mt-2">PC Store</span>
          </Link>
          <Link to="/products?category=mobile" className="p-3 bg-black/40 rounded-xl border border-[#121225] hover:border-[#ff0055]/40 transition-premium group">
            <span className="text-lg block group-hover:scale-110 transition-premium">📱</span>
            <span className="text-[10px] uppercase font-black text-gray-400 group-hover:text-white transition-premium tracking-wide block mt-2">Mobile Topups</span>
          </Link>
          <Link to="/products?category=giftcards" className="p-3 bg-black/40 rounded-xl border border-[#121225] hover:border-[#ffaa00]/40 transition-premium group">
            <span className="text-lg block group-hover:scale-110 transition-premium">💳</span>
            <span className="text-[10px] uppercase font-black text-gray-400 group-hover:text-white transition-premium tracking-wide block mt-2">Gift Cards</span>
          </Link>
          <Link to="/products?category=subscriptions" className="p-3 bg-black/40 rounded-xl border border-[#121225] hover:border-[#00e5ff]/40 transition-premium group">
            <span className="text-lg block group-hover:scale-110 transition-premium">👑</span>
            <span className="text-[10px] uppercase font-black text-gray-400 group-hover:text-white transition-premium tracking-wide block mt-2">Subs</span>
          </Link>
          <Link to="/products?category=others" className="p-3 bg-black/40 rounded-xl border border-[#121225] hover:border-gray-500 transition-premium group">
            <span className="text-lg block group-hover:scale-110 transition-premium">⚙️</span>
            <span className="text-[10px] uppercase font-black text-gray-400 group-hover:text-white transition-premium tracking-wide block mt-2">Others</span>
          </Link>
        </div>
      </section>

      {/* 3. PROMOTIONAL SECTIONS */}
      {comingSoonProducts.length > 0 && (
        <ProductSection
          title="⏰ Coming Soon"
          subtitle="Pre-order upcoming blockbusters & subscriptions before anyone else"
          badge="Pre-order"
          products={comingSoonProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      )}

      <ProductSection
        title="⚡ Flash Deals"
        subtitle="Exclusive heavy discounts for Kurdistan and Iraq gamers"
        badge="Hot Sales"
        products={flashDeals}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      <ProductSection
        title="✨ New & Trending"
        subtitle="Popular items trending right now across our Kurdish community"
        badge="Trending"
        products={trendingProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      <ProductSection
        title="⭐️ Top Rated"
        subtitle="Highly recommended digital services vetted by the store administration"
        badge="Best Seller"
        products={topRated}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* 4. PLATFORMS & SECTIONS */}
      <ProductSection
        title="💚 Xbox Section"
        subtitle="Buy Xbox Game Pass, gold packages, and digital download keys"
        products={xboxSection}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      <ProductSection
        title="💙 PlayStation Section"
        subtitle="PlayStation Network US gift cards, PS Plus, and official add-ons"
        products={playstationSection}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      <ProductSection
        title="🖥️ PC Gaming Section"
        subtitle="Best paid Steam and Epic Games titles, activation codes and digital coins"
        products={pcSection}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      <ProductSection
        title="📲 Mobile Top-Ups Section"
        subtitle="Instant UC, Diamonds, Robux, and game points. Player ID delivery"
        products={mobileSection}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      <ProductSection
        title="💳 Gift Cards Section"
        subtitle="Steam Wallet, iTunes, Google Play, Razer Gold, Amazon codes"
        products={giftcardsSection}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      <ProductSection
        title="🎟️ Subscriptions Section"
        subtitle="Discord Nitro, YouTube Premium, Netflix UltraHD, Canva Pro, Spotify"
        products={subscriptionsSection}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* 5. PROFESSIONAL INFO HERO */}
      <section className="bg-gradient-to-r from-[#030308] via-[#090915] to-[#030308] border border-[#111124] rounded-2xl p-8 text-center space-y-4 relative overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] text-[10rem] font-black text-white/2 pointer-events-none">DANO</div>
        <h2 className="text-base sm:text-lg font-black tracking-widest text-white uppercase">WHY CHOOSE DANO STORE?</h2>
        <p className="text-gray-400 text-xs max-w-2xl mx-auto leading-relaxed">
          We are the most popular manual gaming service in Kurdistan. Our staff operates around the clock to ensure you receive your game cards, UC pins, and Discord subscriptions in record time.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4 text-left">
          <div className="p-4 bg-black/40 rounded-xl border border-[#121225] flex gap-3 items-start">
            <ShieldCheck className="w-5 h-5 text-[#00e5ff] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-extrabold uppercase text-white">100% Legal & Safe</h4>
              <p className="text-[10px] text-gray-500 mt-1 leading-normal">All gift codes, keys, and top-ups are sourced directly from authorized platforms.</p>
            </div>
          </div>
          <div className="p-4 bg-black/40 rounded-xl border border-[#121225] flex gap-3 items-start">
            <Flame className="w-5 h-5 text-[#7000ff] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-extrabold uppercase text-white">Super Fast Support</h4>
              <p className="text-[10px] text-gray-500 mt-1 leading-normal">Our dedicated staff verifies and completes payment confirmations in 5-15 minutes.</p>
            </div>
          </div>
          <div className="p-4 bg-black/40 rounded-xl border border-[#121225] flex gap-3 items-start">
            <Award className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-extrabold uppercase text-white">Best IQD Rates</h4>
              <p className="text-[10px] text-gray-500 mt-1 leading-normal">Optimized IQD packages crafted uniquely for Iraqi and Kurdish gaming communities.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
