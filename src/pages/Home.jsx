import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Zap,
  Flame,
  TrendingUp,
  Star,
  Box,
  Gamepad2,
  Monitor,
  Smartphone,
  CreditCard,
  Sparkles,
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { ProductSection } from '../components/ProductSection';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../data/categories';

export const Home = () => {
  const { products } = useProducts();
  const navigate = useNavigate();

  // Filter products for various sections
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const flashDeals = products.filter(p => p.isFlashDeal || (p.oldPrice && p.oldPrice > p.price)).slice(0, 4);
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);
  const topRatedProducts = products.filter(p => p.isTopRated || p.rating >= 4.9).slice(0, 4);
  const topSalesProducts = [...products].sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0)).slice(0, 4);

  const xboxProducts = products.filter(p => p.category === 'xbox' || p.platform === 'Xbox').slice(0, 4);
  const psProducts = products.filter(p => p.category === 'playstation' || p.platform === 'PlayStation').slice(0, 4);
  const pcProducts = products.filter(p => p.category === 'pc' || p.platform === 'PC').slice(0, 4);
  const mobileProducts = products.filter(p => p.category === 'mobile' || p.platform === 'Mobile').slice(0, 4);
  const giftCardProducts = products.filter(p => p.category === 'gift-cards' || p.platform === 'Gift Card').slice(0, 4);
  const subProducts = products.filter(p => p.category === 'subscriptions').slice(0, 4);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero / Featured Showcase */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#070e30] via-[#0b1647] to-[#05091e] border border-cyan-500/20 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kurdistan & Iraq #1 Gaming Store</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
            Level Up Your Gaming Experience with{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Dano Store
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Instant digital delivery for PC, Xbox, PlayStation, Mobile Top-Ups, Gift Cards, and Subscriptions. Safe local payments in IQD.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>Explore Products</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/products?category=mobile')}
              className="px-6 py-3.5 rounded-xl bg-[#0b143c] hover:bg-[#0f1d57] text-cyan-300 border border-cyan-500/30 font-bold text-sm transition-all"
            >
              PUBG & Mobile Top-Ups
            </button>
          </div>
        </div>

        {/* Featured Banner Grid highlight */}
        {featuredProducts.length > 0 && (
          <div className="mt-8 pt-8 border-t border-cyan-900/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" /> Featured Highlights
              </span>
              <Link to="/products" className="text-xs text-slate-400 hover:text-cyan-400">View All →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Category Row Cards */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-200">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="p-4 rounded-2xl bg-[#070c26] border border-cyan-900/30 hover:border-cyan-500/50 hover:bg-[#0b143c] flex flex-col items-center text-center gap-2 group transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                {cat.id === 'mobile' && <Smartphone className="w-5 h-5" />}
                {cat.id === 'pc' && <Monitor className="w-5 h-5" />}
                {cat.id === 'playstation' && <Gamepad2 className="w-5 h-5" />}
                {cat.id === 'xbox' && <Box className="w-5 h-5" />}
                {cat.id === 'gift-cards' && <CreditCard className="w-5 h-5" />}
                {cat.id === 'subscriptions' && <Sparkles className="w-5 h-5" />}
              </div>
              <span className="text-xs font-bold text-slate-200 group-hover:text-white">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Coming Soon Teaser Section */}
      <section className="rounded-2xl bg-gradient-to-r from-purple-950/60 via-indigo-950/60 to-[#070d28] border border-purple-500/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-purple-900/40 border border-purple-500/40 text-purple-300">
            <Clock className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-500/30">
              Coming Soon
            </span>
            <h3 className="text-lg font-bold text-white mt-1">GTA VI & Next-Gen Digital Releases</h3>
            <p className="text-xs text-slate-300">Pre-orders for upcoming major titles will open soon with exclusive regional bonuses.</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/products')}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shrink-0"
        >
          Stay Tuned
        </button>
      </section>

      {/* Top Sales */}
      <ProductSection
        title="Top Sales"
        subtitle="Most purchased digital games and top-ups by gamers in Iraq"
        icon={Flame}
        viewAllLink="/products?sort=popular"
        products={topSalesProducts}
      />

      {/* Flash Deals */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on key titles & cards"
        icon={Zap}
        viewAllLink="/products"
        products={flashDeals}
      />

      {/* New & Trending */}
      <ProductSection
        title="New & Trending"
        subtitle="Hot releases and popular top-up packs"
        icon={TrendingUp}
        viewAllLink="/products"
        products={trendingProducts}
      />

      {/* Top Rated */}
      <ProductSection
        title="Top Rated Games & Services"
        subtitle="Highest rated products by verified customers"
        icon={Star}
        viewAllLink="/products"
        products={topRatedProducts}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Games & Passes"
        subtitle="Official Xbox digital titles and gift cards"
        icon={Box}
        viewAllLink="/products?platform=Xbox"
        products={xboxProducts}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Corner"
        subtitle="PS5 & PS4 digital codes and store credit"
        icon={Gamepad2}
        viewAllLink="/products?platform=PlayStation"
        products={psProducts}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Hub"
        subtitle="Official Steam keys & Riot PC points"
        icon={Monitor}
        viewAllLink="/products?platform=PC"
        products={pcProducts}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, Robux, COD CP & more"
        icon={Smartphone}
        viewAllLink="/products?category=mobile"
        products={mobileProducts}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Digital Gift Cards"
        subtitle="Steam, PlayStation, Xbox, Apple & Google Play wallet cards"
        icon={CreditCard}
        viewAllLink="/products?category=gift-cards"
        products={giftCardProducts}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Premium Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix 4K & Spotify"
        icon={Sparkles}
        viewAllLink="/products?category=subscriptions"
        products={subProducts}
      />
    </div>
  );
};
