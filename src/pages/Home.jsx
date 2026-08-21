import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Zap,
  TrendingUp,
  Star,
  Gamepad2,
  Gamepad,
  Monitor,
  Smartphone,
  CreditCard,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import ProductSection from '../components/ProductSection';
import CategoryTabs from '../components/CategoryTabs';
import ProductCard from '../components/ProductCard';

export const Home = ({ products = [] }) => {
  // Filter products by flags/categories
  const featuredProducts = products.filter((p) => p.isFeatured);
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const trendingProducts = products.filter((p) => p.isTrending);
  const topRatedProducts = products.filter((p) => p.isTopRated);

  const xboxProducts = products.filter((p) => p.category === 'xbox' || p.platform === 'Xbox');
  const psProducts = products.filter((p) => p.category === 'playstation' || p.platform === 'PlayStation');
  const pcProducts = products.filter((p) => p.category === 'pc' || p.platform === 'PC');
  const mobileProducts = products.filter((p) => p.category === 'mobile' || p.platform === 'Mobile');
  const giftCardProducts = products.filter((p) => p.category === 'gift-cards' || p.platform === 'Gift Card');
  const subscriptionProducts = products.filter((p) => p.category === 'subscriptions' || p.platform === 'Subscription');

  const mainFeatured = featuredProducts[0] || products[0];

  return (
    <div className="space-y-16 pb-12">
      {/* HERO / FEATURED SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0a1224] via-[#0d1830] to-[#080e1c] border border-slate-800/80 p-6 sm:p-10 lg:p-12 shadow-2xl mt-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Official Gaming &amp; Digital Store in Kurdistan &amp; Iraq</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Level Up Your Gaming with <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Instant Digital Delivery</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Buy PC &amp; Console Games, PUBG UC, Free Fire Diamonds, Steam Wallet, Discord Nitro, and Digital Subscriptions at unbeatable IQD prices.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/products"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-950/50 hover:brightness-110 transition flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Store</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products?category=mobile"
                className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-sm transition cursor-pointer"
              >
                Mobile Top-Ups
              </Link>
            </div>

            {/* Quick trust items */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 text-xs text-slate-400 font-semibold">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>FastPay &amp; Korek</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Guaranteed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>24/7 Delivery</span>
              </div>
            </div>
          </div>

          {/* Hero Right Banner Card */}
          {mainFeatured && (
            <div className="lg:col-span-5 bg-[#070c18] border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-cyan-400 uppercase tracking-widest bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-1 rounded-md">
                  Featured Product
                </span>
                <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" /> {mainFeatured.rating}
                </span>
              </div>

              <div className="rounded-xl overflow-hidden h-52 bg-slate-900 border border-slate-800 relative">
                {mainFeatured.image ? (
                  <img src={mainFeatured.image} alt={mainFeatured.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-cyan-950 to-blue-950 text-cyan-400 font-bold">
                    {mainFeatured.name}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              </div>

              <div className="space-y-2">
                <h3 className="font-extrabold text-slate-100 text-lg line-clamp-1">{mainFeatured.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{mainFeatured.description}</p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link
                  to={`/product/${mainFeatured.slug || mainFeatured.id}`}
                  className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl text-center transition cursor-pointer"
                >
                  View Details &amp; Buy
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CATEGORY ROW */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-200">Browse Categories</h2>
        </div>
        <CategoryTabs
          selectedCategory="all"
          onSelectCategory={(id) => {
            if (id === 'all') window.location.href = '/products';
            else window.location.href = `/products?category=${id}`;
          }}
        />
      </section>

      {/* FLASH DEALS */}
      {flashDeals.length > 0 && (
        <ProductSection
          title="Flash Deals"
          subtitle="Limited time discounts on top digital games and codes"
          icon={Zap}
          badge="Limited Time"
          products={flashDeals}
          viewAllPath="/products?filter=flash"
          limit={4}
        />
      )}

      {/* COMING SOON BANNER */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-950/90 via-slate-900 to-indigo-950/90 border border-purple-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-950/80 border border-purple-500/40 px-2.5 py-1 rounded-md">
            Coming Soon
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Grand Theft Auto VI &amp; Monster Hunter Wilds Pre-Orders
          </h3>
          <p className="text-xs text-slate-300 max-w-lg">
            Stay tuned! Automated pre-orders and instant code reservations for upcoming blockbuster titles will be available on Dano Store soon.
          </p>
        </div>
        <button
          onClick={() => alert("Notification registered! You will be notified when pre-orders open.")}
          className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs whitespace-nowrap shadow-lg cursor-pointer"
        >
          Notify Me On Release
        </button>
      </section>

      {/* TOP SALES */}
      <ProductSection
        title="Top Sales"
        subtitle="Most purchased products by gamers in Kurdistan and Iraq"
        icon={Flame}
        badge="Best Sellers"
        products={products.filter((p) => p.soldCount > 1000)}
        viewAllPath="/products?sort=sales"
        limit={4}
      />

      {/* NEW & TRENDING */}
      {trendingProducts.length > 0 && (
        <ProductSection
          title="New &amp; Trending"
          subtitle="Hot releases and currently popular items"
          icon={TrendingUp}
          badge="Popular"
          products={trendingProducts}
          viewAllPath="/products?filter=trending"
          limit={4}
        />
      )}

      {/* TOP RATED */}
      {topRatedProducts.length > 0 && (
        <ProductSection
          title="Top Rated Games &amp; Cards"
          subtitle="Highest user rated titles on Dano Store"
          icon={Star}
          badge="5.0 Rating"
          products={topRatedProducts}
          viewAllPath="/products?filter=toprated"
          limit={4}
        />
      )}

      {/* XBOX SECTION */}
      {xboxProducts.length > 0 && (
        <ProductSection
          title="Xbox Games &amp; Cards"
          subtitle="Official Xbox digital keys and gift card top-ups"
          icon={Gamepad2}
          products={xboxProducts}
          viewAllPath="/products?category=xbox"
          limit={4}
        />
      )}

      {/* PLAYSTATION SECTION */}
      {psProducts.length > 0 && (
        <ProductSection
          title="PlayStation Network"
          subtitle="PS4/PS5 digital games and PSN gift cards"
          icon={Gamepad}
          products={psProducts}
          viewAllPath="/products?category=playstation"
          limit={4}
        />
      )}

      {/* PC GAMING SECTION */}
      {pcProducts.length > 0 && (
        <ProductSection
          title="PC Gaming Store"
          subtitle="Steam keys, Epic Games titles, and PC credits"
          icon={Monitor}
          products={pcProducts}
          viewAllPath="/products?category=pc"
          limit={4}
        />
      )}

      {/* MOBILE TOP-UPS SECTION */}
      {mobileProducts.length > 0 && (
        <ProductSection
          title="Mobile Game Top-Ups"
          subtitle="UC, Diamonds, V-Bucks, Robux &amp; CP instant player ID recharge"
          icon={Smartphone}
          badge="Instant Recharge"
          products={mobileProducts}
          viewAllPath="/products?category=mobile"
          limit={4}
        />
      )}

      {/* GIFT CARDS SECTION */}
      {giftCardProducts.length > 0 && (
        <ProductSection
          title="Digital Gift Cards"
          subtitle="Steam, PlayStation, Xbox, Google Play, Apple &amp; Razer Gold"
          icon={CreditCard}
          products={giftCardProducts}
          viewAllPath="/products?category=gift-cards"
          limit={4}
        />
      )}

      {/* SUBSCRIPTIONS SECTION */}
      {subscriptionProducts.length > 0 && (
        <ProductSection
          title="Digital Subscriptions"
          subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify &amp; Canva Pro"
          icon={Sparkles}
          products={subscriptionProducts}
          viewAllPath="/products?category=subscriptions"
          limit={4}
        />
      )}
    </div>
  );
};

export default Home;
