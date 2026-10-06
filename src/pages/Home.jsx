import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Flame,
  TrendingUp,
  Star,
  Gamepad2,
  Box,
  Monitor,
  Smartphone,
  CreditCard,
  Sparkles,
  Clock,
  ShieldCheck,
  ChevronRight,
  Gift
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { CategoryTabs } from '../components/CategoryTabs';
import { ProductSection } from '../components/ProductSection';

export const Home = () => {
  const { products } = useProducts();

  // Filter product subsets for home sections
  const featuredProducts = products.filter((p) => p.isFeatured);
  const flashDeals = products.filter((p) => p.isFlashDeal || (p.oldPrice && p.oldPrice > p.price));
  const trendingProducts = products.filter((p) => p.isTrending);
  const topRatedProducts = products.filter((p) => p.isTopRated || p.rating >= 4.9);
  const topSales = [...products].sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0)).slice(0, 8);

  const xboxProducts = products.filter((p) => p.platform === 'Xbox' || p.category === 'Xbox');
  const psProducts = products.filter((p) => p.platform === 'PlayStation' || p.category === 'PlayStation');
  const pcProducts = products.filter((p) => p.platform === 'PC' || p.category === 'PC Gaming');
  const mobileProducts = products.filter((p) => p.platform === 'Mobile' || p.category === 'Mobile Top-Ups');
  const giftCardProducts = products.filter((p) => p.platform === 'Gift Card' || p.category === 'Gift Cards');
  const subscriptionProducts = products.filter((p) => p.type === 'Subscription' || p.category === 'Subscriptions');

  // Hero product highlight
  const heroHighlight = products.find((p) => p.id === 'gta-v') || products[0];

  return (
    <div className="space-y-12">
      {/* HERO SECTION */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0a0f24] via-[#091436] to-[#120a2e] border border-slate-800 p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Kurdistan & Iraq #1 Gaming Store</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              Instant Game Keys, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                UC & Gift Cards
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              Buy PUBG UC, Free Fire Diamonds, Steam Wallet, PlayStation Gift Cards, Discord Nitro, and PC games instantly with FastPay, Korek, and MasterCard.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/products"
                className="px-7 py-3.5 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-white shadow-xl shadow-cyan-950/50 hover:shadow-cyan-500/25 transition-all flex items-center gap-2 active:scale-95"
              >
                <span>Explore Catalog</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <Link
                to="/products?category=mobile-top-ups"
                className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white transition-colors"
              >
                Mobile Top-Ups
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-slate-400 text-xs">
              <div>
                <span className="block font-black text-lg text-white">100%</span>
                <span>Official Codes</span>
              </div>
              <div>
                <span className="block font-black text-lg text-cyan-400">Instant</span>
                <span>Automated Delivery</span>
              </div>
              <div>
                <span className="block font-black text-lg text-purple-400">24/7</span>
                <span>Kurdistan Support</span>
              </div>
            </div>
          </div>

          {/* Hero Featured Card */}
          {heroHighlight && (
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-lg opacity-40" />
              <div className="relative bg-[#090d1a] border border-slate-700 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-cyan-400 uppercase tracking-widest text-[10px]">Featured Highlight</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Instant Key</span>
                </div>
                <div className="rounded-xl overflow-hidden h-48 bg-slate-900 border border-slate-800">
                  <img
                    src={heroHighlight.image || 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg'}
                    alt={heroHighlight.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">{heroHighlight.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">{heroHighlight.description}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Starting From</span>
                    <span className="text-base font-black text-cyan-300">{heroHighlight.price} IQD</span>
                  </div>
                  <Link
                    to={`/product/${heroHighlight.slug}`}
                    className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs hover:bg-cyan-400 transition-colors"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CATEGORY ROW */}
      <section className="space-y-4">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
          Browse Categories
        </h3>
        <CategoryTabs
          activeCategory="all"
          onSelectCategory={(catId) => {
            if (catId === 'all') {
              window.location.href = '/products';
            } else {
              window.location.href = `/products?category=${catId}`;
            }
          }}
        />
      </section>

      {/* FLASH DEALS */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on top games & gift cards"
        icon={Zap}
        badge="Sale"
        products={flashDeals}
        viewAllPath="/products?sale=true"
        maxItems={4}
      />

      {/* TOP SALES */}
      <ProductSection
        title="Top Sales"
        subtitle="Most popular products in Kurdistan & Iraq"
        icon={Flame}
        badge="Hot"
        products={topSales}
        viewAllPath="/products"
        maxItems={8}
      />

      {/* NEW & TRENDING */}
      <ProductSection
        title="New & Trending"
        subtitle="Fresh game releases and trending top-up packages"
        icon={TrendingUp}
        products={trendingProducts}
        viewAllPath="/products"
        maxItems={4}
      />

      {/* COMING SOON BANNER SECTION */}
      <section className="relative rounded-2xl bg-gradient-to-r from-purple-950/80 via-[#0a0d24] to-blue-950/80 border border-purple-800/40 p-6 sm:p-8 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30 shrink-0">
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Coming Soon
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                GTA VI, Monster Hunter Wilds & Crimson Desert
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Pre-orders and instant key reservations opening soon with exclusive launch discounts for Iraq gamers!
              </p>
            </div>
          </div>
          <Link
            to="/products"
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shrink-0 transition-colors"
          >
            Notify Me
          </Link>
        </div>
      </section>

      {/* MOBILE TOP-UPS SECTION */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, Robux & MLBB Pass"
        icon={Smartphone}
        badge="Top-Up"
        products={mobileProducts}
        viewAllPath="/products?category=mobile-top-ups"
        maxItems={8}
      />

      {/* PC GAMING SECTION */}
      <ProductSection
        title="PC Gaming"
        subtitle="Steam keys, Riot VP, GTA V, Elden Ring & Black Myth Wukong"
        icon={Monitor}
        badge="PC"
        products={pcProducts}
        viewAllPath="/products?category=pc-gaming"
        maxItems={8}
      />

      {/* PLAYSTATION SECTION */}
      <ProductSection
        title="PlayStation"
        subtitle="PSN Store Cards, God of War & PS Plus Subscriptions"
        icon={Gamepad2}
        badge="PS4 / PS5"
        products={psProducts}
        viewAllPath="/products?category=playstation"
        maxItems={4}
      />

      {/* XBOX SECTION */}
      <ProductSection
        title="Xbox"
        subtitle="Xbox Gift Cards, Forza Horizon 5 & Sea of Thieves"
        icon={Box}
        badge="Xbox"
        products={xboxProducts}
        viewAllPath="/products?category=xbox"
        maxItems={4}
      />

      {/* GIFT CARDS SECTION */}
      <ProductSection
        title="Gift Cards"
        subtitle="Steam, Google Play, Apple iTunes, Razer Gold & Amazon"
        icon={CreditCard}
        badge="Codes"
        products={giftCardProducts}
        viewAllPath="/products?category=gift-cards"
        maxItems={8}
      />

      {/* SUBSCRIPTIONS SECTION */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix 4K & Spotify"
        icon={Zap}
        badge="Services"
        products={subscriptionProducts}
        viewAllPath="/products?category=subscriptions"
        maxItems={8}
      />

      {/* TOP RATED SECTION */}
      <ProductSection
        title="Top Rated Products"
        subtitle="Highest reviewed games & services by Kurdistan customers"
        icon={Star}
        products={topRatedProducts}
        viewAllPath="/products"
        maxItems={4}
      />
    </div>
  );
};
