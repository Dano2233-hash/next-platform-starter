import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Flame, Star, Zap, Clock, ShieldCheck, Gamepad2, ArrowRight, Tv, Monitor, Smartphone, Gift, Layers } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import CategoryTabs from '../components/CategoryTabs';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { products } = useProducts();

  // Filter products for various sections
  const featuredProducts = products.filter(p => p.isFeatured);
  const flashDeals = products.filter(p => p.isFlashDeal);
  const trendingProducts = products.filter(p => p.isTrending);
  const topRatedProducts = products.filter(p => p.isTopRated);

  // Top Sales (sorted by soldCount)
  const topSales = [...products].sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0)).slice(0, 8);

  // Category specific sections
  const xboxProducts = products.filter(p => p.category === 'xbox');
  const psProducts = products.filter(p => p.category === 'playstation');
  const pcProducts = products.filter(p => p.category === 'pc');
  const mobileProducts = products.filter(p => p.category === 'mobile');
  const giftCardProducts = products.filter(p => p.category === 'gift-cards');
  const subscriptionProducts = products.filter(p => p.category === 'subscriptions');

  // Hero main item
  const heroItem = featuredProducts[0] || products[0];

  // Coming Soon games mock dataset for Coming Soon section
  const comingSoonGames = [
    { title: 'GTA VI (Grand Theft Auto 6)', platform: 'PS5 / Xbox Series X', date: 'Expected 2025', tag: 'Most Anticipated' },
    { title: 'Monster Hunter Wilds', platform: 'PC / PS5 / Xbox', date: 'Early 2025', tag: 'Pre-Order Soon' },
    { title: 'Assassin\'s Creed Shadows', platform: 'PC / Console', date: 'Q1 2025', tag: 'Ubisoft' },
    { title: 'DOOM: The Dark Ages', platform: 'PC / Xbox', date: '2025', tag: 'Bethesda' }
  ];

  return (
    <div className="space-y-12">
      {/* Hero / Featured Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b1226] via-[#101833] to-[#1c0f38] border border-cyan-500/20 p-6 md:p-10">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>#1 Digital Gaming Store in Kurdistan & Iraq</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Instant Top-Ups & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Official Digital Games
              </span>
            </h1>

            <p className="text-sm md:text-base text-gray-300 max-w-xl leading-relaxed">
              Get PUBG UC, Free Fire Diamonds, Steam Wallet, PSN Cards, and top PC games at the lowest prices in IQD. Fast local payment via FastPay & Korek Cash.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/products?category=mobile"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs md:text-sm flex items-center space-x-2 shadow-lg shadow-cyan-500/20 transition-all"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Browse Top-Ups</span>
              </Link>
              <Link
                to="/products"
                className="px-6 py-3 rounded-xl bg-[#080d1a] hover:bg-gray-800 text-gray-200 border border-gray-700/80 font-bold text-xs md:text-sm flex items-center space-x-2 transition-all"
              >
                <span>View All Store Catalog</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </Link>
            </div>

            {/* Quick stats badges */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-gray-800/80 max-w-md">
              <div>
                <span className="block text-lg font-black text-white">100%</span>
                <span className="text-[11px] text-gray-400">Verified Codes</span>
              </div>
              <div>
                <span className="block text-lg font-black text-white">&lt; 5 Min</span>
                <span className="text-[11px] text-gray-400">Delivery Time</span>
              </div>
              <div>
                <span className="block text-lg font-black text-white">IQD Only</span>
                <span className="text-[11px] text-gray-400">Local Currency</span>
              </div>
            </div>
          </div>

          {/* Featured Highlight Card */}
          {heroItem && (
            <div className="lg:col-span-5">
              <div className="p-2 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-purple-600/30 backdrop-blur-md">
                <ProductCard product={heroItem} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Category Row */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-300">
            Browse By Platform & Category
          </h3>
          <Link to="/products" className="text-xs text-cyan-400 font-bold hover:underline">
            View All ({products.length})
          </Link>
        </div>
        <CategoryTabs activeCategory="all" onSelectCategory={(slug) => {
          if (slug === 'all') window.location.href = '/products';
          else window.location.href = `/products?category=${slug}`;
        }} />
      </section>

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on top gaming cards and keys"
        icon={Flame}
        badge="Hot Sales"
        viewAllLink="/products"
        products={flashDeals.slice(0, 4)}
      />

      {/* Top Sales */}
      <ProductSection
        title="Top Sales"
        subtitle="Most purchased items by Iraqi & Kurdish gamers"
        icon={Zap}
        badge="Best Sellers"
        viewAllLink="/products"
        products={topSales.slice(0, 4)}
      />

      {/* New & Trending */}
      <ProductSection
        title="New & Trending"
        subtitle="Freshly added titles and popular top-up packs"
        icon={Sparkles}
        badge="Trending"
        viewAllLink="/products"
        products={trendingProducts.slice(0, 4)}
      />

      {/* Top Rated */}
      <ProductSection
        title="Top Rated Games & Services"
        subtitle="5-Star rated games and instant digital subscriptions"
        icon={Star}
        badge="Top Rated"
        viewAllLink="/products"
        products={topRatedProducts.slice(0, 4)}
      />

      {/* Coming Soon Section */}
      <section className="p-6 md:p-8 rounded-3xl bg-[#090e1c] border border-cyan-500/20 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white">Coming Soon to Dano Store</h2>
            <p className="text-xs text-gray-400">Pre-orders and upcoming blockbuster digital releases</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {comingSoonGames.map((game, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#050811] border border-gray-800 space-y-3 relative overflow-hidden">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                {game.tag}
              </span>
              <h4 className="text-sm font-bold text-white line-clamp-1">{game.title}</h4>
              <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-800/60">
                <span>{game.platform}</span>
                <span className="text-cyan-400 font-semibold">{game.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Gaming"
        subtitle="Xbox Game Pass, console titles & gift cards"
        icon={Tv}
        viewAllLink="/products?category=xbox"
        products={xboxProducts.slice(0, 4)}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Section"
        subtitle="PSN gift cards and PlayStation game digital keys"
        icon={Gamepad2}
        viewAllLink="/products?category=playstation"
        products={psProducts.slice(0, 4)}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Section"
        subtitle="Steam keys, Valorant VP, and top PC titles"
        icon={Monitor}
        viewAllLink="/products?category=pc"
        products={pcProducts.slice(0, 4)}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, CODM CP, and Roblox"
        icon={Smartphone}
        badge="Instant ID Delivery"
        viewAllLink="/products?category=mobile"
        products={mobileProducts.slice(0, 4)}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards"
        subtitle="Steam, PSN, Xbox, Google Play, Apple, Razer Gold"
        icon={Gift}
        viewAllLink="/products?category=gift-cards"
        products={giftCardProducts.slice(0, 4)}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify & tools"
        icon={Sparkles}
        viewAllLink="/products?category=subscriptions"
        products={subscriptionProducts.slice(0, 4)}
      />
    </div>
  );
}
