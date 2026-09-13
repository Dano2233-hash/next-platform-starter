import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductSection } from '../components/ProductSection';
import { ProductCard } from '../components/ProductCard';
import {
  Gamepad2,
  Flame,
  Zap,
  TrendingUp,
  Star,
  Clock,
  ShieldCheck,
  Tv,
  Monitor,
  Smartphone,
  Gift,
  Sparkles,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export const Home = () => {
  const { products } = useProducts();
  const navigate = useNavigate();

  // Filter products by section toggles
  const topSales = products.filter((p) => p.isFeatured).slice(0, 4);
  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const newTrending = products.filter((p) => p.isTrending).slice(0, 4);
  const topRated = products.filter((p) => p.isTopRated).slice(0, 4);

  // Platform specific sections
  const xboxGames = products.filter((p) => p.platform === 'Xbox').slice(0, 4);
  const playstationGames = products.filter((p) => p.platform === 'PlayStation').slice(0, 4);
  const pcGames = products.filter((p) => p.platform === 'PC').slice(0, 4);
  const mobileTopUps = products.filter((p) => p.category === 'mobile').slice(0, 4);
  const giftCards = products.filter((p) => p.category === 'gift-cards').slice(0, 4);
  const subscriptions = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  const comingSoonItems = [
    { title: 'GTA VI Pre-Orders', platform: 'PS5 & Xbox Series X', eta: 'Coming 2025', badge: 'Hype' },
    { title: 'Monster Hunter Wilds', platform: 'PC / PS5 / Xbox', eta: 'Q1 2025', badge: 'Pre-Order' },
    { title: 'Assassin’s Creed Shadows', platform: 'PC & Console', eta: 'Coming Soon', badge: 'Ubisoft' }
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero / Featured Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0a1224] via-[#0d162f] to-[#170a2c] border border-slate-800 p-6 md:p-12">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/20 text-cyan-400 border border-cyan-500/30 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              <span>#1 Digital Gaming Store in Kurdistan & Iraq</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Instant Top-Ups & <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400">
                Official Digital Game Keys
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              Get PUBG UC, Free Fire Diamonds, Steam Wallet, PSN Cards, and top PC/Console games instantly with local payment methods: FastPay, Korek, & MasterCard.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigate('/products')}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/25 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Explore Store</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/products?category=mobile')}
                className="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-sm transition-all flex items-center gap-2"
              >
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span>Mobile Top-Ups</span>
              </button>
            </div>
          </div>

          {/* Hero Featured Card Highlight */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-slate-950/80 backdrop-blur-md p-5 rounded-2xl border border-slate-800 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="text-cyan-400 font-bold flex items-center gap-1">
                  <Flame className="w-4 h-4 text-cyan-400" /> Featured Item
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-600/20 text-blue-300 font-mono text-[11px]">
                  Instant ID Recharge
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-2xl text-slate-950 shrink-0">
                  UC
                </div>
                <div>
                  <h3 className="text-white font-extrabold text-base">PUBG Mobile UC</h3>
                  <p className="text-xs text-slate-400">Direct ID Recharge starting from 1,500 IQD</p>
                  <span className="text-xs text-cyan-400 font-bold mt-1 inline-block">3,420+ Completed Orders</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/product/pubg-mobile-uc')}
                className="w-full py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold text-xs uppercase tracking-wider text-center transition-all"
              >
                Order PUBG UC Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid Row */}
      <section className="my-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { title: 'Xbox Store', path: '/products?platform=Xbox', icon: Gamepad2, color: 'text-emerald-400 border-emerald-500/30' },
            { title: 'PlayStation', path: '/products?platform=PlayStation', icon: Tv, color: 'text-blue-400 border-blue-500/30' },
            { title: 'PC Gaming', path: '/products?platform=PC', icon: Monitor, color: 'text-cyan-400 border-cyan-500/30' },
            { title: 'Mobile Top-Up', path: '/products?category=mobile', icon: Smartphone, color: 'text-indigo-400 border-indigo-500/30' },
            { title: 'Gift Cards', path: '/products?category=gift-cards', icon: Gift, color: 'text-purple-400 border-purple-500/30' },
            { title: 'Subscriptions', path: '/products?category=subscriptions', icon: Sparkles, color: 'text-amber-400 border-amber-500/30' },
          ].map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Link
                key={i}
                to={cat.path}
                className="p-4 rounded-2xl bg-[#090e1a] border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-900 transition-all text-center flex flex-col items-center justify-center gap-2 group"
              >
                <div className={`p-3 rounded-xl bg-slate-950 border ${cat.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
                  {cat.title}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="bg-gradient-to-r from-slate-900/80 to-indigo-950/40 border border-slate-800/80 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-extrabold text-white">Coming Soon & Pre-Orders</h3>
          </div>
          <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">Stay Tuned</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {comingSoonItems.map((item, idx) => (
            <div key={idx} className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-bold">
                  {item.badge}
                </span>
                <h4 className="text-sm font-bold text-slate-100 mt-1">{item.title}</h4>
                <p className="text-xs text-slate-500">{item.platform}</p>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400">{item.eta}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Top Sales */}
      <ProductSection
        title="Top Sales"
        subtitle="Most purchased digital games and top-ups this week"
        icon={Flame}
        badge="Hot"
        products={topSales}
        viewAllLink="/products?category=all"
      />

      {/* Flash Deals */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on gaming cards & passes"
        icon={Zap}
        badge="Sale"
        products={flashDeals}
        viewAllLink="/products?category=all"
      />

      {/* New & Trending */}
      <ProductSection
        title="New & Trending"
        subtitle="Fresh additions and trending games in Kurdistan"
        icon={TrendingUp}
        badge="Trending"
        products={newTrending}
        viewAllLink="/products?category=all"
      />

      {/* Top Rated */}
      <ProductSection
        title="Top Rated Products"
        subtitle="5-star customer rated items with instant delivery"
        icon={Star}
        badge="5.0 Rated"
        products={topRated}
        viewAllLink="/products?category=all"
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Console & PC Games"
        subtitle="Official digital keys and passes for Xbox"
        icon={Gamepad2}
        products={xboxGames}
        viewAllLink="/products?platform=Xbox"
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Network Games"
        subtitle="Top PS4 & PS5 digital games & PSN cards"
        icon={Tv}
        products={playstationGames}
        viewAllLink="/products?platform=PlayStation"
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming & Steam"
        subtitle="Steam CDN verified paid games and keys"
        icon={Monitor}
        products={pcGames}
        viewAllLink="/products?platform=PC"
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="Direct Player ID top-ups for PUBG, Free Fire, Mobile Legends..."
        icon={Smartphone}
        products={mobileTopUps}
        viewAllLink="/products?category=mobile"
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards"
        subtitle="Steam, PSN, Xbox, Google Play, Apple iTunes..."
        icon={Gift}
        products={giftCards}
        viewAllLink="/products?category=gift-cards"
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Subscriptions & Digital Services"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify..."
        icon={Sparkles}
        products={subscriptions}
        viewAllLink="/products?category=subscriptions"
      />
    </div>
  );
};
