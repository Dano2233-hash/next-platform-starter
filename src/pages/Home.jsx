import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Compass, Sparkles } from 'lucide-react';
import CategoryTabs from '../components/CategoryTabs';
import ProductSection from '../components/ProductSection';

export default function Home({ products, onAddToCart }) {
  const navigate = useNavigate();

  // Filters
  const featured = products.filter((p) => p.isFeatured).slice(0, 4);
  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const trending = products.filter((p) => p.isTrending).slice(0, 4);
  const topRated = products.filter((p) => p.isTopRated).slice(0, 4);

  const xboxProducts = products.filter((p) => p.category === 'xbox').slice(0, 4);
  const playstationProducts = products.filter((p) => p.category === 'playstation').slice(0, 4);
  const pcProducts = products.filter((p) => p.category === 'pc').slice(0, 4);
  const mobileProducts = products.filter((p) => p.category === 'mobile').slice(0, 4);
  const giftcardsProducts = products.filter((p) => p.category === 'giftcards').slice(0, 4);
  const subscriptionsProducts = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  // Coming Soon simulation
  const comingSoon = products.filter((p) => p.tag === 'coming-soon' || p.stock === 0).slice(0, 4);

  return (
    <div className="space-y-12">
      {/* Hero / Featured Banner Section */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c0d12] via-[#10121a] to-[#1d122e] border border-[#1a1e29] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0066ff]/10 via-transparent to-transparent"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#7000ff]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-xl z-10 space-y-5">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-[#00e5ff] uppercase bg-[#00e5ff]/10 px-3 py-1 rounded-full border border-[#00e5ff]/25">
            <Sparkles size={11} className="animate-pulse" />
            Voted No. 1 Gaming Shop in Kurdistan
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.1] uppercase">
            Elevate Your <span className="bg-gradient-to-r from-[#00e5ff] via-[#0066ff] to-[#7000ff] bg-clip-text text-transparent">Gaming World</span>
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            Get instant legal game keys, official top-ups, and subscriptions at the lowest rates in Iraq. Safe manual payments via FastPay & Korek with 24/7 client service.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/products"
              className="px-6 py-3 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-xs font-black text-white transition-all duration-200 shadow-lg shadow-[#0066ff]/25 flex items-center gap-2 group select-none"
            >
              BROWSE STORE
              <ChevronRight size={14} className="transform group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/products?category=mobile"
              className="px-6 py-3 rounded-xl bg-[#0c0d12]/90 hover:bg-[#151824] border border-[#1a1e29] text-xs font-black text-gray-300 hover:text-white transition-all"
            >
              MOBILE TOP-UPS
            </Link>
          </div>
        </div>

        {/* Hero visual elements */}
        <div className="relative shrink-0 w-full max-w-[280px] md:max-w-[340px] aspect-square rounded-2xl border border-dashed border-[#1a1e29] flex items-center justify-center bg-[#050505]/60 overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0066ff]/5 to-[#7000ff]/5"></div>
          <div className="p-8 text-center space-y-4 z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-[#7000ff] to-[#0066ff] text-white shadow-xl shadow-[#0066ff]/20">
              <Compass size={32} className="animate-spin-slow" />
            </div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">Instant Delivery</h3>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Official game codes and top-ups processed securely inside Iraq. No wait times.
            </p>
          </div>
        </div>
      </section>

      {/* Category Tabs Row */}
      <section className="bg-[#0c0d12]/60 p-4 rounded-2xl border border-[#1a1e29] shadow-xl">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-3 px-1">Shop By Categories</h3>
        <CategoryTabs selectedCategory="all" onSelectCategory={(catId) => navigate(`/products?category=${catId}`)} />
      </section>

      {/* FLASH DEALS SECTION */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited Time Offers"
        products={flashDeals}
        onAddToCart={onAddToCart}
        badge="Flash"
        viewAllLink="/products"
      />

      {/* NEW & TRENDING SECTION */}
      <ProductSection
        title="New & Trending"
        subtitle="Hot Releases"
        products={trending}
        onAddToCart={onAddToCart}
        badge="Trending"
        viewAllLink="/products"
      />

      {/* TOP RATED SECTION */}
      <ProductSection
        title="Top Rated"
        subtitle="Highly Recommended"
        products={topRated}
        onAddToCart={onAddToCart}
        badge="Top Rated"
        viewAllLink="/products"
      />

      {/* XBOX SECTION */}
      <ProductSection
        title="Xbox Game Zone"
        subtitle="Consoles & Passes"
        products={xboxProducts}
        onAddToCart={onAddToCart}
        viewAllLink="/products?category=xbox"
      />

      {/* PLAYSTATION SECTION */}
      <ProductSection
        title="PlayStation Hub"
        subtitle="Keys & Network Codes"
        products={playstationProducts}
        onAddToCart={onAddToCart}
        viewAllLink="/products?category=playstation"
      />

      {/* PC GAMING SECTION */}
      <ProductSection
        title="PC Gaming Store"
        subtitle="Steam, Epic, & Battle.net"
        products={pcProducts}
        onAddToCart={onAddToCart}
        viewAllLink="/products?category=pc"
      />

      {/* MOBILE TOP-UPS SECTION */}
      <ProductSection
        title="Mobile Game Top-Ups"
        subtitle="Diamonds, UC, & Points"
        products={mobileProducts}
        onAddToCart={onAddToCart}
        viewAllLink="/products?category=mobile"
      />

      {/* GIFT CARDS SECTION */}
      <ProductSection
        title="Digital Gift Cards"
        subtitle="Razer, Steam, PSN, Apple"
        products={giftcardsProducts}
        onAddToCart={onAddToCart}
        viewAllLink="/products?category=giftcards"
      />

      {/* SUBSCRIPTIONS SECTION */}
      <ProductSection
        title="Premium Subscriptions"
        subtitle="Nitro, YouTube, Netflix"
        products={subscriptionsProducts}
        onAddToCart={onAddToCart}
        viewAllLink="/products?category=subscriptions"
      />

      {/* COMING SOON SECTION */}
      {comingSoon.length > 0 && (
        <ProductSection
          title="Coming Soon"
          subtitle="Pre-order & Wishlist"
          products={comingSoon}
          onAddToCart={onAddToCart}
          badge="Upcoming"
          viewAllLink="/products"
        />
      )}
    </div>
  );
}
