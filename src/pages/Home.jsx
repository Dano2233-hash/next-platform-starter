import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Zap,
  TrendingUp,
  Star,
  Gamepad2,
  Tv,
  Monitor,
  Smartphone,
  CreditCard,
  Clock,
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import CategoryTabs from '../components/CategoryTabs';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { products } = useProducts();

  // Filter sections
  const featured = products.filter(p => p.isFeatured && !p.isComingSoon).slice(0, 4);
  const comingSoon = products.filter(p => p.isComingSoon || p.tag === 'Coming Soon');
  const topSales = products.filter(p => p.tag === 'Top Sales' || p.soldCount > 1000).slice(0, 4);
  const flashDeals = products.filter(p => p.isFlashDeal || p.tag === 'Flash Deals').slice(0, 4);
  const trending = products.filter(p => p.isTrending || p.tag === 'New & Trending').slice(0, 4);
  const topRated = products.filter(p => p.isTopRated || p.rating >= 4.9).slice(0, 4);

  // Platform & Category specific sections
  const xboxSection = products.filter(p => p.category === 'xbox' || p.platform === 'Xbox').slice(0, 4);
  const psSection = products.filter(p => p.category === 'playstation' || p.platform === 'PlayStation').slice(0, 4);
  const pcSection = products.filter(p => p.category === 'pc-games' || p.platform === 'PC').slice(0, 4);
  const mobileSection = products.filter(p => p.category === 'mobile' || p.platform === 'Mobile').slice(0, 4);
  const giftCardsSection = products.filter(p => p.category === 'gift-cards' || p.platform === 'Gift Card').slice(0, 4);
  const subsSection = products.filter(p => p.category === 'subscriptions' || p.type === 'Subscription').slice(0, 4);

  return (
    <div className="space-y-12 pb-16">

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1226] via-[#080d1e] to-[#120a28] border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Kurdistan &amp; Iraq's Top Gaming Store</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight leading-tight">
              Instant Games, UC &amp; Gift Cards in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Seconds.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Buy PC Steam Games, PUBG UC, Free Fire Diamonds, Valorant Points, PlayStation/Xbox cards, and subscriptions with local FastPay, Korek Mobile, and MasterCard transfers.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/products"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center gap-2"
              >
                <span>Explore Catalog</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <Link
                to="/products?category=mobile"
                className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 font-bold text-sm transition-all"
              >
                Mobile Top-Ups
              </Link>
            </div>
          </div>

          {/* Hero Featured Cards Preview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featured.slice(0, 2).map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Selection Row */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            Explore Categories
          </h3>
          <Link to="/products" className="text-xs text-cyan-400 font-bold hover:underline">
            All Products
          </Link>
        </div>
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

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Special limited-time discounted game codes & top-ups"
        icon={Zap}
        badgeText="Hot Offers"
        viewAllLink="/products"
        products={flashDeals}
      />

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Most popular items bought by gamers in Kurdistan & Iraq"
        icon={Flame}
        badgeText="Best Sellers"
        viewAllLink="/products"
        products={topSales}
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="Freshly added titles, battle passes, and viral gift cards"
        icon={TrendingUp}
        badgeText="Trending"
        viewAllLink="/products"
        products={trending}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated Games & Services"
        subtitle="Highest customer satisfaction ratings"
        icon={Star}
        badgeText="5.0 Rated"
        viewAllLink="/products"
        products={topRated}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming"
        subtitle="Steam Keys, Elden Ring, GTA V, Wukong, and Valorant VP"
        icon={Monitor}
        viewAllLink="/products?category=pc-games"
        products={pcSection}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Game Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, COD CP, and FC Mobile Points"
        icon={Smartphone}
        viewAllLink="/products?category=mobile"
        products={mobileSection}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Console & Top-Ups"
        subtitle="Xbox Games, Game Pass, and Digital Gift Cards"
        icon={Gamepad2}
        viewAllLink="/products?category=xbox"
        products={xboxSection}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Network"
        subtitle="PS4/PS5 Games and US/Global PSN Gift Cards"
        icon={Tv}
        viewAllLink="/products?category=playstation"
        products={psSection}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Digital Gift Cards"
        subtitle="Steam Wallet, PlayStation, Apple, Google Play, Razer Gold"
        icon={CreditCard}
        viewAllLink="/products?category=gift-cards"
        products={giftCardsSection}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Premium Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, CapCut Pro"
        icon={Zap}
        viewAllLink="/products?category=subscriptions"
        products={subsSection}
      />

      {/* Coming Soon Section */}
      {comingSoon.length > 0 && (
        <section className="my-10 p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-slate-100">Coming Soon Titles</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {comingSoon.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
