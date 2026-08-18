import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductSection } from '../components/ProductSection';
import { CategoryTabs } from '../components/CategoryTabs';
import { Gamepad2, Flame, Zap, Award, Sparkles, Clock, ArrowRight, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export function Home({ products, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    if (catId !== 'all') {
      navigate(`/products?category=${catId}`);
    }
  };

  // Section Filters
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);
  const flashDeals = products.filter((p) => p.isFlashDeal || p.oldPrice).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 8);
  const topRatedProducts = products.filter((p) => p.isTopRated || p.rating >= 4.8).slice(0, 8);

  // Platform/Category Sections
  const xboxProducts = products.filter((p) => p.platform === 'Xbox' || p.category === 'xbox').slice(0, 4);
  const psProducts = products.filter((p) => p.platform === 'PlayStation' || p.category === 'playstation').slice(0, 4);
  const pcProducts = products.filter((p) => p.platform === 'PC' || p.category === 'pc').slice(0, 4);
  const mobileProducts = products.filter((p) => p.platform === 'Mobile' || p.category === 'mobile').slice(0, 4);
  const giftCardProducts = products.filter((p) => p.category === 'gift-cards' || p.platform === 'Gift Card').slice(0, 4);
  const subscriptionProducts = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Banner Section */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-blue-950/40 z-10" />

        {/* Background Visual Graphic */}
        <div className="absolute top-0 right-0 w-full sm:w-2/3 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/20 via-blue-600/10 to-transparent z-0 pointer-events-none" />

        <div className="relative z-20 max-w-4xl px-6 py-12 sm:px-12 sm:py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Kurdistan & Iraq #1 Gaming Store</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            Level Up Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
              Gaming Experience
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 mb-8 max-w-xl leading-relaxed">
            Instant game top-ups, official Steam keys, PlayStation & Xbox gift cards, and premium subscriptions. Fast manual payment via FastPay, Korek, and MasterCard.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Link
              to="/products"
              className="px-6 py-3.5 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-cyan-950/50 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/products?category=mobile"
              className="px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm rounded-xl transition-all"
            >
              PUBG & Mobile Top-Ups
            </Link>
          </div>
        </div>
      </section>

      {/* Category Row Header */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Browse Categories</h3>
        <CategoryTabs activeCategory={activeCategory} onSelectCategory={handleCategorySelect} />
      </section>

      {/* Coming Soon Banner */}
      <section className="bg-gradient-to-r from-purple-950/60 via-slate-900 to-blue-950/60 border border-purple-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-900/50 rounded-xl border border-purple-500/40 shrink-0 text-purple-400">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-purple-900 text-purple-300 text-[10px] font-black uppercase rounded">
                Coming Soon
              </span>
              <h4 className="font-bold text-white text-base">GTA VI & Monster Hunter Wilds Pre-Orders</h4>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Get ready for the biggest releases of the year. Pre-orders with Kurdistan launch bonus arriving soon!
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/products')}
          className="shrink-0 px-4 py-2 bg-purple-900/40 hover:bg-purple-900/60 text-purple-300 border border-purple-500/40 rounded-xl text-xs font-bold transition-all"
        >
          View Store
        </button>
      </section>

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals & Sale"
        subtitle="Limited time discounts on top game top-ups and gift cards"
        badge="Flash Sale"
        products={flashDeals}
        onAddToCart={onAddToCart}
        action={
          <Link
            to="/products"
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>See All Deals</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        }
      />

      {/* Featured / Top Sales Section */}
      <ProductSection
        title="Top Sales & Featured"
        subtitle="Most popular items bought by Iraqi & Kurdistan gamers"
        badge="Best Sellers"
        products={featuredProducts}
        onAddToCart={onAddToCart}
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="Fresh additions and trending games right now"
        badge="Trending"
        products={trendingProducts}
        onAddToCart={onAddToCart}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated Games & Services"
        subtitle="Highest customer satisfaction ratings"
        badge="5-Star Rated"
        products={topRatedProducts}
        onAddToCart={onAddToCart}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Gaming & Game Pass"
        subtitle="Xbox game codes, digital gift cards, and Game Pass memberships"
        badge="Xbox Store"
        products={xboxProducts}
        onAddToCart={onAddToCart}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Store"
        subtitle="PS4/PS5 game keys and PSN gift cards"
        badge="PlayStation"
        products={psProducts}
        onAddToCart={onAddToCart}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming & Steam"
        subtitle="Official Steam keys and paid PC blockbusters"
        badge="PC Masters"
        products={pcProducts}
        onAddToCart={onAddToCart}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups & In-Game Cash"
        subtitle="PUBG UC, Free Fire Diamonds, CODM CP, and Valorant VP"
        badge="Mobile & Esports"
        products={mobileProducts}
        onAddToCart={onAddToCart}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Digital Gift Cards"
        subtitle="Steam Wallet, PlayStation, Xbox, Google Play, Razer Gold"
        badge="Gift Cards"
        products={giftCardProducts}
        onAddToCart={onAddToCart}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify, Canva Pro"
        badge="Subscriptions"
        products={subscriptionProducts}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}
