import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flame,
  Zap,
  TrendingUp,
  Star,
  Gamepad2,
  Smartphone,
  CreditCard,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Clock,
  Box,
  Tv,
  Monitor
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import CategoryTabs from '../components/CategoryTabs';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';
import SectionHeader from '../components/SectionHeader';

export function Home() {
  const { products } = useProducts();
  const navigate = useNavigate();

  // Filter sections by prompt requirements
  const comingSoon = products.filter((p) => p.tag === 'Coming Soon' || p.stock === 0);
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const topSales = [...products].sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0)).slice(0, 4);
  const trending = products.filter((p) => p.isTrending);
  const topRated = products.filter((p) => p.isTopRated || p.rating >= 4.9);

  // Platform & Category specific sections
  const xboxProducts = products.filter((p) => p.platform === 'Xbox' || p.category === 'xbox');
  const playStationProducts = products.filter((p) => p.platform === 'PlayStation' || p.category === 'playstation');
  const pcProducts = products.filter((p) => p.platform === 'PC' || p.category === 'pc-gaming' || p.category === 'paid-games');
  const mobileTopUps = products.filter((p) => p.category === 'mobile-top-ups' || p.platform === 'Mobile');
  const giftCards = products.filter((p) => p.category === 'gift-cards' || p.type === 'Gift Card');
  const subscriptions = products.filter((p) => p.category === 'subscriptions' || p.type === 'Subscription');

  return (
    <div className="space-y-12">
      {/* Hero / Featured Section */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-br from-[#0c1328] via-[#070b1a] to-[#120b29] p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Kurdistan & Iraq's Premier Digital Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Level Up Your Gaming With <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
              Instant Digital Delivery
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Official PUBG Mobile UC, Free Fire Diamonds, Fortnite V-Bucks, Steam Keys, PSN Cards & Discord Nitro.
            Paid instantly via <span className="text-white font-semibold">FastPay</span>, <span className="text-white font-semibold">Korek</span>, and <span className="text-white font-semibold">MasterCard</span>.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/products?category=mobile-top-ups"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-cyan-950/60 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Top-Ups</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/products?category=paid-games"
              className="px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-semibold text-sm transition-all"
            >
              Browse Games
            </Link>
          </div>

          {/* Quick trust metrics */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>100% Guaranteed Keys</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Instant Code Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-200 font-mono">IQD ONLY</span>
              <span>Local Pricing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section>
        <div className="mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Explore by Category</h3>
        </div>
        <CategoryTabs
          selectedCategory="all"
          onSelectCategory={(slug) => {
            if (slug === 'all') navigate('/products');
            else navigate(`/products?category=${slug}`);
          }}
        />
      </section>

      {/* Flash Deals Section */}
      <ProductSection
        title="⚡ Flash Deals"
        subtitle="Limited-time discounts on top gaming products & top-ups"
        icon={Zap}
        linkTo="/products"
        products={flashDeals}
        limit={4}
      />

      {/* Top Sales Section */}
      <ProductSection
        title="🔥 Top Sales"
        subtitle="Most purchased items by Iraqi & Kurdish gamers this week"
        icon={Flame}
        linkTo="/products"
        products={topSales}
        limit={4}
      />

      {/* New & Trending Section */}
      <ProductSection
        title="📈 New & Trending"
        subtitle="Hot releases, popular top-up packs, and trending gifts"
        icon={TrendingUp}
        linkTo="/products"
        products={trending}
        limit={4}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="⭐ Top Rated"
        subtitle="5-star rated products backed by verified customers"
        icon={Star}
        linkTo="/products"
        products={topRated}
        limit={4}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="📱 Mobile Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, COD Mobile CP, Mobile Legends, and more"
        icon={Smartphone}
        linkTo="/products?category=mobile-top-ups"
        products={mobileTopUps}
        limit={4}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="💻 PC Gaming & Steam Keys"
        subtitle="Official Steam keys: GTA V, Red Dead Redemption 2, Elden Ring, Rust"
        icon={Monitor}
        linkTo="/products?category=pc-gaming"
        products={pcProducts}
        limit={4}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="🎮 PlayStation Store"
        subtitle="PSN gift cards, Tekken 8, Mortal Kombat 11, and PlayStation favorites"
        icon={Tv}
        linkTo="/products?platform=PlayStation"
        products={playStationProducts}
        limit={4}
      />

      {/* Xbox Section */}
      <ProductSection
        title="🟢 Xbox Store"
        subtitle="Xbox gift cards, Forza Horizon 5, Sea of Thieves, and Game Pass"
        icon={Box}
        linkTo="/products?platform=Xbox"
        products={xboxProducts}
        limit={4}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="🎁 Gift Cards"
        subtitle="Steam, PlayStation, Xbox, Google Play, Apple, Razer Gold & Amazon"
        icon={CreditCard}
        linkTo="/products?category=gift-cards"
        products={giftCards}
        limit={4}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="✨ Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix UHD, Spotify, Canva Pro"
        icon={Sparkles}
        linkTo="/products?category=subscriptions"
        products={subscriptions}
        limit={4}
      />

      {/* Coming Soon Section */}
      {comingSoon.length > 0 && (
        <section className="my-10 sm:my-14">
          <SectionHeader
            title="⏳ Coming Soon"
            subtitle="Upcoming major titles & pre-order reservations"
            icon={Clock}
            linkTo="/products"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {comingSoon.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
