import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Zap,
  Flame,
  Award,
  Clock,
  Sparkles,
  Gamepad2,
  Smartphone,
  Gift,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Percent,
  CheckCircle2
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts.jsx';
import { ProductSection } from '../components/ProductSection.jsx';
import { ProductCard } from '../components/ProductCard.jsx';
import { CategoryTabs } from '../components/CategoryTabs.jsx';

export const Home = () => {
  const navigate = useNavigate();
  const { products } = useProducts();

  // Filter sections data
  const topSalesProducts = products
    .filter((p) => p.soldCount && p.soldCount > 3000)
    .slice(0, 4);

  const flashDealsProducts = products
    .filter((p) => p.isFlashDeal || (p.oldPrice && p.oldPrice > p.price))
    .slice(0, 4);

  const trendingProducts = products
    .filter((p) => p.isTrending)
    .slice(0, 4);

  const topRatedProducts = products
    .filter((p) => p.isTopRated || p.rating >= 4.9)
    .slice(0, 4);

  const xboxProducts = products
    .filter((p) => p.platform === 'Xbox')
    .slice(0, 4);

  const playstationProducts = products
    .filter((p) => p.platform === 'PlayStation')
    .slice(0, 4);

  const pcProducts = products
    .filter((p) => p.platform === 'PC')
    .slice(0, 4);

  const mobileProducts = products
    .filter((p) => p.category === 'mobile-topups' || p.platform === 'Mobile')
    .slice(0, 4);

  const giftCardProducts = products
    .filter((p) => p.category === 'gift-cards' || p.type === 'Gift Card')
    .slice(0, 4);

  const subscriptionProducts = products
    .filter((p) => p.category === 'subscriptions' || p.type === 'Subscription')
    .slice(0, 4);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1329] via-[#090d1a] to-[#04060c] border border-slate-800/80 p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-extrabold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            #1 Gaming & Digital Store in Kurdistan & Iraq
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight leading-tight">
            Level Up Your Gaming with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Dano Store</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium max-w-2xl">
            Get PUBG UC, Free Fire Diamonds, Steam Keys, PlayStation Cards, Discord Nitro & Premium Subscriptions instantly. Official codes with manual FastPay & Korek payment.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 shadow-xl shadow-cyan-950/50 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4 fill-slate-950 text-slate-950" />
              Explore All Products
            </button>
            <button
              onClick={() => navigate('/products?category=mobile-topups')}
              className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-cyan-400" />
              Instant Top-Ups
            </button>
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 max-w-lg">
            <div>
              <p className="text-lg sm:text-xl font-black text-slate-100">100%</p>
              <p className="text-[11px] text-slate-400 font-medium">Verified Digital Codes</p>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-black text-slate-100">Instant</p>
              <p className="text-[11px] text-slate-400 font-medium">WhatsApp / ID Delivery</p>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-black text-slate-100">Local</p>
              <p className="text-[11px] text-slate-400 font-medium">FastPay & Korek</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Selection Row */}
      <div>
        <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-wider mb-2">
          Select Category
        </h3>
        <CategoryTabs
          selectedCategory="all"
          onSelectCategory={(catId) => {
            if (catId === 'all') navigate('/products');
            else navigate(`/products?category=${catId}`);
          }}
        />
      </div>

      {/* Coming Soon Section */}
      <section className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/20 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 z-10 relative">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 uppercase tracking-widest">
              Upcoming Titles
            </span>
            <h3 className="text-xl font-black text-slate-100">
              GTA VI, Monster Hunter Wilds & Crimson Desert
            </h3>
            <p className="text-xs text-slate-400">
              Pre-order reservations opening soon for PlayStation 5, Xbox Series X, and PC Steam.
            </p>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition-colors flex-shrink-0"
          >
            Notify Me
          </button>
        </div>
      </section>

      {/* Top Sales */}
      <ProductSection
        title="Top Sales"
        subtitle="Most popular items bought by gamers in Erbil, Sulaymaniyah, and Baghdad"
        icon={Flame}
        badge="Best Sellers"
        products={topSalesProducts}
        viewAllLink="/products"
      />

      {/* Flash Deals */}
      <ProductSection
        title="Flash Deals"
        subtitle="Discounted packages and reduced prices for a limited time"
        icon={Percent}
        badge="Special Offer"
        products={flashDealsProducts}
        viewAllLink="/products"
      />

      {/* New & Trending */}
      <ProductSection
        title="New & Trending"
        subtitle="Freshly added Steam games, battle passes, and subscription updates"
        icon={TrendingUp}
        products={trendingProducts}
        viewAllLink="/products"
      />

      {/* Top Rated */}
      <ProductSection
        title="Top Rated"
        subtitle="Highest customer satisfaction ratings and instant fulfillment"
        icon={Award}
        products={topRatedProducts}
        viewAllLink="/products"
      />

      {/* Platform Section: PC Gaming */}
      <ProductSection
        title="PC Gaming"
        subtitle="Top Steam keys and PC game top-ups"
        icon={Gamepad2}
        products={pcProducts}
        viewAllLink="/products?platform=PC"
      />

      {/* Platform Section: PlayStation */}
      <ProductSection
        title="PlayStation Store"
        subtitle="PSN gift cards, game keys, and wallet top-ups"
        icon={Gamepad2}
        products={playstationProducts}
        viewAllLink="/products?platform=PlayStation"
      />

      {/* Platform Section: Xbox */}
      <ProductSection
        title="Xbox Console & Game Pass"
        subtitle="Xbox Live gift cards and game licenses"
        icon={Gamepad2}
        products={xboxProducts}
        viewAllLink="/products?platform=Xbox"
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="Instant Player ID delivery for PUBG UC, Free Fire Diamonds, MLBB & CP"
        icon={Smartphone}
        products={mobileProducts}
        viewAllLink="/products?category=mobile-topups"
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Digital Gift Cards"
        subtitle="Steam Wallet, iTunes, Google Play, Razer Gold & Amazon Cards"
        icon={Gift}
        products={giftCardProducts}
        viewAllLink="/products?category=gift-cards"
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Subscriptions & Services"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify & Pro Apps"
        icon={Zap}
        products={subscriptionProducts}
        viewAllLink="/products?category=subscriptions"
      />
    </div>
  );
};
