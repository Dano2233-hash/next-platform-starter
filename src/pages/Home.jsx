import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts.jsx';
import ProductSection from '../components/ProductSection.jsx';
import ProductCard from '../components/ProductCard.jsx';
import {
  Zap,
  Flame,
  Star,
  Sparkles,
  Gamepad2,
  Gift,
  Smartphone,
  CreditCard,
  Clock,
  ChevronRight,
  ShieldCheck,
  Headphones,
  Award
} from 'lucide-react';

export default function Home() {
  const { products } = useProducts();

  // Filtered product subsets
  const flashDeals = products.filter(p => p.isFlashDeal);
  const trending = products.filter(p => p.isTrending);
  const topRated = products.filter(p => p.isTopRated);
  const featured = products.filter(p => p.isFeatured);

  const xboxGames = products.filter(p => String(p.platform).toLowerCase() === 'xbox');
  const psGames = products.filter(p => String(p.platform).toLowerCase() === 'playstation');
  const pcGames = products.filter(p => String(p.platform).toLowerCase() === 'pc');
  const mobileTopups = products.filter(p => p.category === 'mobile-topups');
  const giftCards = products.filter(p => p.category === 'gift-cards');
  const subscriptions = products.filter(p => p.category === 'subscriptions');

  const categoriesList = [
    { name: 'Mobile Top-Ups', slug: 'mobile-topups', icon: Smartphone, color: 'from-cyan-500/20 to-blue-600/20 text-cyan-400 border-cyan-500/30' },
    { name: 'Paid PC & Games', slug: 'paid-games', icon: Gamepad2, color: 'from-blue-500/20 to-indigo-600/20 text-blue-400 border-blue-500/30' },
    { name: 'Gift Cards', slug: 'gift-cards', icon: Gift, color: 'from-amber-500/20 to-yellow-600/20 text-amber-400 border-amber-500/30' },
    { name: 'Subscriptions', slug: 'subscriptions', icon: CreditCard, color: 'from-purple-500/20 to-fuchsia-600/20 text-purple-400 border-purple-500/30' }
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/80 border border-slate-800/80 p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kurdistan & Iraq #1 Digital Gaming Store</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight leading-tight">
            Level Up Your Gaming with <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Instant Digital Delivery</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Get instant PUBG UC, Free Fire Diamonds, Steam Wallet, Xbox & PSN Gift Cards, paid Steam keys, and premium subscriptions with FastPay, Korek, and MasterCard.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/products"
              className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all"
            >
              <Gamepad2 className="w-5 h-5" />
              <span>Explore All Products</span>
            </Link>
            <Link
              to="/products?category=mobile-topups"
              className="px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-slate-700/80 hover:border-cyan-500/50 font-semibold text-sm rounded-xl transition-all"
            >
              Mobile Top-Ups
            </Link>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categoriesList.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                to={`/products?category=${cat.slug}`}
                className={`group p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 transition-all flex items-center gap-3.5 shadow-md hover:shadow-cyan-500/10`}
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br border ${cat.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] text-slate-400">Instant Delivery</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Coming Soon Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-950/80 via-indigo-950/80 to-slate-950 border border-purple-500/30 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Clock className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-500/30 text-purple-300 border border-purple-500/40">
                Coming Soon
              </span>
              <h3 className="text-base font-bold text-white">GTA VI Digital Pre-Orders & Regional Server Boosts</h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Next-generation gaming keys and automated VIP Kurdish gaming lobby keys arriving soon on Dano Store.
            </p>
          </div>
        </div>
        <Link
          to="/products"
          className="px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/50 text-xs font-bold rounded-xl whitespace-nowrap transition-colors shrink-0"
        >
          View Store Catalogue
        </Link>
      </section>

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Most purchased digital games and top-ups this month in Kurdistan & Iraq"
        icon={Flame}
        products={featured}
        limit={4}
        viewAllLink="/products"
      />

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on gaming top-ups, game keys, and subscriptions"
        icon={Zap}
        products={flashDeals}
        limit={4}
        viewAllLink="/products"
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="Hot trending gaming products and newly listed game activation keys"
        icon={Sparkles}
        products={trending}
        limit={4}
        viewAllLink="/products"
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated"
        subtitle="5-star rated products loved by local gamers"
        icon={Star}
        products={topRated}
        limit={4}
        viewAllLink="/products"
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Section"
        subtitle="Digital games and gift cards for Xbox Series X|S & Xbox One"
        icon={Gamepad2}
        products={xboxGames}
        limit={4}
        viewAllLink="/products?platform=xbox"
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Section"
        subtitle="PSN gift cards, PS Plus memberships, and PS4/PS5 codes"
        icon={Gamepad2}
        products={psGames}
        limit={4}
        viewAllLink="/products?platform=playstation"
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Section"
        subtitle="Steam activation keys, Valorant VP, and PC master race games"
        icon={Gamepad2}
        products={pcGames}
        limit={4}
        viewAllLink="/products?platform=pc"
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups Section"
        subtitle="PUBG UC, Free Fire Diamonds, MLBB, CODM CP, and eFootball Coins"
        icon={Smartphone}
        products={mobileTopups}
        limit={4}
        viewAllLink="/products?category=mobile-topups"
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards Section"
        subtitle="Steam Wallet, iTunes, Google Play, Razer Gold, and eShop cards"
        icon={Gift}
        products={giftCards}
        limit={4}
        viewAllLink="/products?category=gift-cards"
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Subscriptions Section"
        subtitle="Discord Nitro, YouTube Premium, Netflix 4K, Spotify, and Canva Pro"
        icon={CreditCard}
        products={subscriptions}
        limit={4}
        viewAllLink="/products?category=subscriptions"
      />
    </div>
  );
}
