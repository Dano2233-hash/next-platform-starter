import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import CategoryTabs from '../components/CategoryTabs';
import { Flame, Sparkles, TrendingUp, Star, ShieldCheck, Gamepad2, Smartphone, Gift, Zap, ArrowRight } from 'lucide-react';

export default function Home() {
  const { products } = useProducts();

  const flashDeals = products.filter((p) => p.isFlashDeal);
  const trending = products.filter((p) => p.isTrending);
  const topRated = products.filter((p) => p.isTopRated);
  const xboxProducts = products.filter((p) => p.platform === 'Xbox');
  const psProducts = products.filter((p) => p.platform === 'PlayStation');
  const pcProducts = products.filter((p) => p.platform === 'PC');
  const mobileProducts = products.filter((p) => p.platform === 'Mobile');
  const giftCards = products.filter((p) => p.category === 'gift-cards');
  const subscriptions = products.filter((p) => p.category === 'subscriptions');
  const comingSoon = products.filter((p) => p.isComingSoon);

  return (
    <div className="space-y-10 pb-12">

      {/* Hero Featured Banner */}
      <section className="relative overflow-hidden pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-[#0c1229] via-[#0e1738] to-[#0a0f24] border border-slate-800/80 p-6 sm:p-10 overflow-hidden shadow-2xl">

            {/* Background glowing gradients */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Code Delivery</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Kurdistan & Iraq's <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                  Ultimate Gaming Store
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Buy PUBG UC, Steam Wallet Cards, Discord Nitro, Free Fire Diamonds, and top AAA games instantly with manual local payment methods: FastPay, Korek Cash & MasterCard.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-cyan-950/50 flex items-center gap-2 transition-all"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/products?category=mobile"
                  className="py-3 px-6 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
                >
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  <span>Mobile Top-Ups</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-3 text-xs font-bold text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>100% Guaranteed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-purple-400" />
                  <span>Local Support</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Category Selection Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CategoryTabs selectedCategory="all" onSelectCategory={() => {}} />
      </section>

      {/* Coming Soon Feature */}
      {comingSoon.length > 0 && (
        <ProductSection
          title="Coming Soon 2025"
          subtitle="Pre-register & reserve upcoming blockbuster gaming releases"
          icon={Sparkles}
          products={comingSoon}
        />
      )}

      {/* Flash Deals */}
      <ProductSection
        title="Flash Deals & Discounts"
        subtitle="Limited time discounts on top game top-ups and gift cards"
        icon={Flame}
        products={flashDeals.slice(0, 4)}
        viewAllLink="/products?filter=flash"
      />

      {/* New & Trending */}
      <ProductSection
        title="New & Trending"
        subtitle="Most popular items bought by gamers in Erbil, Sulaymaniyah, & Baghdad"
        icon={TrendingUp}
        products={trending.slice(0, 4)}
        viewAllLink="/products?filter=trending"
      />

      {/* Top Rated */}
      <ProductSection
        title="Top Rated Products"
        subtitle="Highest customer rating and 100% verified digital items"
        icon={Star}
        products={topRated.slice(0, 4)}
        viewAllLink="/products?filter=top-rated"
      />

      {/* Mobile Top-Ups */}
      <ProductSection
        title="Mobile Game Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, Valorant VP, MLBB, Robux & COD Mobile CP"
        icon={Smartphone}
        products={mobileProducts.slice(0, 8)}
        viewAllLink="/products?category=mobile"
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming & Activation Keys"
        subtitle="Steam, Epic Games & Riot Games official keys"
        icon={Gamepad2}
        products={pcProducts.slice(0, 4)}
        viewAllLink="/products?platform=PC"
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Games & Game Pass"
        subtitle="Xbox Series X|S, Xbox One digital titles and cards"
        icon={Gamepad2}
        products={xboxProducts.slice(0, 4)}
        viewAllLink="/products?platform=Xbox"
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Console Gaming"
        subtitle="PS4 & PS5 digital games, PSN wallet codes and PS Plus"
        icon={Gamepad2}
        products={psProducts.slice(0, 4)}
        viewAllLink="/products?platform=PlayStation"
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Digital Gift Cards"
        subtitle="Steam, iTunes, Google Play, Xbox, PlayStation & Razer Gold"
        icon={Gift}
        products={giftCards.slice(0, 4)}
        viewAllLink="/products?category=gift-cards"
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Premium Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify, Canva Pro & Telegram Premium"
        icon={Zap}
        products={subscriptions.slice(0, 4)}
        viewAllLink="/products?category=subscriptions"
      />

    </div>
  );
}
