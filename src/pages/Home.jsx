import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductSection from '../components/ProductSection';
import CategoryTabs from '../components/CategoryTabs';
import {
  Zap,
  TrendingUp,
  Star,
  Clock,
  Smartphone,
  Gamepad2,
  Gift,
  Sparkles,
  ShieldCheck,
  Award,
  ChevronRight,
  Flame
} from 'lucide-react';

export default function Home({ products = [], onAddToCart, onBuyNow }) {
  const navigate = useNavigate();

  // Filter products by section tags
  const topSales = products.filter((p) => p.isFeatured || p.soldCount > 2000).slice(0, 4);
  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const trending = products.filter((p) => p.isTrending).slice(0, 4);
  const topRated = products.filter((p) => p.isTopRated || p.rating >= 4.9).slice(0, 4);
  const comingSoon = products.filter((p) => p.isComingSoon);

  const xboxGames = products.filter((p) => p.platform === 'Xbox' || p.category === 'games').slice(0, 4);
  const playstationGames = products.filter((p) => p.platform === 'PlayStation' || p.category === 'games').slice(0, 4);
  const pcGames = products.filter((p) => p.platform === 'PC' && p.category === 'games').slice(0, 4);
  const mobileTopups = products.filter((p) => p.category === 'mobile-topups').slice(0, 4);
  const giftCards = products.filter((p) => p.category === 'gift-cards').slice(0, 4);
  const subscriptions = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  return (
    <div className="space-y-12">
      {/* Hero / Featured Banner */}
      <section className="relative rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-r from-[#0a1226] via-[#091838] to-[#120a26] p-6 md:p-12 shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-bold tracking-wider uppercase">
            <Flame className="w-3.5 h-3.5 fill-cyan-400" />
            <span>Official Digital Store Kurdistan & Iraq</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight uppercase">
            LEVEL UP YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400">GAMING EXPERIENCE</span>
          </h1>

          <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-xl font-medium">
            Get instant PUBG UC, Free Fire Diamonds, Steam Wallet cards, Discord Nitro, and activation keys for top AAA games with local payment options in IQD.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs md:text-sm shadow-xl shadow-cyan-500/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Explore All Products</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/products?category=mobile-topups')}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs md:text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span>Mobile Top-Ups</span>
            </button>
          </div>
        </div>
      </section>

      {/* Category Selection Row */}
      <section className="space-y-3">
        <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
          Quick Categories
        </h3>
        <CategoryTabs
          activeCategory="all"
          onSelectCategory={(slug) => {
            if (slug === 'all') navigate('/products');
            else navigate(`/products?category=${slug}`);
          }}
        />
      </section>

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Most popular items bought by gamers in Erbil, Sulaymaniyah, and Baghdad"
        icon={Award}
        products={topSales}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        viewAllLink="/products"
        accentColor="cyan"
      />

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounted prices on top game credits and gift cards"
        icon={Zap}
        products={flashDeals}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        viewAllLink="/products"
        accentColor="purple"
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="Hot releases and popular top-ups trending right now"
        icon={TrendingUp}
        products={trending}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        viewAllLink="/products"
        accentColor="blue"
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated"
        subtitle="5-star rated products verified by thousands of customers"
        icon={Star}
        products={topRated}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        viewAllLink="/products"
        accentColor="amber"
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="Instant UC, Diamonds, V-Bucks, VP, Robux & CP via Player ID"
        icon={Smartphone}
        products={mobileTopups}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        viewAllLink="/products?category=mobile-topups"
        accentColor="cyan"
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Gaming"
        subtitle="Digital Xbox Game Pass, cards, and games for Series X|S"
        icon={Gamepad2}
        products={xboxGames}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        viewAllLink="/products?platform=Xbox"
        accentColor="blue"
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Section"
        subtitle="PSN Gift Cards, PS Plus, and PlayStation digital keys"
        icon={Gamepad2}
        products={playstationGames}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        viewAllLink="/products?platform=PlayStation"
        accentColor="purple"
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Section"
        subtitle="Steam keys, Valorant VP, and PC blockbuster digital games"
        icon={Gamepad2}
        products={pcGames}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        viewAllLink="/products?platform=PC"
        accentColor="cyan"
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards"
        subtitle="Steam, PSN, Xbox, Google Play, Apple & Razer Gold codes"
        icon={Gift}
        products={giftCards}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        viewAllLink="/products?category=gift-cards"
        accentColor="amber"
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify & Canva Pro"
        icon={Sparkles}
        products={subscriptions}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        viewAllLink="/products?category=subscriptions"
        accentColor="purple"
      />

      {/* Coming Soon Section */}
      {comingSoon.length > 0 && (
        <ProductSection
          title="Coming Soon"
          subtitle="Pre-register for upcoming blockbuster digital releases"
          icon={Clock}
          products={comingSoon}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          viewAllLink="/products"
          accentColor="blue"
        />
      )}
    </div>
  );
}
