import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flame,
  Zap,
  TrendingUp,
  Star,
  Sparkles,
  Gamepad2,
  Smartphone,
  CreditCard,
  Calendar,
  Monitor,
  Box,
  Tv,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import CategoryTabs from '../components/CategoryTabs';
import { formatPrice } from '../utils/formatPrice';

export function Home() {
  const { products } = useProducts();
  const navigate = useNavigate();
  const [selectedCat, setSelectedCat] = useState('all');

  // Filter groups
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const trendingProducts = products.filter((p) => p.isTrending);
  const topRatedProducts = products.filter((p) => p.isTopRated);
  const topSalesProducts = [...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, 4);

  // Platform and Category specific groups
  const pcProducts = products.filter((p) => p.platform === 'PC' && p.category === 'games');
  const xboxProducts = products.filter((p) => p.platform === 'Xbox' || p.category === 'xbox');
  const psProducts = products.filter((p) => p.platform === 'PlayStation' || p.category === 'playstation');
  const mobileProducts = products.filter((p) => p.category === 'mobile');
  const giftCards = products.filter((p) => p.category === 'gift-cards');
  const subscriptions = products.filter((p) => p.category === 'subscriptions');

  const handleCategorySelect = (catId) => {
    setSelectedCat(catId);
    if (catId === 'all') {
      navigate('/products');
    } else {
      navigate(`/products?category=${catId}`);
    }
  };

  return (
    <div className="space-y-12 pb-16">

      {/* Hero / Featured Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1328] via-[#090e1c] to-[#060a14] border border-cyan-500/20 p-6 sm:p-10 lg:p-14 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>OFFICIAL DIGITAL GAMING DESTINATION IN KURDISTAN & IRAQ</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Level Up Your Game with <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Dano Store</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Instant digital game keys, PUBG Mobile UC, Free Fire Diamonds, Steam Wallet codes, and VIP Subscriptions. Pay securely using <strong>FastPay, Korek, and MasterCard</strong> with zero hidden fees.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/products"
              className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/products?category=mobile"
              className="px-6 py-3 rounded-xl font-semibold text-sm bg-slate-900/90 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 flex items-center gap-2 transition-all"
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobile Top-Ups (UC & Diamonds)</span>
            </Link>
          </div>

          {/* Quick Mini Perks */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
            <div>
              <span className="font-bold text-white block text-sm">⚡ Instant Delivery</span>
              <span>Direct to your account</span>
            </div>
            <div>
              <span className="font-bold text-white block text-sm">🔒 100% Genuine</span>
              <span>Legitimate digital license</span>
            </div>
            <div>
              <span className="font-bold text-white block text-sm">🇮🇶 Kurdistan & Iraq</span>
              <span>IQD Currency only</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Browse by Category
          </h3>
          <Link to="/products" className="text-xs text-cyan-400 hover:underline">
            View full catalog
          </Link>
        </div>
        <CategoryTabs activeCategory={selectedCat} onSelectCategory={handleCategorySelect} />
      </section>

      {/* Coming Soon Announcement Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-blue-950/40 border border-purple-500/20 p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-900/50 border border-purple-500/30 text-purple-400">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Coming Soon
              </span>
              <span className="text-xs text-slate-400">Pre-Order Reservations Opening</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white mt-1">
              Grand Theft Auto VI & Monster Hunter Wilds
            </h4>
            <p className="text-xs text-slate-400">
              Sign up on WhatsApp to be the first in Kurdistan to get day-one digital activation keys.
            </p>
          </div>
        </div>
        <a
          href="https://wa.me/9647500000000"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white whitespace-nowrap shadow-md shadow-purple-900/50"
        >
          Reserve on WhatsApp
        </a>
      </section>

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on top rated games and digital packages"
        viewAllLink="/products"
        badgeText="Hot Offers"
        icon={Zap}
        products={flashDeals}
        limit={4}
      />

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="The most popular items purchased by gamers in Erbil, Sulaymaniyah, and Baghdad"
        viewAllLink="/products"
        badgeText="Best Sellers"
        icon={Flame}
        products={topSalesProducts}
        limit={4}
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="Currently viral game keys, recent releases, and seasonal packs"
        viewAllLink="/products"
        badgeText="Popular Now"
        icon={TrendingUp}
        products={trendingProducts}
        limit={4}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated by Gamers"
        subtitle="Products with 4.8+ customer review scores and verified activations"
        viewAllLink="/products"
        badgeText="Verified Quality"
        icon={Star}
        products={topRatedProducts}
        limit={4}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups (UC, Diamonds & Points)"
        subtitle="Instant recharge for PUBG Mobile, Free Fire, Roblox, and Mobile Legends"
        viewAllLink="/products?category=mobile"
        badgeText="Mobile Gaming"
        icon={Smartphone}
        products={mobileProducts}
        limit={4}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Keys"
        subtitle="Steam, Riot, and Epic Games digital codes at competitive IQD pricing"
        viewAllLink="/products?platform=PC"
        badgeText="PC Master Race"
        icon={Monitor}
        products={pcProducts}
        limit={4}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Hits & Wallet"
        subtitle="PSN digital codes and PlayStation titles for PS4 & PS5"
        viewAllLink="/products?platform=PlayStation"
        badgeText="PS Store"
        icon={Tv}
        products={psProducts}
        limit={4}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox & Game Pass"
        subtitle="Xbox Series X|S games, gift cards, and Ultimate passes"
        viewAllLink="/products?platform=Xbox"
        badgeText="Xbox"
        icon={Box}
        products={xboxProducts}
        limit={4}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Digital Gift Cards"
        subtitle="Steam Wallet, iTunes, Google Play, Razer Gold, and Amazon"
        viewAllLink="/products?category=gift-cards"
        badgeText="Gift Cards"
        icon={CreditCard}
        products={giftCards}
        limit={4}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="VIP Subscriptions & Streaming"
        subtitle="Discord Nitro, YouTube Premium, Netflix 4K, Spotify, and creative tools"
        viewAllLink="/products?category=subscriptions"
        badgeText="Subscriptions"
        icon={Calendar}
        products={subscriptions}
        limit={4}
      />

    </div>
  );
}

export default Home;
