import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductSection } from '../components/ProductSection';
import { CategoryTabs } from '../components/CategoryTabs';
import { SearchBar } from '../components/SearchBar';
import { Zap, Flame, Star, Sparkles, Clock, Gamepad2, Tv, Monitor, Smartphone, Gift, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Home() {
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Filtered sections
  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const topSales = products.filter((p) => p.soldCount > 2000).slice(0, 4);
  const trending = products.filter((p) => p.isTrending).slice(0, 4);
  const topRated = products.filter((p) => p.isTopRated).slice(0, 4);

  const xboxGames = products.filter((p) => p.platform === 'Xbox' || p.category === 'xbox').slice(0, 4);
  const psGames = products.filter((p) => p.platform === 'PlayStation' || p.category === 'playstation').slice(0, 4);
  const pcGames = products.filter((p) => p.platform === 'PC' || p.category === 'pc').slice(0, 4);
  const mobileTopups = products.filter((p) => p.platform === 'Mobile' || p.category === 'mobile').slice(0, 4);
  const giftCards = products.filter((p) => p.platform === 'Gift Card' || p.category === 'giftcards').slice(0, 4);
  const subscriptions = products.filter((p) => p.type === 'Subscription' || p.category === 'subscriptions').slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">

      {/* HERO / FEATURED SECTION */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0c142b] via-[#091024] to-[#050814] border border-slate-800/80 p-8 sm:p-12 shadow-2xl">
        {/* Glow accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Iraq & Kurdistan #1 Digital Gaming Store</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Level Up Your Game with <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Instant Digital Delivery</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Instant PUBG UC, Free Fire Diamonds, Steam Wallet, PlayStation, Xbox, Discord Nitro & top PC games. Local payment via FastPay, Korek & MasterCard.
          </p>

          {/* Quick Hero Search */}
          <form onSubmit={handleSearch} className="max-w-md pt-2">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search PUBG UC, Steam, GTA V, Nitro..."
            />
          </form>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300 pt-2">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>100% Verified Keys</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Instant Automated Process</span>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY ROW TABS */}
      <div>
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3">Browse By Category</h3>
        <CategoryTabs
          selectedCategory="all"
          onSelectCategory={(catId) => navigate(`/products?category=${catId}`)}
        />
      </div>

      {/* FLASH DEALS */}
      {flashDeals.length > 0 && (
        <ProductSection
          title="Flash Deals"
          subtitle="Limited time discounts on top gaming cards and keys"
          products={flashDeals}
          viewAllLink="/products"
          icon={Zap}
        />
      )}

      {/* TOP SALES */}
      {topSales.length > 0 && (
        <ProductSection
          title="Top Sales"
          subtitle="Most popular items bought by gamers across Erbil, Suleimani, Duhok & Baghdad"
          products={topSales}
          viewAllLink="/products"
          icon={Flame}
        />
      )}

      {/* NEW & TRENDING */}
      {trending.length > 0 && (
        <ProductSection
          title="New & Trending"
          subtitle="Latest games, battle passes, and viral titles"
          products={trending}
          viewAllLink="/products"
          icon={Sparkles}
        />
      )}

      {/* TOP RATED */}
      {topRated.length > 0 && (
        <ProductSection
          title="Top Rated"
          subtitle="Highest rated digital services and original games"
          products={topRated}
          viewAllLink="/products"
          icon={Star}
        />
      )}

      {/* COMING SOON BANNER */}
      <div className="bg-gradient-to-r from-purple-950/40 via-blue-950/50 to-slate-900 border border-purple-500/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-400">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <span className="bg-purple-500/20 text-purple-300 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
              Upcoming Releases
            </span>
            <h3 className="text-xl font-extrabold text-white mt-1">Coming Soon to Dano Store</h3>
            <p className="text-xs text-slate-400">Pre-order upcoming AAA blockbusters and seasonal game expansions with local warranty.</p>
          </div>
        </div>
        <Link
          to="/products"
          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition-all shrink-0 flex items-center gap-2"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* MOBILE TOP-UPS SECTION */}
      {mobileTopups.length > 0 && (
        <ProductSection
          title="Mobile Top-Ups"
          subtitle="PUBG UC, Free Fire Diamonds, COD Mobile CP, Robux & MLBB"
          products={mobileTopups}
          viewAllLink="/products?category=mobile"
          icon={Smartphone}
        />
      )}

      {/* PC GAMING SECTION */}
      {pcGames.length > 0 && (
        <ProductSection
          title="PC Gaming"
          subtitle="Steam keys, Valorant VP, GTA V, Red Dead 2 & Elden Ring"
          products={pcGames}
          viewAllLink="/products?category=pc"
          icon={Monitor}
        />
      )}

      {/* XBOX SECTION */}
      {xboxGames.length > 0 && (
        <ProductSection
          title="Xbox Games & Game Pass"
          subtitle="Xbox digital codes, Game Pass Ultimate & console keys"
          products={xboxGames}
          viewAllLink="/products?platform=Xbox"
          icon={Gamepad2}
        />
      )}

      {/* PLAYSTATION SECTION */}
      {psGames.length > 0 && (
        <ProductSection
          title="PlayStation Section"
          subtitle="PSN Gift Cards, PlayStation Plus Essential/Extra & PS5 games"
          products={psGames}
          viewAllLink="/products?platform=PlayStation"
          icon={Tv}
        />
      )}

      {/* GIFT CARDS SECTION */}
      {giftCards.length > 0 && (
        <ProductSection
          title="Gift Cards"
          subtitle="Steam, PlayStation, Xbox, Google Play, Apple, Razer Gold & Amazon"
          products={giftCards}
          viewAllLink="/products?category=giftcards"
          icon={Gift}
        />
      )}

      {/* SUBSCRIPTIONS SECTION */}
      {subscriptions.length > 0 && (
        <ProductSection
          title="Digital Subscriptions"
          subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify, Canva Pro & Telegram Premium"
          products={subscriptions}
          viewAllLink="/products?category=subscriptions"
          icon={Sparkles}
        />
      )}

    </div>
  );
}
