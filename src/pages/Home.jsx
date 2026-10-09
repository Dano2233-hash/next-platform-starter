import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, Sparkles, Zap, ShieldCheck, Trophy, Gamepad2, Monitor, Smartphone, CreditCard, Clock, ArrowRight, Star } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import ProductSection from '../components/ProductSection';
import CategoryTabs from '../components/CategoryTabs';

export default function Home() {
  const { products } = useProducts();
  const navigate = useNavigate();

  // Filter sections
  const topSales = products.filter((p) => p.tag === 'Top Sales' || p.isFeatured).slice(0, 4);
  const flashDeals = products.filter((p) => p.isFlashDeal || (p.oldPrice && p.oldPrice > p.price)).slice(0, 4);
  const trending = products.filter((p) => p.isTrending || p.tag === 'Trending').slice(0, 4);
  const topRated = products.filter((p) => p.isTopRated || p.rating >= 4.9).slice(0, 4);

  const xboxGames = products.filter((p) => p.platform === 'Xbox').slice(0, 4);
  const playstationGames = products.filter((p) => p.platform === 'PlayStation').slice(0, 4);
  const pcGames = products.filter((p) => p.category === 'pc-games' || p.platform === 'PC').slice(0, 4);
  const mobileTopups = products.filter((p) => p.category === 'mobile-topups' || p.platform === 'Mobile').slice(0, 4);
  const giftCards = products.filter((p) => p.category === 'gift-cards').slice(0, 4);
  const subscriptions = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  const comingSoonItems = [
    { title: 'GTA VI Pre-Orders', platform: 'Console / PC', status: 'Expected 2025', badge: 'HYPE' },
    { title: 'Monster Hunter Wilds', platform: 'PC / PS5 / Xbox', status: 'Coming Soon', badge: 'Pre-Order' },
    { title: 'Valorant Mobile Top-Up', platform: 'Mobile', status: 'Beta Coming Soon', badge: 'Upcoming' }
  ];

  return (
    <div className="min-h-screen flex flex-col space-y-12">
      {/* Hero / Featured Banner */}
      <section className="relative overflow-hidden pt-6">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-[#0a122e] via-[#0d163a] to-[#160b33] border border-cyan-500/20 shadow-2xl">
            {/* Ambient Background Lights */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>KURDISTAN & IRAQ DIGITAL GAMING STORE</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight leading-tight">
                Instant Top-Ups & <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Digital Gaming</span> Services
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                PUBG UC, Free Fire Diamonds, Steam Wallet, Paid PC Games, and Discord Nitro with manual FastPay, Korek, and MasterCard payment methods.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/products?category=mobile-topups"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-slate-950 font-black text-sm shadow-xl shadow-cyan-950/50 flex items-center gap-2 transition"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>Top-Up Games Now</span>
                </Link>

                <Link
                  to="/products"
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm flex items-center gap-2 transition"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-slate-400 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>100% Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Instant Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Local Payments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <CategoryTabs
          activeCategory="all"
          onSelectCategory={(catId) => navigate(catId === 'all' ? '/products' : `/products?category=${catId}`)}
        />
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 w-full">
        {/* Flash Deals */}
        <ProductSection
          title="Flash Deals"
          subtitle="Special limited-time discounted packages & keys"
          linkTo="/products?sort=discount"
          icon={Flame}
          products={flashDeals}
          limit={4}
        />

        {/* Top Sales */}
        <ProductSection
          title="Top Sales"
          subtitle="Most popular items bought by gamers in Kurdistan"
          linkTo="/products"
          icon={Trophy}
          products={topSales}
          limit={4}
        />

        {/* Coming Soon */}
        <section className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-extrabold text-slate-100">Coming Soon Releases</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {comingSoonItems.map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{item.title}</h4>
                  <p className="text-xs text-slate-400">{item.platform} • {item.status}</p>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-black rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {item.badge}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* New & Trending */}
        <ProductSection
          title="New & Trending"
          subtitle="Fresh titles and top trending game digital recharges"
          linkTo="/products"
          icon={Sparkles}
          products={trending}
          limit={4}
        />

        {/* Top Rated */}
        <ProductSection
          title="Top Rated"
          subtitle="5-star customer rated items and memberships"
          linkTo="/products"
          icon={Star}
          products={topRated}
          limit={4}
        />

        {/* Mobile Top-Ups Section */}
        <ProductSection
          title="Mobile Top-Ups"
          subtitle="PUBG UC, Free Fire Diamonds, MLBB, COD Mobile CP"
          linkTo="/products?category=mobile-topups"
          icon={Smartphone}
          products={mobileTopups}
          limit={4}
        />

        {/* PC Gaming Section */}
        <ProductSection
          title="PC Gaming"
          subtitle="Normally paid full PC games with official Steam keys"
          linkTo="/products?category=pc-games"
          icon={Monitor}
          products={pcGames}
          limit={4}
        />

        {/* Gift Cards Section */}
        <ProductSection
          title="Gift Cards"
          subtitle="Steam Wallet, PlayStation, Xbox, Apple & Google Play cards"
          linkTo="/products?category=gift-cards"
          icon={CreditCard}
          products={giftCards}
          limit={4}
        />

        {/* Subscriptions Section */}
        <ProductSection
          title="Digital Subscriptions"
          subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify & Canva"
          linkTo="/products?category=subscriptions"
          icon={Zap}
          products={subscriptions}
          limit={4}
        />

        {/* Xbox & PlayStation Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ProductSection
              title="Xbox Store"
              subtitle="Xbox Game Pass & Xbox Digital Codes"
              linkTo="/products?platform=Xbox"
              icon={Gamepad2}
              products={xboxGames}
              limit={2}
            />
          </div>
          <div>
            <ProductSection
              title="PlayStation Store"
              subtitle="PSN Gift Cards & PS Plus"
              linkTo="/products?platform=PlayStation"
              icon={Gamepad2}
              products={playstationGames}
              limit={2}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
