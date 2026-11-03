import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Zap,
  Flame,
  Star,
  Clock,
  ShieldCheck,
  TrendingUp,
  Award,
  ChevronRight,
  Gamepad2,
  Smartphone,
  CreditCard,
  Sparkles,
  Monitor,
  Box,
  Tv,
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import ProductSection from '../components/ProductSection';
import CategoryTabs from '../components/CategoryTabs';
import { formatPrice } from '../utils/formatPrice';

export default function Home() {
  const { products } = useProducts();
  const navigate = useNavigate();

  // Filter products for various sections
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const topSales = [...products].sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0)).slice(0, 8);
  const trendingProducts = products.filter((p) => p.isTrending);
  const topRatedProducts = products.filter((p) => p.isTopRated || p.rating >= 4.9);

  // Platform/Category sections
  const xboxProducts = products.filter((p) => p.platform === 'Xbox' || p.category === 'xbox');
  const playstationProducts = products.filter((p) => p.platform === 'PlayStation' || p.category === 'playstation');
  const pcProducts = products.filter((p) => p.platform === 'PC' || p.category === 'pc');
  const mobileProducts = products.filter((p) => p.category === 'mobile' || p.platform === 'Mobile');
  const giftCardProducts = products.filter((p) => p.category === 'gift-cards' || p.platform === 'Gift Card');
  const subscriptionProducts = products.filter((p) => p.category === 'subscriptions' || p.type === 'Subscription');

  // Coming Soon titles
  const comingSoonTitles = [
    {
      title: 'Grand Theft Auto VI',
      platform: 'PS5 / Xbox Series X',
      date: 'Coming 2025',
      tag: 'Pre-order Soon',
      desc: 'Vice City awaits. Pre-order notifications and currency packs will be live upon release.',
    },
    {
      title: 'Monster Hunter Wilds',
      platform: 'PC / PS5 / Xbox',
      date: 'Q1 2025',
      tag: 'Anticipated',
      desc: 'Next level monster hunting action. Steam and console keys directly to Kurdistan.',
    },
    {
      title: 'DOOM: The Dark Ages',
      platform: 'PC / Xbox / PS5',
      date: 'Coming 2025',
      tag: 'Prequel Epic',
      desc: 'Origin story of the Doom Slayer’s rage in a dark, medieval galactic battle.',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero / Featured Showcase Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c142b] via-[#090e1f] to-[#05070f] border border-cyan-500/20 p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} className="animate-spin" />
              <span>Official Kurdistan & Iraq Gaming Store</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Instant Gaming Keys, <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Top-Ups & Subscriptions
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              Fast, safe and direct digital recharge for PUBG UC, Steam keys, PlayStation & Xbox cards, Discord Nitro, and Netflix. Pay comfortably via FastPay, Korek, and MasterCard.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/products"
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-cyan-950/50 flex items-center gap-2 transition-all"
              >
                <Zap size={16} className="fill-slate-950" />
                <span>Browse All Products</span>
              </Link>
              <Link
                to="/products?category=mobile"
                className="py-3 px-5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors"
              >
                <Smartphone size={16} />
                <span>Mobile Top-Ups</span>
              </Link>
            </div>

            {/* Fast Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
              <div>
                <p className="text-lg sm:text-xl font-black text-white font-mono">10,000+</p>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Orders Fulfilled</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-black text-cyan-400 font-mono">5 - 15 Mins</p>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Average Delivery</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-black text-white font-mono">100%</p>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Legit & Working</p>
              </div>
            </div>
          </div>

          {/* Hero Featured Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#0b1120] border border-slate-700/80 rounded-2xl p-5 shadow-2xl relative group">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span className="font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Flame size={14} /> Flash Deal of the Day
                </span>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold">
                  SAVE 48%
                </span>
              </div>

              <div className="rounded-xl overflow-hidden mb-4 border border-slate-800 bg-slate-950">
                <img
                  src="https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg"
                  alt="GTA V"
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-white text-lg">Grand Theft Auto V</h3>
                  <span className="text-cyan-400 font-black text-lg font-mono">22,000 IQD</span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Premium Edition for PC Steam. Full game + Criminal Enterprise Starter Pack with online access.
                </p>
                <div className="pt-2">
                  <Link
                    to="/product/gta-v"
                    className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Claim Deal Now</span>
                    <ChevronRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Gamepad2 size={18} className="text-cyan-400" />
            <span>Browse by Category</span>
          </h2>
        </div>
        <CategoryTabs
          selectedCategory="all"
          onSelectCategory={(catId) => {
            if (catId === 'all') navigate('/products');
            else navigate(`/products?category=${catId}`);
          }}
        />
      </section>

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited-time discounts on top gaming titles and direct recharge packages."
        badge="Hot Discounts"
        icon={Zap}
        linkTo="/products"
        linkText="View All Deals"
        products={flashDeals}
        limit={4}
      />

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="The most frequently ordered top-ups, game keys, and memberships in Iraq."
        badge="Best Sellers"
        icon={Flame}
        linkTo="/products"
        linkText="Explore Best Sellers"
        products={topSales}
        limit={8}
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="Currently viral games and high demand items trending right now."
        badge="Popular Now"
        icon={TrendingUp}
        linkTo="/products"
        linkText="Explore Trending"
        products={trendingProducts}
        limit={4}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated"
        subtitle="Community favorites rated 4.9+ stars with guaranteed instant delivery."
        badge="5-Star Rated"
        icon={Star}
        linkTo="/products"
        linkText="View High Rated"
        products={topRatedProducts}
        limit={4}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="Instant recharge for PUBG UC, Free Fire Diamonds, MLBB, Roblox, and FC Mobile."
        badge="Instant Delivery"
        icon={Smartphone}
        linkTo="/products?category=mobile"
        linkText="See All Mobile Top-Ups"
        products={mobileProducts}
        limit={4}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming"
        subtitle="Paid Steam keys, Valorant VP, and COD Points. No free base games."
        badge="PC Master Race"
        icon={Monitor}
        linkTo="/products?platform=PC"
        linkText="View PC Catalog"
        products={pcProducts}
        limit={4}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation"
        subtitle="PSN digital gift cards, PS Plus subscriptions, and PlayStation blockbusters."
        badge="Play Has No Limits"
        icon={Tv}
        linkTo="/products?platform=PlayStation"
        linkText="View PlayStation Catalog"
        products={playstationProducts}
        limit={4}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox"
        subtitle="Xbox Game Pass Ultimate, digital Xbox codes, and Forza Horizon 5."
        badge="Power Your Dreams"
        icon={Box}
        linkTo="/products?platform=Xbox"
        linkText="View Xbox Catalog"
        products={xboxProducts}
        limit={4}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards"
        subtitle="Steam Wallet, Google Play, Apple, Nintendo eShop, and Razer Gold PINs."
        badge="100% Genuine Codes"
        icon={CreditCard}
        linkTo="/products?category=gift-cards"
        linkText="Browse Gift Cards"
        products={giftCardProducts}
        limit={4}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix 4K, Spotify, and Canva Pro."
        badge="Premium Lifestyle"
        icon={Sparkles}
        linkTo="/products?category=subscriptions"
        linkText="All Subscriptions"
        products={subscriptionProducts}
        limit={4}
      />

      {/* Coming Soon Section */}
      <section className="bg-gradient-to-r from-slate-900/90 via-[#0b1224] to-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Clock size={18} className="text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Upcoming Titles</span>
            </div>
            <h2 className="text-2xl font-black text-white">Coming Soon to Dano Store</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {comingSoonTitles.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#070b16] border border-slate-800/80 hover:border-cyan-500/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    {item.tag}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{item.date}</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">{item.desc}</p>
              </div>
              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-semibold">
                Platform: <span className="text-white">{item.platform}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
