import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Flame,
  Star,
  Sparkles,
  Clock,
  Gamepad2,
  Smartphone,
  Monitor,
  CreditCard,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { products } = useProducts();

  // Filter sections
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const flashDeals = products.filter((p) => p.isFlashDeal || (p.oldPrice && p.oldPrice > p.price)).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
  const topRatedProducts = products.filter((p) => p.isTopRated || p.rating >= 4.8).slice(0, 4);
  const topSalesProducts = [...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, 4);

  // Platform & Category sections
  const xboxProducts = products.filter((p) => p.platform === 'Xbox').slice(0, 4);
  const playstationProducts = products.filter((p) => p.platform === 'PlayStation').slice(0, 4);
  const pcProducts = products.filter((p) => p.platform === 'PC').slice(0, 4);
  const mobileProducts = products.filter((p) => p.category === 'mobile').slice(0, 4);
  const giftCardProducts = products.filter((p) => p.category === 'gift-cards').slice(0, 4);
  const subscriptionProducts = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  return (
    <div className="space-y-12 pb-16">

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-[#0c1424] border border-slate-800 p-6 sm:p-10 lg:p-14 my-4 shadow-2xl">
        {/* Background glow graphics */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kurdistan & Iraq #1 Gaming Store</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
            Instant Digital <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Gaming & Top-Up Store
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-2xl">
            Get instant PUBG Mobile UC, Steam Wallet codes, GTA V, Elden Ring, PSN & Xbox Cards, Discord Nitro, and subscriptions. Paid directly via FastPay, Korek & MasterCard in IQD.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/products"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/20 flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <Gamepad2 className="w-5 h-5 fill-slate-950 text-cyan-400" />
              <span>Explore All Products</span>
            </Link>

            <Link
              to="/products?category=mobile"
              className="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-sm flex items-center gap-2 transition-all"
            >
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span>PUBG UC & Top-Ups</span>
            </Link>
          </div>

          {/* Quick guarantees */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Instant Digital Code Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>100% Legal & Official Keys</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>FastPay & Korek Local Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section className="my-8">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4">
          Browse Categories
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <Link
            to="/products?category=mobile"
            className="p-4 rounded-2xl bg-[#0b0f19] border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all group"
          >
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit mb-3 group-hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-sm">Mobile Top-Ups</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">UC, Diamonds, V-Bucks</p>
          </Link>

          <Link
            to="/products?category=games"
            className="p-4 rounded-2xl bg-[#0b0f19] border border-slate-800 hover:border-blue-500/40 hover:bg-slate-900/80 transition-all group"
          >
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 w-fit mb-3 group-hover:scale-110 transition-transform">
              <Monitor className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-sm">Paid Games</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">GTA V, Elden Ring, Rust</p>
          </Link>

          <Link
            to="/products?category=gift-cards"
            className="p-4 rounded-2xl bg-[#0b0f19] border border-slate-800 hover:border-amber-500/40 hover:bg-slate-900/80 transition-all group"
          >
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit mb-3 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-sm">Gift Cards</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Steam, PSN, Xbox, Apple</p>
          </Link>

          <Link
            to="/products?category=subscriptions"
            className="p-4 rounded-2xl bg-[#0b0f19] border border-slate-800 hover:border-purple-500/40 hover:bg-slate-900/80 transition-all group"
          >
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 w-fit mb-3 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-sm">Subscriptions</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Discord Nitro, YouTube</p>
          </Link>

          <Link
            to="/products"
            className="p-4 rounded-2xl bg-[#0b0f19] border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-900/80 transition-all group col-span-2 sm:col-span-1"
          >
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit mb-3 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-sm">All Catalog</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">View 30+ products</p>
          </Link>
        </div>
      </section>

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on top gaming products"
        icon={Flame}
        badge="Hot Sales"
        viewAllPath="/products?filter=flash"
        products={flashDeals}
      />

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Most ordered items by players in Kurdistan & Iraq"
        icon={TrendingUp}
        badge="Best Sellers"
        viewAllPath="/products"
        products={topSalesProducts}
      />

      {/* Coming Soon Banner Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-500/30 p-6 sm:p-8 my-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/40">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>Coming Soon to Dano Store</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white">
              Monster Hunter Wilds & GTA VI Pre-Orders
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Stay tuned! Upcoming blockbuster game activations, regional wallet expansions, and special Kurdish gaming tournament vouchers will be listed soon.
            </p>
          </div>
          <Link
            to="/products"
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs whitespace-nowrap shadow-lg shadow-purple-600/30 transition-all"
          >
            Browse Current Stock
          </Link>
        </div>
      </section>

      {/* New & Trending */}
      <ProductSection
        title="New & Trending"
        subtitle="Newly stocked titles and viral top-up packs"
        icon={Sparkles}
        badge="Trending"
        viewAllPath="/products?filter=trending"
        products={trendingProducts}
      />

      {/* Top Rated */}
      <ProductSection
        title="Top Rated Games & Services"
        subtitle="Highest customer satisfaction ratings"
        icon={Star}
        badge="5.0 Stars"
        viewAllPath="/products?filter=top-rated"
        products={topRatedProducts}
      />

      {/* Xbox Section */}
      {xboxProducts.length > 0 && (
        <ProductSection
          title="Xbox Gaming & Cards"
          subtitle="Xbox Game Pass, Xbox Gift Cards, and Xbox Games"
          icon={Gamepad2}
          viewAllPath="/products?platform=Xbox"
          products={xboxProducts}
        />
      )}

      {/* PlayStation Section */}
      {playstationProducts.length > 0 && (
        <ProductSection
          title="PlayStation Store"
          subtitle="PSN Gift Cards, God of War, and PS4/PS5 products"
          icon={Gamepad2}
          viewAllPath="/products?platform=PlayStation"
          products={playstationProducts}
        />
      )}

      {/* PC Gaming Section */}
      {pcProducts.length > 0 && (
        <ProductSection
          title="PC Gaming & Steam Keys"
          subtitle="GTA V, Elden Ring, Rust, Cyberpunk, and Steam Wallet"
          icon={Monitor}
          viewAllPath="/products?platform=PC"
          products={pcProducts}
        />
      )}

      {/* Mobile Top-Ups Section */}
      {mobileProducts.length > 0 && (
        <ProductSection
          title="Mobile Games & UC Top-Ups"
          subtitle="PUBG UC, Free Fire Diamonds, Mobile Legends & Robux"
          icon={Smartphone}
          viewAllPath="/products?category=mobile"
          products={mobileProducts}
        />
      )}

      {/* Gift Cards Section */}
      {giftCardProducts.length > 0 && (
        <ProductSection
          title="Digital Gift Cards"
          subtitle="Steam, PSN, Xbox, Google Play, Apple & Razer Gold"
          icon={CreditCard}
          viewAllPath="/products?category=gift-cards"
          products={giftCardProducts}
        />
      )}

      {/* Subscriptions Section */}
      {subscriptionProducts.length > 0 && (
        <ProductSection
          title="Digital Subscriptions"
          subtitle="Discord Nitro, YouTube Premium, Netflix & Canva Pro"
          icon={Zap}
          viewAllPath="/products?category=subscriptions"
          products={subscriptionProducts}
        />
      )}

    </div>
  );
};

export default Home;
