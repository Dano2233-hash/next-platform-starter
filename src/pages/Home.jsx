import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Zap,
  Flame,
  Star,
  Sparkles,
  Gamepad2,
  Tv,
  Smartphone,
  Gift,
  Clock,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductSection from '../components/ProductSection';
import SectionHeader from '../components/SectionHeader';
import { useProducts } from '../hooks/useProducts';

export function Home() {
  const { products } = useProducts();
  const navigate = useNavigate();

  // Filter product collections
  const featuredProducts = products.filter((p) => p.isFeatured && !p.isComingSoon).slice(0, 4);
  const flashDeals = products.filter((p) => p.isFlashDeal && !p.isComingSoon).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending && !p.isComingSoon).slice(0, 4);
  const topRatedProducts = products.filter((p) => p.isTopRated && !p.isComingSoon).slice(0, 4);
  const comingSoonProducts = products.filter((p) => p.isComingSoon).slice(0, 4);

  // Platform & Category specific sections
  const xboxProducts = products.filter((p) => p.platform === 'Xbox' && !p.isComingSoon).slice(0, 4);
  const playstationProducts = products.filter((p) => p.platform === 'PlayStation' && !p.isComingSoon).slice(0, 4);
  const pcProducts = products.filter((p) => p.platform === 'PC' && !p.isComingSoon).slice(0, 4);
  const mobileProducts = products.filter((p) => p.category === 'Mobile Top-Ups' && !p.isComingSoon).slice(0, 4);
  const giftCards = products.filter((p) => p.category === 'Gift Cards' && !p.isComingSoon).slice(0, 4);
  const subscriptions = products.filter((p) => p.category === 'Subscriptions' && !p.isComingSoon).slice(0, 4);

  // Hero product banner highlight (e.g. PUBG Mobile or GTA V)
  const heroProduct = products.find((p) => p.id === 'pubg-uc') || products[0];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero / Featured Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c132c] via-[#070b1a] to-[#0d1630] border border-slate-800/80 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
              <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
              <span>KURDISTAN & IRAQ DIGITAL STORE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Level Up Your <span className="text-gradient">Gaming Experience</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Instant automated delivery for PUBG UC, Free Fire Diamonds, Steam PC games, PlayStation & Xbox Gift Cards, and Premium Subscriptions.
            </p>

            {/* Value Props Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-semibold text-slate-200">
              <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Official Codes</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Instant Top-Up</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>FastPay & Korek</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => navigate('/products')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl shadow-cyan-500/20"
              >
                Browse All Games & Codes
              </button>
              <button
                onClick={() => navigate('/products?category=Mobile Top-Ups')}
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm transition-colors"
              >
                Mobile Top-Ups
              </button>
            </div>
          </div>

          {/* Hero Featured Card Highlight */}
          <div className="lg:col-span-5">
            {heroProduct && (
              <div className="relative bg-[#0a0e22] border border-cyan-500/30 rounded-2xl p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-extrabold uppercase tracking-wider">
                    🔥 HOT FEATURED ITEM
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-400">{heroProduct.soldCount}+ Orders Delivered</span>
                </div>
                <div className="h-44 rounded-xl overflow-hidden border border-slate-800">
                  <ProductCard product={heroProduct} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Category Navigation Row Cards */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { name: 'Mobile Top-Ups', icon: Smartphone, color: 'from-cyan-500/20 to-blue-600/10 border-cyan-500/30', query: '?category=Mobile Top-Ups' },
          { name: 'Paid PC Games', icon: Gamepad2, color: 'from-purple-500/20 to-indigo-600/10 border-purple-500/30', query: '?category=Paid Games' },
          { name: 'PlayStation', icon: Tv, color: 'from-blue-500/20 to-indigo-600/10 border-blue-500/30', query: '?platform=PlayStation' },
          { name: 'Xbox Console', icon: Gamepad2, color: 'from-emerald-500/20 to-teal-600/10 border-emerald-500/30', query: '?platform=Xbox' },
          { name: 'Gift Cards', icon: Gift, color: 'from-amber-500/20 to-orange-600/10 border-amber-500/30', query: '?category=Gift Cards' },
          { name: 'Subscriptions', icon: Layers, color: 'from-rose-500/20 to-pink-600/10 border-rose-500/30', query: '?category=Subscriptions' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={`/products${item.query}`}
              className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} border text-center flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all shadow-md group`}
            >
              <Icon className="w-6 h-6 text-slate-200 group-hover:text-cyan-400 transition-colors" />
              <span className="text-xs font-bold text-white leading-snug">{item.name}</span>
            </Link>
          );
        })}
      </section>

      {/* Flash Deals Section */}
      {flashDeals.length > 0 && (
        <ProductSection
          title="Flash Deals & Discounted Sales"
          subtitle="Limited time discounted prices on top game codes"
          icon={Flame}
          linkTo="/products"
          products={flashDeals}
        />
      )}

      {/* Top Sales & Featured Products */}
      {featuredProducts.length > 0 && (
        <ProductSection
          title="Top Sales & Featured Games"
          subtitle="Most popular items bought by gamers in Erbil, Sulaymaniyah, and Duhok"
          icon={TrendingUp}
          linkTo="/products"
          products={featuredProducts}
        />
      )}

      {/* Mobile Top-Ups Section */}
      {mobileProducts.length > 0 && (
        <ProductSection
          title="Mobile Game Top-Ups"
          subtitle="Instant Player ID top-ups for PUBG UC, Free Fire Diamonds, MLBB, Robux & CP"
          icon={Smartphone}
          linkTo="/products?category=Mobile Top-Ups"
          products={mobileProducts}
        />
      )}

      {/* New & Trending */}
      {trendingProducts.length > 0 && (
        <ProductSection
          title="New & Trending Releases"
          subtitle="Latest releases and hot trending game titles"
          icon={Sparkles}
          linkTo="/products"
          products={trendingProducts}
        />
      )}

      {/* Coming Soon Section */}
      {comingSoonProducts.length > 0 && (
        <section className="my-10">
          <SectionHeader
            title="Coming Soon - Upcoming Games"
            subtitle="Pre-orders and upcoming blockbuster releases"
            icon={Clock}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {comingSoonProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Top Rated Section */}
      {topRatedProducts.length > 0 && (
        <ProductSection
          title="Top Rated Games & Services"
          subtitle="Highest rated products with 5-star customer feedback"
          icon={Star}
          linkTo="/products"
          products={topRatedProducts}
        />
      )}

      {/* PC Gaming Section */}
      {pcProducts.length > 0 && (
        <ProductSection
          title="PC Gaming & Steam Keys"
          subtitle="Official Steam keys for GTA V, Elden Ring, RDR2 and more"
          icon={Gamepad2}
          linkTo="/products?platform=PC"
          products={pcProducts}
        />
      )}

      {/* PlayStation Section */}
      {playstationProducts.length > 0 && (
        <ProductSection
          title="PlayStation Network Games & Cards"
          subtitle="PSN digital codes and game keys"
          icon={Tv}
          linkTo="/products?platform=PlayStation"
          products={playstationProducts}
        />
      )}

      {/* Xbox Section */}
      {xboxProducts.length > 0 && (
        <ProductSection
          title="Xbox Digital Store"
          subtitle="Xbox Game Pass, digital keys and gift cards"
          icon={Gamepad2}
          linkTo="/products?platform=Xbox"
          products={xboxProducts}
        />
      )}

      {/* Gift Cards Section */}
      {giftCards.length > 0 && (
        <ProductSection
          title="Digital Gift Cards"
          subtitle="Steam Wallet, iTunes, Google Play, Razer Gold & Amazon"
          icon={Gift}
          linkTo="/products?category=Gift Cards"
          products={giftCards}
        />
      )}

      {/* Subscriptions Section */}
      {subscriptions.length > 0 && (
        <ProductSection
          title="Digital Subscriptions"
          subtitle="Discord Nitro, YouTube Premium, Netflix 4K, Spotify & Canva Pro"
          icon={Layers}
          linkTo="/products?category=Subscriptions"
          products={subscriptions}
        />
      )}
    </div>
  );
}

export default Home;
