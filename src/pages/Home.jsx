import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Flame,
  Zap,
  Star,
  TrendingUp,
  Gamepad2,
  Smartphone,
  CreditCard,
  Monitor,
  Clock,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';
import ProductImage from '../components/ProductImage';

export default function Home() {
  const { products } = useProducts();

  // Filter sections
  const comingSoonProducts = products.filter((p) => p.isComingSoon);
  const topSalesProducts = products.filter((p) => p.soldCount > 2500).slice(0, 4);
  const flashDealsProducts = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 8);
  const topRatedProducts = products.filter((p) => p.isTopRated).slice(0, 4);

  const xboxProducts = products.filter((p) => p.platform === 'Xbox').slice(0, 4);
  const psProducts = products.filter((p) => p.platform === 'PlayStation').slice(0, 4);
  const pcProducts = products.filter((p) => p.platform === 'PC').slice(0, 4);
  const mobileProducts = products.filter((p) => p.category === 'Mobile Top-Ups').slice(0, 8);
  const giftCardProducts = products.filter((p) => p.category === 'Gift Cards').slice(0, 4);
  const subProducts = products.filter((p) => p.category === 'Subscriptions').slice(0, 4);

  const featuredProduct = products.find((p) => p.isFeatured) || products[0];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero / Featured Banner */}
      <section className="relative rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-r from-[#0a1128] via-[#080d1e] to-[#120a28] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Kurdistan & Iraq's #1 Digital Store</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Instant Top-Ups & <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Digital Game Keys
              </span>
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              Buy PUBG Mobile UC, Free Fire Diamonds, Valorant Points, Steam Wallet cards, and AAA PC/Console games instantly with FastPay, Korek, and MasterCard.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/products?category=Mobile Top-Ups"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-cyan-950/50 flex items-center gap-2 transition-all"
              >
                <Smartphone className="w-4 h-4" />
                <span>Mobile Top-Ups</span>
              </Link>
              <Link
                to="/products?category=Paid Games"
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
              >
                <Gamepad2 className="w-4 h-4 text-cyan-400" />
                <span>Browse Games</span>
              </Link>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>100% Guaranteed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Instant Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-purple-400" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Featured Hero Product Card Highlight */}
          {featuredProduct && (
            <div className="lg:col-span-5">
              <div className="bg-[#0b0f19]/90 border border-slate-700/80 rounded-2xl p-4 shadow-2xl relative glow-card">
                <span className="absolute top-6 left-6 z-10 px-2.5 py-1 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-extrabold uppercase shadow-md">
                  Featured Product
                </span>
                <Link to={`/product/${featuredProduct.slug}`}>
                  <ProductImage product={featuredProduct} className="h-56 sm:h-64" />
                </Link>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-white">{featuredProduct.name}</h3>
                    <p className="text-xs text-slate-400">{featuredProduct.category} &bull; {featuredProduct.platform}</p>
                  </div>
                  <Link
                    to={`/product/${featuredProduct.slug}`}
                    className="p-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Category Cards Row */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link
          to="/products?category=Mobile Top-Ups"
          className="p-5 rounded-2xl bg-gradient-to-br from-[#0c1428] to-[#080d1a] border border-slate-800 hover:border-cyan-500/50 transition-all group flex flex-col justify-between h-32"
        >
          <div className="p-2.5 w-10 h-10 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-800/50 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-slate-100 group-hover:text-cyan-400 transition-colors">
              Mobile Top-Ups
            </h4>
            <p className="text-[11px] text-slate-400">PUBG, Free Fire, VP, Robux</p>
          </div>
        </Link>

        <Link
          to="/products?category=Paid Games"
          className="p-5 rounded-2xl bg-gradient-to-br from-[#120d28] to-[#0a081a] border border-slate-800 hover:border-purple-500/50 transition-all group flex flex-col justify-between h-32"
        >
          <div className="p-2.5 w-10 h-10 rounded-xl bg-purple-950/80 text-purple-400 border border-purple-800/50 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-slate-100 group-hover:text-purple-400 transition-colors">
              Paid Games
            </h4>
            <p className="text-[11px] text-slate-400">GTA V, RDR2, Wukong, Elden</p>
          </div>
        </Link>

        <Link
          to="/products?category=Gift Cards"
          className="p-5 rounded-2xl bg-gradient-to-br from-[#0c1c24] to-[#081218] border border-slate-800 hover:border-emerald-500/50 transition-all group flex flex-col justify-between h-32"
        >
          <div className="p-2.5 w-10 h-10 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 flex items-center justify-center group-hover:scale-110 transition-transform">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-slate-100 group-hover:text-emerald-400 transition-colors">
              Gift Cards
            </h4>
            <p className="text-[11px] text-slate-400">Steam, PSN, Xbox, Apple</p>
          </div>
        </Link>

        <Link
          to="/products?category=Subscriptions"
          className="p-5 rounded-2xl bg-gradient-to-br from-[#1c120c] to-[#120c08] border border-slate-800 hover:border-amber-500/50 transition-all group flex flex-col justify-between h-32"
        >
          <div className="p-2.5 w-10 h-10 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-800/50 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-slate-100 group-hover:text-amber-400 transition-colors">
              Subscriptions
            </h4>
            <p className="text-[11px] text-slate-400">Nitro, YouTube, Netflix</p>
          </div>
        </Link>
      </section>

      {/* Coming Soon Section */}
      {comingSoonProducts.length > 0 && (
        <ProductSection
          title="Coming Soon"
          subtitle="Upcoming blockbusters & pre-orders available soon"
          icon={Clock}
          badgeText="UPCOMING"
          products={comingSoonProducts}
        />
      )}

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Most popular items chosen by Kurdistan & Iraq gamers"
        icon={Flame}
        badgeText="HOT"
        viewAllLink="/products"
        products={topSalesProducts}
      />

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounted top-ups and game keys"
        icon={Zap}
        badgeText="SPECIAL"
        viewAllLink="/products"
        products={flashDealsProducts}
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="Fresh additions and trending gaming digital items"
        icon={TrendingUp}
        viewAllLink="/products"
        products={trendingProducts}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated"
        subtitle="Highest customer satisfaction ratings"
        icon={Star}
        viewAllLink="/products"
        products={topRatedProducts}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="Instant UC, Diamonds, V-Bucks, VP, Robux"
        icon={Smartphone}
        viewAllLink="/products?category=Mobile Top-Ups"
        products={mobileProducts}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming"
        subtitle="Official Steam & PC digital activation codes"
        icon={Monitor}
        viewAllLink="/products?platform=PC"
        products={pcProducts}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Section"
        subtitle="Xbox Series X|S, Xbox One & Game Pass items"
        icon={Gamepad2}
        viewAllLink="/products?platform=Xbox"
        products={xboxProducts}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Section"
        subtitle="PlayStation Store cards & PS4/PS5 games"
        icon={Gamepad2}
        viewAllLink="/products?platform=PlayStation"
        products={psProducts}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards"
        subtitle="Steam, PSN, Xbox, Google Play & Apple codes"
        icon={CreditCard}
        viewAllLink="/products?category=Gift Cards"
        products={giftCardProducts}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify"
        icon={Zap}
        viewAllLink="/products?category=Subscriptions"
        products={subProducts}
      />
    </div>
  );
}
