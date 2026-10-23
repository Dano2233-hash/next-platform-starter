import React from 'react';
import { Link } from 'react-router-dom';
import {
  Gamepad2,
  Zap,
  Flame,
  Star,
  Clock,
  Sparkles,
  Box,
  Tv,
  Monitor,
  Smartphone,
  Gift,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Award
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';

export default function Home() {
  const { products } = useProducts();

  // Filters for home sections
  const featuredProducts = products.filter((p) => p.isFeatured);
  const topSalesProducts = products.filter((p) => p.tag === 'Top Sales' || p.soldCount > 2500);
  const flashDealsProducts = products.filter((p) => p.isFlashDeal || (p.oldPrice && p.oldPrice > p.price));
  const newTrendingProducts = products.filter((p) => p.isTrending || p.tag === 'New' || p.tag === 'Hot');
  const topRatedProducts = products.filter((p) => p.isTopRated || p.rating >= 4.9);
  const comingSoonProducts = products.filter((p) => p.tag === 'Coming Soon');

  // Platform & Category specific sections
  const xboxProducts = products.filter((p) => p.platform === 'Xbox' || p.category === 'xbox');
  const psProducts = products.filter((p) => p.platform === 'PlayStation' || p.category === 'playstation');
  const pcProducts = products.filter((p) => p.platform === 'PC' || p.category === 'pc');
  const mobileProducts = products.filter((p) => p.platform === 'Mobile' || p.category === 'mobile-topups');
  const giftCardProducts = products.filter((p) => p.category === 'gift-cards' || p.type === 'Gift Card');
  const subscriptionProducts = products.filter((p) => p.category === 'subscriptions' || p.type === 'Subscription');

  const categoriesList = [
    { name: 'Mobile Top-Ups', category: 'mobile-topups', icon: Smartphone, color: 'from-cyan-500/20 to-blue-600/20 text-cyan-400 border-cyan-500/30' },
    { name: 'Paid PC Games', category: 'pc', icon: Monitor, color: 'from-blue-500/20 to-indigo-600/20 text-blue-400 border-blue-500/30' },
    { name: 'PlayStation', category: 'playstation', icon: Tv, color: 'from-indigo-500/20 to-purple-600/20 text-indigo-400 border-indigo-500/30' },
    { name: 'Xbox Games', category: 'xbox', icon: Box, color: 'from-emerald-500/20 to-teal-600/20 text-emerald-400 border-emerald-500/30' },
    { name: 'Gift Cards', category: 'gift-cards', icon: Gift, color: 'from-amber-500/20 to-orange-600/20 text-amber-400 border-amber-500/30' },
    { name: 'Subscriptions', category: 'subscriptions', icon: Zap, color: 'from-purple-500/20 to-pink-600/20 text-purple-400 border-purple-500/30' },
  ];

  return (
    <div className="space-y-12">
      {/* HERO SECTION */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-[#0a122e] to-slate-950 border border-slate-800 p-6 sm:p-10 lg:p-14 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,229,255,0.15),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(112,0,255,0.18),transparent_60%)] pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-extrabold uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>#1 Digital Gaming Store in Kurdistan & Iraq</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Level Up Your Game with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">Instant Digital Delivery</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium max-w-2xl">
            Get instant codes, PUBG UC, Free Fire Diamonds, Steam Wallet, PSN Cards & PC Games at guaranteed best prices in IQD. FastPay, Korek & MasterCard accepted.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/products"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-cyan-500/20 flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Explore All Products</span>
            </Link>

            <Link
              to="/products?category=mobile-topups"
              className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 font-extrabold text-xs sm:text-sm flex items-center space-x-2 transition-all"
            >
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span>Mobile Top-Ups</span>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs">
            <div className="flex items-center space-x-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="font-semibold">100% Guaranteed Keys</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-semibold">Instant Manual Payment</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Star className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="font-semibold">24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY ROW */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-white tracking-tight uppercase">Browse Categories</h2>
          <Link to="/products" className="text-xs font-bold text-cyan-400 hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categoriesList.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                to={`/products?category=${cat.category}`}
                className={`p-4 rounded-2xl bg-gradient-to-br ${cat.color} border backdrop-blur-md flex flex-col items-center justify-center text-center space-y-2 hover:scale-105 transition-all duration-300 shadow-md`}
              >
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-extrabold text-xs text-white tracking-wide">{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FLASH DEALS */}
      {flashDealsProducts.length > 0 && (
        <ProductSection
          title="Flash Deals"
          subtitle="Limited time discounts on top games & gift cards"
          icon={Flame}
          linkTo="/products"
          products={flashDealsProducts}
          limit={4}
        />
      )}

      {/* TOP SALES */}
      <ProductSection
        title="Top Sales"
        subtitle="Best selling products chosen by gamers in Kurdistan & Iraq"
        icon={TrendingUp}
        linkTo="/products"
        products={topSalesProducts}
        limit={8}
      />

      {/* NEW & TRENDING */}
      <ProductSection
        title="New & Trending"
        subtitle="Hot releases, new top-up packages, and popular cards"
        icon={Sparkles}
        linkTo="/products"
        products={newTrendingProducts}
        limit={8}
      />

      {/* TOP RATED */}
      <ProductSection
        title="Top Rated"
        subtitle="Highest customer satisfaction ratings"
        icon={Award}
        linkTo="/products"
        products={topRatedProducts}
        limit={4}
      />

      {/* MOBILE TOP-UPS SECTION */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="PUBG Mobile UC, Free Fire Diamonds, Valorant VP, CODM CP & Robux"
        icon={Smartphone}
        linkTo="/products?category=mobile-topups"
        products={mobileProducts}
        limit={8}
      />

      {/* PC GAMING SECTION */}
      <ProductSection
        title="PC Gaming"
        subtitle="Steam keys, GTA V, Red Dead Redemption 2, Elden Ring, Black Myth: Wukong"
        icon={Monitor}
        linkTo="/products?category=pc"
        products={pcProducts}
        limit={8}
      />

      {/* PLAYSTATION SECTION */}
      <ProductSection
        title="PlayStation"
        subtitle="PSN Gift Cards, PlayStation games, Tekken 8, MK11"
        icon={Tv}
        linkTo="/products?category=playstation"
        products={psProducts}
        limit={4}
      />

      {/* XBOX SECTION */}
      <ProductSection
        title="Xbox"
        subtitle="Forza Horizon 5, Sea of Thieves, Xbox Gift Cards"
        icon={Box}
        linkTo="/products?category=xbox"
        products={xboxProducts}
        limit={4}
      />

      {/* GIFT CARDS SECTION */}
      <ProductSection
        title="Gift Cards"
        subtitle="Steam Wallet, PSN, Xbox, Google Play, Apple, Nintendo, Razer Gold"
        icon={Gift}
        linkTo="/products?category=gift-cards"
        products={giftCardProducts}
        limit={8}
      />

      {/* SUBSCRIPTIONS SECTION */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix 4K, Spotify, Canva Pro"
        icon={Zap}
        linkTo="/products?category=subscriptions"
        products={subscriptionProducts}
        limit={8}
      />

      {/* COMING SOON SECTION (IF ANY) */}
      {comingSoonProducts.length > 0 && (
        <ProductSection
          title="Coming Soon"
          subtitle="Upcoming releases and top-up packages coming to Dano Store"
          icon={Clock}
          linkTo="/products"
          products={comingSoonProducts}
          limit={4}
        />
      )}
    </div>
  );
}
