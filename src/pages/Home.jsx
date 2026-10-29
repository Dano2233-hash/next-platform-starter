import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  TrendingUp,
  Flame,
  Star,
  Gamepad2,
  Clock,
  Smartphone,
  Gift,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import ProductSection from '../components/ProductSection';
import SectionHeader from '../components/SectionHeader';
import CategoryTabs from '../components/CategoryTabs';

export default function Home() {
  const { products } = useProducts();

  // Filter product lists for home sections
  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const topSales = [...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
  const topRatedProducts = products.filter((p) => p.isTopRated).slice(0, 4);

  // Platform specific sections
  const xboxProducts = products.filter((p) => p.platform === 'Xbox').slice(0, 4);
  const psProducts = products.filter((p) => p.platform === 'PlayStation').slice(0, 4);
  const pcProducts = products.filter((p) => p.platform === 'PC').slice(0, 4);

  // Category sections
  const mobileTopUps = products.filter((p) => p.category === 'Mobile Top-Ups').slice(0, 4);
  const giftCards = products.filter((p) => p.category === 'Gift Cards').slice(0, 4);
  const subscriptions = products.filter((p) => p.category === 'Subscriptions').slice(0, 4);

  return (
    <div className="space-y-12 pb-16">

      {/* HERO / FEATURED SECTION */}
      <section className="relative overflow-hidden pt-6 pb-12 bg-gradient-to-b from-blue-950/30 via-[#05070f] to-[#05070f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Hero Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Direct Digital Gaming Store Kurdistan & Iraq
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
                Level Up Your <br />
                <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Gaming Experience
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
                Instant delivery for PC, Console & Mobile Top-ups. Instant PUBG UC, Free Fire Diamonds, Steam Cards, Discord Nitro & 100% legal digital keys in Kurdistan & Iraq.
              </p>

              {/* Local Payment Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> FastPay
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" /> Korek
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" /> MasterCard (IQD)
                </div>
              </div>

              {/* Hero CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/products"
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all flex items-center gap-2 active:scale-95"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Browse All Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/products?category=Mobile Top-Ups"
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center gap-2"
                >
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  <span>Mobile Top-Ups</span>
                </Link>
              </div>
            </div>

            {/* Hero Right Visual Feature Banner */}
            <div className="lg:col-span-5">
              <div className="relative p-6 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900 to-blue-950/60 border border-slate-800/80 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold uppercase text-cyan-400 tracking-wider flex items-center gap-1">
                    <Flame className="w-4 h-4 text-amber-400" /> Hot Pick Today
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Popular Top-Up
                  </span>
                </div>

                {products[0] && (
                  <div className="space-y-3">
                    <h3 className="text-xl font-extrabold text-white">{products[0].name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{products[0].description}</p>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Starting from</span>
                      <span className="text-lg font-black text-cyan-400">{products[0].price} IQD</span>
                    </div>
                    <Link
                      to={`/products/${products[0].slug}`}
                      className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs text-center block transition-colors"
                    >
                      Instant Recharge Now
                    </Link>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CATEGORY ROW QUICK TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <CategoryTabs
            selectedCategory="all"
            onSelectCategory={(cat) => {
              if (cat === 'all') window.location.href = '/products';
              else window.location.href = `/products?category=${encodeURIComponent(cat)}`;
            }}
          />
        </div>
      </section>

      {/* COMING SOON BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-blue-950/60 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Coming Soon to Dano Store</h3>
              <p className="text-xs text-slate-400 mt-0.5">Automated Instant API recharges & broader gift card denominations releasing soon!</p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30 whitespace-nowrap">
            Stay Tuned
          </span>
        </div>
      </section>

      {/* TOP SALES */}
      <ProductSection
        title="Top Sales"
        subtitle="Most ordered games and top-ups this month"
        icon={TrendingUp}
        viewAllPath="/products?sort=popular"
        products={topSales}
      />

      {/* FLASH DEALS */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts & special prices"
        icon={Flame}
        viewAllPath="/products"
        products={flashDeals}
      />

      {/* NEW & TRENDING */}
      <ProductSection
        title="New & Trending"
        subtitle="Fresh additions and player favorites"
        icon={Zap}
        viewAllPath="/products"
        products={trendingProducts}
      />

      {/* TOP RATED */}
      <ProductSection
        title="Top Rated"
        subtitle="Highest customer rating and satisfaction"
        icon={Star}
        viewAllPath="/products"
        products={topRatedProducts}
      />

      {/* MOBILE TOP-UPS */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="PUBG UC, Free Fire, MLBB, COD Mobile & More"
        icon={Smartphone}
        viewAllPath="/products?category=Mobile Top-Ups"
        products={mobileTopUps}
      />

      {/* PAID GAMES */}
      <ProductSection
        title="PC Gaming & Digital Keys"
        subtitle="GTA V, Elden Ring, Red Dead Redemption 2 & Steam keys"
        icon={Gamepad2}
        viewAllPath="/products?category=Paid Games"
        products={pcProducts}
      />

      {/* PLAYSTATION SECTION */}
      <ProductSection
        title="PlayStation Essentials"
        subtitle="PSN Gift cards & PlayStation console titles"
        icon={Gamepad2}
        viewAllPath="/products?platform=PlayStation"
        products={psProducts}
      />

      {/* XBOX SECTION */}
      <ProductSection
        title="Xbox Series & Game Pass"
        subtitle="Xbox Digital Gift Cards & Console Games"
        icon={Gamepad2}
        viewAllPath="/products?platform=Xbox"
        products={xboxProducts}
      />

      {/* GIFT CARDS SECTION */}
      <ProductSection
        title="Digital Gift Cards"
        subtitle="Steam Wallet, iTunes, Google Play, Razer Gold & Amazon"
        icon={Gift}
        viewAllPath="/products?category=Gift Cards"
        products={giftCards}
      />

      {/* SUBSCRIPTIONS SECTION */}
      <ProductSection
        title="Subscriptions & Services"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Canva Pro & Spotify"
        icon={Zap}
        viewAllPath="/products?category=Subscriptions"
        products={subscriptions}
      />

    </div>
  );
}
