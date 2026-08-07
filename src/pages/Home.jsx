import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Gamepad2, Gift, CreditCard, ChevronRight, ShoppingBag, Flame, TrendingUp, Trophy } from 'lucide-react';
import { CategoryTabs } from '../components/CategoryTabs';
import { ProductSection } from '../components/ProductSection';

export function Home({ products = [], onAddToCart }) {
  const navigate = useNavigate();

  // Filter products by Tag / Flag
  const featuredProduct = products.find((p) => p.isFeatured) || products[0];
  const comingSoonProducts = products.filter((p) => p.tag === 'Coming Soon').slice(0, 4);
  const topSalesProducts = products.filter((p) => p.tag === 'Top Sales').slice(0, 4);
  const flashDealsProducts = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
  const topRatedProducts = products.filter((p) => p.isTopRated).slice(0, 4);

  // Filter products by Category
  const xboxProducts = products.filter((p) => p.category === 'xbox').slice(0, 4);
  const playstationProducts = products.filter((p) => p.category === 'playstation').slice(0, 4);
  const pcProducts = products.filter((p) => p.category === 'pc').slice(0, 4);
  const mobileProducts = products.filter((p) => p.category === 'mobile').slice(0, 4);
  const giftCardsProducts = products.filter((p) => p.category === 'giftcards').slice(0, 4);
  const subscriptionsProducts = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  const handleCategorySelect = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <div className="space-y-12">
      {/* 1. HERO / FEATURED SECTION */}
      {featuredProduct && (
        <section className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-900 group shadow-[0_0_30px_rgba(0,102,255,0.05)]">
          {/* Subtle colored glow backdrop */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all duration-700"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all duration-700"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-12 relative z-10 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-cyan-950/50 border border-cyan-500/30 px-3 py-1 rounded text-cyan-400 font-extrabold text-[10px] tracking-widest uppercase shadow-md shadow-cyan-950">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Game Offer</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">
                {featuredProduct.name}
              </h1>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
                {featuredProduct.description}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
                <span className="bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1.5 rounded">
                  {featuredProduct.platform}
                </span>
                <span className="bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1.5 rounded">
                  {featuredProduct.type}
                </span>
                <span className="bg-cyan-950/40 border border-cyan-500/15 text-cyan-400 px-3 py-1.5 rounded">
                  ★ {featuredProduct.rating.toFixed(1)} / 5.0 Rating
                </span>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  to={`/product/${featuredProduct.slug}`}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-black font-black text-xs uppercase tracking-widest px-8 py-4 rounded-lg text-center transition-all duration-300 shadow-lg shadow-cyan-500/10"
                >
                  Buy Now & Top Up
                </Link>
                <Link
                  to="/products"
                  className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-lg text-center transition-all duration-300"
                >
                  Explore All Deals
                </Link>
              </div>
            </div>

            {/* Hero Right Visual Column */}
            <div className="lg:col-span-5 flex justify-center items-center">
              {featuredProduct.image ? (
                <div className="relative w-full aspect-video sm:aspect-square overflow-hidden rounded-xl border border-slate-800 shadow-2xl">
                  <img
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                </div>
              ) : (
                <div className="w-full h-64 sm:h-80 relative rounded-xl border border-slate-800 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/40 via-purple-950/20 to-slate-950 flex flex-col justify-center items-center p-6 text-center">
                    <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-2">
                      DANO STORE
                    </span>
                    <span className="text-xs uppercase text-slate-400 font-bold tracking-widest">
                      Kurdistan Premium Gaming Provider
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 2. CATEGORY ROW */}
      <section className="bg-[#080810] border border-slate-900 p-5 rounded-xl">
        <div className="text-center sm:text-left mb-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-cyan-400">Jump To Categories</h3>
          <p className="text-xs text-slate-500">Quickly filter gaming items, subscriptions & card vouchers</p>
        </div>
        <CategoryTabs onSelect={handleCategorySelect} />
      </section>

      {/* 3. FLASH DEALS (HORIZONTAL BADGES & GLOWING CARD WRAPPERS) */}
      <ProductSection
        title="🔥 Flash Deals"
        subtitle="Limited time mega discounts for active Iraqi gamers."
        products={flashDealsProducts}
        onAddToCart={onAddToCart}
        viewAllPath="/products"
      />

      {/* 4. TOP SALES */}
      <ProductSection
        title="🏆 Top Sales"
        subtitle="Best-selling vouchers and activation keys."
        products={topSalesProducts}
        onAddToCart={onAddToCart}
        viewAllPath="/products"
      />

      {/* 5. NEW & TRENDING */}
      <ProductSection
        title="🚀 New & Trending"
        subtitle="Freshly added and popular services in Kurdistan."
        products={trendingProducts}
        onAddToCart={onAddToCart}
        viewAllPath="/products"
      />

      {/* 6. TOP RATED */}
      <ProductSection
        title="★ Top Rated"
        subtitle="Highly recommended digital keys based on user ratings."
        products={topRatedProducts}
        onAddToCart={onAddToCart}
        viewAllPath="/products"
      />

      {/* 7. MOBILE TOP-UPS SECTION */}
      <ProductSection
        title="📱 Mobile Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, CoD Points & MLBB Diamonds."
        products={mobileProducts}
        onAddToCart={onAddToCart}
        viewAllPath="/products?category=mobile"
      />

      {/* 8. XBOX SECTION */}
      <ProductSection
        title="🟢 Xbox Store"
        subtitle="Xbox game keys, memberships & digital card codes."
        products={xboxProducts}
        onAddToCart={onAddToCart}
        viewAllPath="/products?category=xbox"
      />

      {/* 9. PLAYSTATION SECTION */}
      <ProductSection
        title="🔵 PlayStation Store"
        subtitle="PSN digital codes, game cards & shared profile keys."
        products={playstationProducts}
        onAddToCart={onAddToCart}
        viewAllPath="/products?category=playstation"
      />

      {/* 10. PC GAMING SECTION */}
      <ProductSection
        title="💻 PC Gaming"
        subtitle="Steam keys, CD activation codes & Epic Game activations."
        products={pcProducts}
        onAddToCart={onAddToCart}
        viewAllPath="/products?category=pc"
      />

      {/* 11. GIFT CARDS SECTION */}
      <ProductSection
        title="🎁 Gift Cards"
        subtitle="Steam, PlayStation, Xbox, Razer Gold & Apple Gift Cards."
        products={giftCardsProducts}
        onAddToCart={onAddToCart}
        viewAllPath="/products?category=giftcards"
      />

      {/* 12. SUBSCRIPTIONS SECTION */}
      <ProductSection
        title="💎 Premium Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix & Spotify Premium."
        products={subscriptionsProducts}
        onAddToCart={onAddToCart}
        viewAllPath="/products?category=subscriptions"
      />

      {/* 13. COMING SOON */}
      <ProductSection
        title="⏳ Coming Soon"
        subtitle="Upcoming games and packages currently in preparation."
        products={comingSoonProducts}
        onAddToCart={onAddToCart}
        viewAllPath="/products"
      />
    </div>
  );
}
