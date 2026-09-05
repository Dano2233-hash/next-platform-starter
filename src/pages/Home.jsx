import React from 'react';
import { Link } from 'react-router-dom';
import {
  Gamepad2,
  Zap,
  Flame,
  TrendingUp,
  Star,
  Smartphone,
  CreditCard,
  Tv,
  Clock,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { SectionHeader } from '../components/SectionHeader';
import { ProductSection } from '../components/ProductSection';

export const Home = () => {
  const { products } = useProducts();

  // Section Filters
  const featuredProducts = products.filter((p) => p.isFeatured);
  const flashDeals = products.filter((p) => p.isFlashDeal || (p.oldPrice && p.oldPrice > p.price));
  const trendingProducts = products.filter((p) => p.isTrending);
  const topRatedProducts = products.filter((p) => p.isTopRated || p.rating >= 4.9);

  // Platform & Category Sections
  const xboxProducts = products.filter((p) => p.platform === 'Xbox');
  const playstationProducts = products.filter((p) => p.platform === 'PlayStation');
  const pcProducts = products.filter((p) => p.platform === 'PC');
  const mobileTopups = products.filter((p) => p.category === 'mobile-topups');
  const giftCards = products.filter((p) => p.category === 'gift-cards');
  const subscriptions = products.filter((p) => p.category === 'subscriptions');

  // Top sales sorted by sold count
  const topSales = [...products].sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));

  // Hero product highlight
  const heroProduct = products.find((p) => p.id === 'pubg-mobile-uc') || products[0];

  return (
    <div className="space-y-12 pb-16">

      {/* Hero / Featured Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-blue-950/40 z-10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/20 via-blue-600/10 to-transparent blur-3xl"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Official Gaming Codes Kurdistan & Iraq</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Level Up Your Gaming with <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Instant Digital Delivery</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Get game codes, mobile UC, diamonds, gift cards, and premium subscriptions with FastPay, Korek Cash, and MasterCard manual payments.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/products"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>Browse Store Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/products?category=mobile-topups"
                className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80 font-bold text-sm transition-all"
              >
                Mobile Top-Ups
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs">
              <div>
                <p className="text-cyan-400 font-extrabold text-lg">10,000+</p>
                <p className="text-slate-400 font-medium">Orders Fulfilled</p>
              </div>
              <div>
                <p className="text-cyan-400 font-extrabold text-lg">100%</p>
                <p className="text-slate-400 font-medium">Authentic Codes</p>
              </div>
              <div>
                <p className="text-cyan-400 font-extrabold text-lg">Instant</p>
                <p className="text-slate-400 font-medium">Local Verification</p>
              </div>
            </div>
          </div>

          {/* Hero Featured Card Highlight */}
          {heroProduct && (
            <div className="lg:col-span-5">
              <div className="p-1 rounded-2xl bg-gradient-to-b from-cyan-500/40 via-blue-600/20 to-purple-600/30 shadow-2xl">
                <div className="bg-slate-950/90 rounded-xl p-5 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      Top Featured Deal
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-bold">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      4.9 Rating
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-white">{heroProduct.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{heroProduct.description}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 font-semibold uppercase">Starting From</span>
                      <p className="text-xl font-black text-cyan-400">{heroProduct.price.toLocaleString()} IQD</p>
                    </div>
                    <Link
                      to={`/products/${heroProduct.id}`}
                      className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow"
                    >
                      Order Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Category Row */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Explore Store Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <Link
            to="/products?category=mobile-topups"
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 transition-all group flex flex-col items-center text-center space-y-2"
          >
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm group-hover:text-cyan-400">Mobile Top-Ups</h4>
              <p className="text-[11px] text-slate-500">UC, Diamonds & CP</p>
            </div>
          </Link>

          <Link
            to="/products?category=paid-games"
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all group flex flex-col items-center text-center space-y-2"
          >
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm group-hover:text-blue-400">Paid Games</h4>
              <p className="text-[11px] text-slate-500">Steam & Consoles</p>
            </div>
          </Link>

          <Link
            to="/products?category=gift-cards"
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/80 transition-all group flex flex-col items-center text-center space-y-2"
          >
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm group-hover:text-purple-400">Gift Cards</h4>
              <p className="text-[11px] text-slate-500">Steam, PSN, Xbox, Apple</p>
            </div>
          </Link>

          <Link
            to="/products?category=subscriptions"
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/80 transition-all group flex flex-col items-center text-center space-y-2"
          >
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm group-hover:text-amber-400">Subscriptions</h4>
              <p className="text-[11px] text-slate-500">Discord, Netflix, Spotify</p>
            </div>
          </Link>

          <Link
            to="/products"
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all group flex flex-col items-center text-center space-y-2 col-span-2 sm:col-span-1"
          >
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
              <Tv className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm group-hover:text-indigo-400">All Products</h4>
              <p className="text-[11px] text-slate-500">View Full Catalog</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-950 border border-purple-800/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Clock className="w-3 h-3 text-purple-400" /> Coming Soon
            </span>
            <h3 className="text-lg font-black text-white">GTA VI Pre-Orders & EA SPORTS FC 25 Coins</h3>
            <p className="text-xs text-slate-400">Upcoming global releases and special game passes arriving soon at Dano Store!</p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-purple-600/80 hover:bg-purple-600 text-white font-bold text-xs shrink-0 cursor-default">
            Stay Tuned
          </button>
        </div>
      </section>

      {/* Top Sales */}
      <ProductSection
        title="Top Sales"
        subtitle="Most ordered game codes and top-up packages this week"
        icon={Flame}
        badge="Best Sellers"
        viewAllLink="/products?sort=popular"
        products={topSales}
      />

      {/* Flash Deals */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounted digital deals"
        icon={Zap}
        badge="Special Discounts"
        viewAllLink="/products"
        products={flashDeals}
      />

      {/* New & Trending */}
      <ProductSection
        title="New & Trending"
        subtitle="Hot releases trending across Kurdistan and Iraq"
        icon={TrendingUp}
        badge="Hot Releases"
        viewAllLink="/products"
        products={trendingProducts}
      />

      {/* Top Rated */}
      <ProductSection
        title="Top Rated Products"
        subtitle="5-star rated items recommended by gamers"
        icon={Star}
        badge="5-Star Rated"
        viewAllLink="/products"
        products={topRatedProducts}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Gaming"
        subtitle="Official Xbox digital keys and store card balances"
        badge="Xbox Store"
        viewAllLink="/products?platform=Xbox"
        products={xboxProducts}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Section"
        subtitle="PS4 / PS5 games and PSN store gift cards"
        badge="PlayStation Store"
        viewAllLink="/products?platform=PlayStation"
        products={playstationProducts}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Section"
        subtitle="Paid Steam games, VP, Robux, and activation keys"
        badge="PC Games"
        viewAllLink="/products?platform=PC"
        products={pcProducts}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups Section"
        subtitle="Instant UC, Diamonds, and CP recharge by ID"
        badge="Mobile Recharge"
        viewAllLink="/products?category=mobile-topups"
        products={mobileTopups}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards Section"
        subtitle="Steam, PSN, Xbox, Google Play, Apple, and Razer Gold"
        badge="Store Cards"
        viewAllLink="/products?category=gift-cards"
        products={giftCards}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Subscriptions Section"
        subtitle="Discord Nitro, YouTube Premium, Netflix, and Spotify"
        badge="Digital Services"
        viewAllLink="/products?category=subscriptions"
        products={subscriptions}
      />

    </div>
  );
};
