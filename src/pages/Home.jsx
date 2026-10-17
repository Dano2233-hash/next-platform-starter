import React from 'react';
import { Link } from 'react-router-dom';
import {
  Gamepad2,
  Zap,
  Sparkles,
  Flame,
  Star,
  Clock,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Smartphone,
  Gift,
  Tv
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import CategoryTabs from '../components/CategoryTabs';

export default function Home() {
  const { products } = useProducts();

  // Filter lists for home sections
  const flashDeals = products.filter(p => p.isFlashDeal);
  const trendingProducts = products.filter(p => p.isTrending);
  const topRatedProducts = products.filter(p => p.isTopRated);
  const pcProducts = products.filter(p => p.platform === 'PC');
  const xboxProducts = products.filter(p => p.platform === 'Xbox');
  const psProducts = products.filter(p => p.platform === 'PlayStation');
  const mobileProducts = products.filter(p => p.platform === 'Mobile' || p.category === 'mobile');
  const giftCardProducts = products.filter(p => p.category === 'gift-cards');
  const subscriptionProducts = products.filter(p => p.category === 'subscriptions');

  return (
    <div className="space-y-10 pb-12">

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-[#0a1020] to-indigo-950 border border-slate-800/80 p-6 sm:p-10 lg:p-12 shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wide uppercase shadow-inner">
            <Zap className="w-3.5 h-3.5 fill-cyan-400" />
            <span>Kurdistan & Iraq Digital Gaming Store</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
            INSTANT TOP-UPS & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              DIGITAL GAME CODES
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
            Get PUBG UC, Free Fire Diamonds, Steam Keys, PlayStation Cards, and Discord Nitro with immediate manual payment via FastPay, Korek, and FIB/MasterCard.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/products"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-xl shadow-cyan-500/20 transition-all hover:scale-[1.02]"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Browse Catalog</span>
            </Link>

            <Link
              to="/products?category=mobile"
              className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-200 font-bold text-sm transition-all"
            >
              <span>Mobile Top-Ups</span>
            </Link>
          </div>

          {/* Quick Stats Badges */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <div className="text-xs">
                <span className="font-bold text-white block">100% Guaranteed</span>
                <span className="text-slate-400">Official Direct Delivery</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-purple-400" />
              <div className="text-xs">
                <span className="font-bold text-white block">Instant Top-Up</span>
                <span className="text-slate-400">Fast Manual Verification</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <div className="text-xs">
                <span className="font-bold text-white block">IQD Currency</span>
                <span className="text-slate-400">FastPay & Korek Cash</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Category Shortcuts Row */}
      <section className="space-y-3">
        <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Quick Category Filter</h3>
        <CategoryTabs activeCategory="all" onSelectCategory={(cat) => window.location.href = `/products?category=${cat}`} />
      </section>

      {/* Coming Soon Section */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/20 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>Coming Soon to Dano Store</span>
                <span className="px-2 py-0.5 rounded-md bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px]">Pre-Order</span>
              </h3>
              <p className="text-xs text-slate-400">
                Grand Theft Auto VI, Monster Hunter Wilds, and Call of Duty 2025 digital keys will be available soon!
              </p>
            </div>
          </div>
          <Link
            to="/products"
            className="px-4 py-2 rounded-xl bg-purple-900/60 border border-purple-700/80 text-purple-200 text-xs font-bold shrink-0 hover:bg-purple-800/80 transition-all"
          >
            Explore Catalog
          </Link>
        </div>
      </section>

      {/* Flash Deals Section */}
      {flashDeals.length > 0 && (
        <ProductSection
          title="Flash Deals"
          subtitle="Special limited time discounts on top games & gift cards"
          products={flashDeals.slice(0, 4)}
          viewAllLink="/products"
          icon={Flame}
        />
      )}

      {/* New & Trending */}
      {trendingProducts.length > 0 && (
        <ProductSection
          title="New & Trending"
          subtitle="Most popular items in Kurdistan & Iraq this week"
          products={trendingProducts.slice(0, 4)}
          viewAllLink="/products"
          icon={TrendingUp}
        />
      )}

      {/* Top Rated */}
      {topRatedProducts.length > 0 && (
        <ProductSection
          title="Top Rated Products"
          subtitle="Highly recommended digital items by Iraqi gamers"
          products={topRatedProducts.slice(0, 4)}
          viewAllLink="/products"
          icon={Star}
        />
      )}

      {/* Mobile Top-Ups Section */}
      {mobileProducts.length > 0 && (
        <ProductSection
          title="Mobile Top-Ups & Coins"
          subtitle="PUBG UC, Free Fire Diamonds, Mobile Legends & Clash of Clans"
          products={mobileProducts.slice(0, 4)}
          viewAllLink="/products?category=mobile"
          icon={Smartphone}
        />
      )}

      {/* PC Gaming Section */}
      {pcProducts.length > 0 && (
        <ProductSection
          title="PC Gaming Store"
          subtitle="Steam keys for GTA V, Elden Ring, RDR2 & Cyberpunk 2077"
          products={pcProducts.slice(0, 4)}
          viewAllLink="/products?platform=PC"
          icon={Gamepad2}
        />
      )}

      {/* PlayStation Section */}
      {psProducts.length > 0 && (
        <ProductSection
          title="PlayStation Digital Store"
          subtitle="PSN Gift Cards, PlayStation games, and wallet codes"
          products={psProducts.slice(0, 4)}
          viewAllLink="/products?platform=PlayStation"
          icon={Gamepad2}
        />
      )}

      {/* Xbox Section */}
      {xboxProducts.length > 0 && (
        <ProductSection
          title="Xbox Store"
          subtitle="Xbox gift cards and digital games for Xbox Series X/S"
          products={xboxProducts.slice(0, 4)}
          viewAllLink="/products?platform=Xbox"
          icon={Gamepad2}
        />
      )}

      {/* Gift Cards Section */}
      {giftCardProducts.length > 0 && (
        <ProductSection
          title="Gift Cards & Wallet Vouchers"
          subtitle="Steam Wallet, iTunes, Google Play & Amazon Cards"
          products={giftCardProducts.slice(0, 4)}
          viewAllLink="/products?category=gift-cards"
          icon={Gift}
        />
      )}

      {/* Subscriptions Section */}
      {subscriptionProducts.length > 0 && (
        <ProductSection
          title="Digital Subscriptions"
          subtitle="Discord Nitro, YouTube Premium, Netflix & Spotify"
          products={subscriptionProducts.slice(0, 4)}
          viewAllLink="/products?category=subscriptions"
          icon={Tv}
        />
      )}

    </div>
  );
}
