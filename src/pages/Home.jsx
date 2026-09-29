import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import ProductSection from '../components/ProductSection';
import CategoryTabs from '../components/CategoryTabs';
import ProductImage from '../components/ProductImage';
import {
  Flame,
  TrendingUp,
  Star,
  Zap,
  Smartphone,
  CreditCard,
  Gamepad2,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function Home() {
  const { products } = useProducts();

  // Filtered lists for Home page sections
  const featuredProducts = products.filter((p) => p.isFeatured);
  const flashDeals = products.filter((p) => p.isFlashDeal || p.oldPrice > p.price);
  const trendingProducts = products.filter((p) => p.isTrending);
  const topRatedProducts = products.filter((p) => p.isTopRated || p.rating >= 4.9);

  // Platform sections
  const xboxProducts = products.filter((p) => p.platform === 'Xbox').slice(0, 4);
  const playstationProducts = products.filter((p) => p.platform === 'PlayStation').slice(0, 4);
  const pcProducts = products.filter((p) => p.platform === 'PC').slice(0, 4);
  const mobileTopUps = products.filter((p) => p.category === 'Mobile Top-Ups').slice(0, 4);
  const giftCards = products.filter((p) => p.category === 'Gift Cards').slice(0, 4);
  const subscriptions = products.filter((p) => p.category === 'Subscriptions').slice(0, 4);

  // Top Sales (sorted by soldCount)
  const topSales = [...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, 4);

  // Hero Featured Item (e.g. PUBG UC or GTA V)
  const heroItem = products.find((p) => p.slug === 'pubg-mobile-uc') || products[0];

  return (
    <div className="space-y-12 pb-16">
      {/* ==================== HERO / FEATURED SECTION ==================== */}
      <section className="relative overflow-hidden pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-[#0b132b] via-[#0e1b38] to-[#070d1e] border border-cyan-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden">
            {/* Ambient Lighting Backdrops */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-extrabold text-xs uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Kurdistan & Iraq #1 Digital Store
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight leading-tight">
                  Level Up Your Gaming with <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Instant Digital Delivery
                  </span>
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                  Get official game top-ups, paid Steam keys, PlayStation/Xbox cards, and subscriptions in IQD. Fast, reliable, and localized support.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    to="/products"
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-cyan-950/60 transition-all scale-100 hover:scale-[1.02]"
                  >
                    <Zap className="w-4 h-4 fill-slate-950" />
                    Explore Catalog
                  </Link>
                  <Link
                    to="/products?category=Mobile%20Top-Ups"
                    className="px-6 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-100 font-bold text-sm flex items-center gap-2 transition-all"
                  >
                    <Smartphone className="w-4 h-4 text-cyan-400" />
                    Mobile Top-Ups
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Official Codes</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Instant Delivery</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>

              {/* Hero Right Visual Banner */}
              {heroItem && (
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-2xl border border-cyan-500/40 bg-slate-900/80 p-4 shadow-xl backdrop-blur-md group hover:border-cyan-400 transition-all">
                    <span className="absolute top-6 left-6 z-10 px-3 py-1 rounded-md bg-cyan-500 text-slate-950 font-black text-xs uppercase shadow-md">
                      Featured Offer
                    </span>
                    <div className="h-56 sm:h-64 rounded-xl overflow-hidden mb-4">
                      <ProductImage product={heroItem} className="h-full" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-100 text-base">{heroItem.name}</h3>
                        <p className="text-xs text-slate-400">{heroItem.platform} • {heroItem.category}</p>
                      </div>
                      <Link
                        to={`/product/${heroItem.slug}`}
                        className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs flex items-center gap-1"
                      >
                        Buy Now
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* ==================== CATEGORY ROW ==================== */}
        <section className="bg-[#090d1c] border border-slate-800 rounded-2xl p-4 sm:p-6">
          <div className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Quick Categories
          </div>
          <CategoryTabs
            selectedCategory="All"
            onSelectCategory={(cat) => {
              if (cat !== 'All') {
                window.location.href = `/products?category=${encodeURIComponent(cat)}`;
              }
            }}
          />
        </section>

        {/* ==================== COMING SOON ==================== */}
        <section className="rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/30 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Upcoming Releases
              </span>
              <h2 className="text-xl font-black text-slate-100 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" />
                Coming Soon to Dano Store
              </h2>
              <p className="text-xs text-slate-400">
                Pre-orders and upcoming additions for upcoming blockbusters & new season game cards.
              </p>
            </div>
            <Link
              to="/products"
              className="px-4 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800/60 text-purple-200 border border-purple-500/40 text-xs font-bold shrink-0"
            >
              Get Notified
            </Link>
          </div>
        </section>

        {/* ==================== TOP SALES ==================== */}
        <ProductSection
          title="Top Sales"
          subtitle="Best selling game cards and top-ups favored by local gamers"
          badge="Bestsellers"
          icon={Flame}
          products={topSales}
          viewAllLink="/products"
        />

        {/* ==================== FLASH DEALS ==================== */}
        <ProductSection
          title="Flash Deals"
          subtitle="Limited time discounts and special prices in IQD"
          badge="Hot Discount"
          icon={Zap}
          products={flashDeals.slice(0, 4)}
          viewAllLink="/products"
        />

        {/* ==================== NEW & TRENDING ==================== */}
        <ProductSection
          title="New & Trending"
          subtitle="Trending games, gift cards, and top-ups right now"
          badge="Trending"
          icon={TrendingUp}
          products={trendingProducts.slice(0, 4)}
          viewAllLink="/products"
        />

        {/* ==================== TOP RATED ==================== */}
        <ProductSection
          title="Top Rated Products"
          subtitle="Highest customer rated digital keys and passes"
          badge="5-Star Verified"
          icon={Star}
          products={topRatedProducts.slice(0, 4)}
          viewAllLink="/products"
        />

        {/* ==================== XBOX SECTION ==================== */}
        <ProductSection
          title="Xbox Gaming"
          subtitle="Xbox Game Pass Ultimate, digital codes, and Xbox games"
          badge="Xbox Console & PC"
          icon={Gamepad2}
          products={xboxProducts}
          viewAllLink="/products?platform=Xbox"
        />

        {/* ==================== PLAYSTATION SECTION ==================== */}
        <ProductSection
          title="PlayStation Network"
          subtitle="PSN gift cards, PS Plus, and PlayStation digital keys"
          badge="PS4 & PS5"
          icon={Gamepad2}
          products={playstationProducts}
          viewAllLink="/products?platform=PlayStation"
        />

        {/* ==================== PC GAMING SECTION ==================== */}
        <ProductSection
          title="PC Gaming Store"
          subtitle="Steam keys, Valorant VP, and top PC titles"
          badge="Steam / Epic / Riot"
          icon={Gamepad2}
          products={pcProducts}
          viewAllLink="/products?platform=PC"
        />

        {/* ==================== MOBILE TOP-UPS SECTION ==================== */}
        <ProductSection
          title="Mobile Game Top-Ups"
          subtitle="UC, Diamonds, V-Bucks, Robux & CP delivered instantly"
          badge="Player ID Recharge"
          icon={Smartphone}
          products={mobileTopUps}
          viewAllLink="/products?category=Mobile%20Top-Ups"
        />

        {/* ==================== GIFT CARDS SECTION ==================== */}
        <ProductSection
          title="Digital Gift Cards"
          subtitle="Steam, Google Play, Apple, Razer Gold, Amazon & Nintendo"
          badge="Digital Code"
          icon={CreditCard}
          products={giftCards}
          viewAllLink="/products?category=Gift%20Cards"
        />

        {/* ==================== SUBSCRIPTIONS SECTION ==================== */}
        <ProductSection
          title="Digital Subscriptions"
          subtitle="Discord Nitro, YouTube Premium, Netflix 4K, Spotify & Canva Pro"
          badge="Premium Memberships"
          icon={Zap}
          products={subscriptions}
          viewAllLink="/products?category=Subscriptions"
        />
      </div>
    </div>
  );
}
