import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductSection } from '../components/ProductSection';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../data/categories';
import {
  Zap,
  Flame,
  TrendingUp,
  Star,
  Gamepad2,
  Smartphone,
  CreditCard,
  Tv,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Clock,
  Layers,
} from 'lucide-react';

export const Home = ({ products, onAddToCart }) => {
  const navigate = useNavigate();

  // Featured Hero Product or Banner
  const featuredProducts = products.filter((p) => p.isFeatured);
  const heroProduct = featuredProducts[0] || products[0];

  // Section Filters
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const trendingProducts = products.filter((p) => p.isTrending);
  const topRatedProducts = products.filter((p) => p.isTopRated);

  // Platform Sections
  const pcProducts = products.filter((p) => p.platform === 'PC');
  const xboxProducts = products.filter((p) => p.platform === 'Xbox');
  const psProducts = products.filter((p) => p.platform === 'PlayStation');

  // Category Sections
  const mobileTopUps = products.filter((p) => p.category === 'mobile');
  const giftCards = products.filter((p) => p.category === 'gift-cards');
  const subscriptions = products.filter((p) => p.category === 'subscriptions');

  const comingSoonItems = [
    {
      title: 'GTA VI Pre-Orders',
      platform: 'PlayStation / Xbox',
      date: 'Coming 2025',
      badge: 'Pre-Order Soon',
    },
    {
      title: 'Monster Hunter Wilds',
      platform: 'PC / Console',
      date: 'Q1 2025',
      badge: 'Wishlist',
    },
    {
      title: 'Assassin\'s Creed Shadows',
      platform: 'PC / PS5',
      date: 'November 2024',
      badge: 'Upcoming',
    },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* HERO / FEATURED SECTION */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#080e1e] via-[#0c1329] to-[#120a24] border border-slate-800/80 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-extrabold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Digital Gaming Store Kurdistan & Iraq</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Level Up Your Game with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Dano Store</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Instant delivery for PUBG UC, Free Fire Diamonds, Steam Wallet, PC games, Discord Nitro & subscriptions. Local payments via FastPay, Korek and MasterCard.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/products"
                className="px-6 py-3 rounded-xl font-extrabold text-sm bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-slate-950 hover:text-black shadow-lg shadow-cyan-950/50 hover:opacity-95 transition-all flex items-center gap-2"
              >
                <span>Explore Store</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/products?category=mobile"
                className="px-6 py-3 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all"
              >
                Mobile Top-Ups
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs text-slate-400">
              <div>
                <span className="block font-black text-white text-base">100% Legal</span>
                <span>Official Digital Keys</span>
              </div>
              <div>
                <span className="block font-black text-cyan-400 text-base">FastPay & Korek</span>
                <span>Local Iraq Payments</span>
              </div>
              <div>
                <span className="block font-black text-purple-400 text-base">24/7 Delivery</span>
                <span>Instant Auto Service</span>
              </div>
            </div>
          </div>

          {/* Featured Highlight Card */}
          {heroProduct && (
            <div className="lg:col-span-5 bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-5 shadow-xl relative group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Featured Title
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{heroProduct.rating || 5.0}</span>
                </div>
              </div>

              <div className="aspect-[16/10] overflow-hidden rounded-xl mb-4">
                <ProductCard product={heroProduct} onAddToCart={onAddToCart} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CATEGORY ROW */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" /> Browse by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/products?category=mobile"
            className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:shadow-lg transition-all group"
          >
            <div className="p-2.5 w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">Mobile Top-Ups</h3>
            <p className="text-xs text-slate-400 mt-0.5">UC, Diamonds, VP & CP</p>
          </Link>

          <Link
            to="/products?category=paid-games"
            className="p-4 rounded-2xl bg-gradient-to-br from-blue-950/40 to-slate-900 border border-slate-800 hover:border-blue-500/50 hover:shadow-lg transition-all group"
          >
            <div className="p-2.5 w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-3 group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">Paid PC Games</h3>
            <p className="text-xs text-slate-400 mt-0.5">Steam Keys & Downloads</p>
          </Link>

          <Link
            to="/products?category=gift-cards"
            className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/40 to-slate-900 border border-slate-800 hover:border-purple-500/50 hover:shadow-lg transition-all group"
          >
            <div className="p-2.5 w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-3 group-hover:scale-110 transition-transform">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">Gift Cards</h3>
            <p className="text-xs text-slate-400 mt-0.5">Steam, PSN, Xbox, Apple</p>
          </Link>

          <Link
            to="/products?category=subscriptions"
            className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:shadow-lg transition-all group"
          >
            <div className="p-2.5 w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-3 group-hover:scale-110 transition-transform">
              <Tv className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">Subscriptions</h3>
            <p className="text-xs text-slate-400 mt-0.5">Discord Nitro, Netflix, YT</p>
          </Link>
        </div>
      </section>

      {/* FLASH DEALS SECTION */}
      {flashDeals.length > 0 && (
        <ProductSection
          title="Flash Deals"
          subtitle="Limited time discounts on top game codes & credits"
          icon={Zap}
          products={flashDeals}
          onAddToCart={onAddToCart}
          linkTo="/products"
          limit={4}
        />
      )}

      {/* NEW & TRENDING */}
      {trendingProducts.length > 0 && (
        <ProductSection
          title="New & Trending"
          subtitle="Most popular items among gamers in Kurdistan"
          icon={Flame}
          products={trendingProducts}
          onAddToCart={onAddToCart}
          linkTo="/products"
          limit={8}
        />
      )}

      {/* COMING SOON BANNER */}
      <section className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-cyan-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-2">
          <Clock className="w-4 h-4" />
          <span>Upcoming Releases</span>
        </div>
        <h2 className="text-2xl font-black text-white mb-6">Coming Soon to Dano Store</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {comingSoonItems.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 inline-block mb-2">
                  {item.badge}
                </span>
                <h3 className="font-bold text-slate-100 text-sm">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{item.platform}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-cyan-400 font-semibold">
                Expected: {item.date}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TOP RATED */}
      {topRatedProducts.length > 0 && (
        <ProductSection
          title="Top Rated Games & Services"
          subtitle="Highly recommended digital products"
          icon={Star}
          products={topRatedProducts}
          onAddToCart={onAddToCart}
          linkTo="/products"
          limit={4}
        />
      )}

      {/* MOBILE TOP-UPS */}
      {mobileTopUps.length > 0 && (
        <ProductSection
          title="Mobile Top-Ups & In-Game Currency"
          subtitle="PUBG UC, Free Fire Diamonds, Robux, COD Points & More"
          icon={Smartphone}
          products={mobileTopUps}
          onAddToCart={onAddToCart}
          linkTo="/products?category=mobile"
          limit={4}
        />
      )}

      {/* PC GAMING SECTION */}
      {pcProducts.length > 0 && (
        <ProductSection
          title="PC Gaming Section"
          subtitle="Official Steam keys & paid title downloads"
          icon={Gamepad2}
          products={pcProducts}
          onAddToCart={onAddToCart}
          linkTo="/products?platform=PC"
          limit={4}
        />
      )}

      {/* PLAYSTATION SECTION */}
      {psProducts.length > 0 && (
        <ProductSection
          title="PlayStation Section"
          subtitle="PSN Gift cards and PlayStation games"
          icon={CreditCard}
          products={psProducts}
          onAddToCart={onAddToCart}
          linkTo="/products?platform=PlayStation"
          limit={4}
        />
      )}

      {/* XBOX SECTION */}
      {xboxProducts.length > 0 && (
        <ProductSection
          title="Xbox Section"
          subtitle="Xbox gift cards & Game Pass codes"
          icon={CreditCard}
          products={xboxProducts}
          onAddToCart={onAddToCart}
          linkTo="/products?platform=Xbox"
          limit={4}
        />
      )}

      {/* GIFT CARDS */}
      {giftCards.length > 0 && (
        <ProductSection
          title="Gift Cards Section"
          subtitle="Steam, PSN, Xbox, Google Play, Apple & Razer Gold"
          icon={CreditCard}
          products={giftCards}
          onAddToCart={onAddToCart}
          linkTo="/products?category=gift-cards"
          limit={4}
        />
      )}

      {/* SUBSCRIPTIONS */}
      {subscriptions.length > 0 && (
        <ProductSection
          title="Digital Subscriptions"
          subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify & Pro Apps"
          icon={Tv}
          products={subscriptions}
          onAddToCart={onAddToCart}
          linkTo="/products?category=subscriptions"
          limit={4}
        />
      )}
    </div>
  );
};
