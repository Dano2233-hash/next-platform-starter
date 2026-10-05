import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Flame,
  TrendingUp,
  Star,
  Gamepad2,
  Smartphone,
  Monitor,
  Tv2,
  CreditCard,
  Sparkles,
  Clock,
  ShieldCheck,
  ArrowRight,
  Layers
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import CategoryTabs from '../components/CategoryTabs';
import { CATEGORIES } from '../data/categories';

const Home = () => {
  const { products } = useProducts();

  // Category & Tag Filtered Product Lists
  const comingSoonProducts = products.filter(p => p.stock > 0).slice(0, 4);
  const topSales = products.filter(p => (p.soldCount || 0) > 2000).slice(0, 4);
  const flashDeals = products.filter(p => p.isFlashDeal).slice(0, 4);
  const newTrending = products.filter(p => p.isTrending).slice(0, 4);
  const topRated = products.filter(p => p.isTopRated || (p.rating || 0) >= 4.9).slice(0, 4);

  const xboxProducts = products.filter(p => p.category === 'xbox' || p.platform === 'Xbox').slice(0, 4);
  const psProducts = products.filter(p => p.category === 'playstation' || p.platform === 'PlayStation').slice(0, 4);
  const pcProducts = products.filter(p => p.category === 'pc' || p.platform === 'PC').slice(0, 4);
  const mobileProducts = products.filter(p => p.category === 'mobile' || p.platform === 'Mobile').slice(0, 4);
  const giftCardProducts = products.filter(p => p.category === 'gift-cards' || p.type === 'Gift Card').slice(0, 4);
  const subscriptionProducts = products.filter(p => p.category === 'subscriptions' || p.type === 'Subscription').slice(0, 4);

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Featured Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c132c] via-[#070b1a] to-[#120a28] border border-cyan-500/20 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Instant Digital Delivery in Kurdistan & Iraq</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
              Level Up Your Gaming Experience with{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">
                Dano Store
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Buy official PUBG Mobile UC, Steam Gift Cards, Valorant VP, Free Fire Diamonds, PC Games, PlayStation PSN codes, and Premium Subscriptions instantly using FastPay, Korek, or MasterCard.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/products"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
              >
                Browse Store Products
              </Link>
              <Link
                to="/products?category=mobile"
                className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-cyan-300 font-bold text-sm transition-all"
              >
                PUBG UC Top-Up
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80">
              <div>
                <span className="block text-xl font-extrabold text-cyan-400">100%</span>
                <span className="text-[11px] text-slate-400">Genuine Digital Keys</span>
              </div>
              <div>
                <span className="block text-xl font-extrabold text-blue-400">FastPay</span>
                <span className="text-[11px] text-slate-400">& Korek Supported</span>
              </div>
              <div>
                <span className="block text-xl font-extrabold text-purple-400">24/7</span>
                <span className="text-[11px] text-slate-400">WhatsApp Support</span>
              </div>
            </div>
          </div>

          {/* Hero Banner Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950 px-2.5 py-1 rounded border border-cyan-500/30">
                  ⚡ TOP FEATURED ITEM
                </span>
                <span className="text-xs text-amber-400 font-extrabold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.9 Rating
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-100">PUBG Mobile UC Top-Up</h3>
                <p className="text-xs text-slate-400">Direct Player ID Reload. Fast, safe, and instant delivery to MENA / Iraq servers.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs text-slate-300 font-semibold">
                  <span>660 UC Package</span>
                  <span className="text-cyan-400 font-extrabold">15,000 IQD</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300 font-semibold">
                  <span>1800 UC Package</span>
                  <span className="text-cyan-400 font-extrabold">38,000 IQD</span>
                </div>
              </div>

              <Link
                to="/products/pubg-mobile-uc"
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1 transition-all"
              >
                <span>Buy PUBG UC Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation Row */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Browse Categories</h2>
        </div>
        <CategoryTabs
          activeCategory="all"
          onSelectCategory={(catId) => {
            if (catId === 'all') window.location.href = '/products';
            else window.location.href = `/products?category=${catId}`;
          }}
        />
      </section>

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Most popular products in Iraq & Kurdistan"
        icon={Flame}
        tag="HOT SELLERS"
        viewAllLink="/products"
        products={topSales}
      />

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals & Special Discounts"
        subtitle="Limited time discounted prices on digital keys & top-ups"
        icon={Zap}
        tag="LIMITED TIME"
        viewAllLink="/products"
        products={flashDeals}
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="Latest game additions and highly demanded top-up packages"
        icon={TrendingUp}
        tag="TRENDING"
        viewAllLink="/products"
        products={newTrending}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated Products"
        subtitle="5-star gamer favorites with guaranteed instant delivery"
        icon={Star}
        tag="5-STAR"
        viewAllLink="/products"
        products={topRated}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile In-Game Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, MLBB, CODM CP & More"
        icon={Smartphone}
        tag="MOBILE GAMING"
        viewAllLink="/products?category=mobile"
        products={mobileProducts}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Store & Games"
        subtitle="Forza Horizon 5, Sea of Thieves & Xbox Digital Vouchers"
        icon={Gamepad2}
        tag="XBOX"
        viewAllLink="/products?category=xbox"
        products={xboxProducts}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Store"
        subtitle="PSN Gift Cards, PlayStation Plus codes & digital top-ups"
        icon={Tv2}
        tag="PLAYSTATION"
        viewAllLink="/products?category=playstation"
        products={psProducts}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Games & Points"
        subtitle="Steam Keys (GTA V, Red Dead 2, Elden Ring, Black Myth Wukong) & Valorant VP"
        icon={Monitor}
        tag="PC GAMING"
        viewAllLink="/products?category=pc"
        products={pcProducts}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Digital Gift Cards"
        subtitle="Steam Wallet, Apple App Store, Google Play, Razer Gold & Amazon"
        icon={CreditCard}
        tag="GIFT CARDS"
        viewAllLink="/products?category=gift-cards"
        products={giftCardProducts}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify, Canva Pro & CapCut Pro"
        icon={Sparkles}
        tag="SERVICES"
        viewAllLink="/products?category=subscriptions"
        products={subscriptionProducts}
      />

      {/* Coming Soon Section */}
      <ProductSection
        title="Coming Soon & Restocked"
        subtitle="Fresh inventory digital codes arriving daily"
        icon={Clock}
        tag="COMING SOON"
        viewAllLink="/products"
        products={comingSoonProducts}
      />
    </div>
  );
};

export default Home;
