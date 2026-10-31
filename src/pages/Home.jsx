import React from 'react';
import { Link } from 'react-router-dom';
import {
  Gamepad2,
  Sparkles,
  Flame,
  Clock,
  Star,
  Monitor,
  Smartphone,
  Tv,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Zap
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import CategoryTabs from '../components/CategoryTabs';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { products } = useProducts();

  // Categorized & Section-Specific lists
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const trending = products.filter((p) => p.isTrending);
  const topRated = products.filter((p) => p.isTopRated);
  const topSales = [...products].sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0)).slice(0, 4);

  const pcGames = products.filter((p) => p.platform === 'PC');
  const xboxGames = products.filter((p) => p.platform === 'Xbox');
  const playstationGames = products.filter((p) => p.platform === 'PlayStation');
  const mobileTopUps = products.filter((p) => p.category === 'Mobile Top-Up' || p.platform === 'Mobile');
  const giftCards = products.filter((p) => p.category === 'Gift Cards' || p.platform === 'Gift Card');
  const subscriptions = products.filter((p) => p.category === 'Subscriptions' || p.platform === 'Subscription');

  // Featured hero game
  const heroProduct = products.find((p) => p.id === 'game-black-myth-wukong') || products[0];

  return (
    <div className="space-y-6 pb-16">
      {/* Hero / Featured Showcase */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#070d1e] via-[#09142e] to-[#0d0722] border border-cyan-900/40 p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              Kurdistan & Iraq #1 Gaming Store
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-['Rajdhani',sans-serif]">
              INSTANT DIGITAL KEYS, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
                TOP-UPS & GIFT CARDS
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              Official digital delivery for PUBG UC, Free Fire Diamonds, Steam PC keys, Xbox Game Pass, PlayStation vouchers, and premium subscriptions with local manual payment via FastPay, Korek, and MasterCard.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/products"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-950/60 transition-all active:scale-95"
              >
                <span>Browse Store</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products?category=Mobile+Top-Up"
                className="px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm transition-all"
              >
                Mobile Top-Ups
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Genuine Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Manual Fast Delivery</span>
              </div>
            </div>
          </div>

          {/* Hero spotlight card */}
          {heroProduct && (
            <div className="lg:col-span-5">
              <div className="relative max-w-md mx-auto">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 opacity-30 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative">
                  <div className="text-xs uppercase font-bold text-cyan-400 mb-2 flex items-center justify-between">
                    <span>Spotlight Release</span>
                    <span className="text-emerald-400">Available Now</span>
                  </div>
                  <ProductCard product={heroProduct} />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Category Row */}
      <section>
        <CategoryTabs />
      </section>

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Time-limited discounts on top rated games and digital passes"
        icon={Zap}
        viewAllHref="/products?filter=flash"
        products={flashDeals}
        badge="Hot Deals"
        limit={4}
      />

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="The most popular items purchased by Iraqi gamers this week"
        icon={Flame}
        viewAllHref="/products?sort=sales"
        products={topSales}
        badge="Best Sellers"
        limit={4}
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="Trending digital services, battle passes, and new releases"
        icon={TrendingUp}
        viewAllHref="/products?filter=trending"
        products={trending}
        badge="Trending Now"
        limit={4}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated"
        subtitle="Highest rated products with 100% genuine customer reviews"
        icon={Star}
        viewAllHref="/products?filter=topRated"
        products={topRated}
        badge="Community Choice"
        limit={4}
      />

      {/* Mobile Top-Ups Section (Free to play games only top-ups rule) */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="Official UC, Diamonds, Robux, and CP for iOS & Android"
        icon={Smartphone}
        viewAllHref="/products?category=Mobile+Top-Up"
        products={mobileTopUps}
        badge="Instant Top-Up"
        limit={4}
      />

      {/* PC Gaming Section (Steam CDN Paid Games) */}
      <ProductSection
        title="PC Gaming & Steam Keys"
        subtitle="Authentic paid PC Steam & Epic game activation codes"
        icon={Monitor}
        viewAllHref="/products?platform=PC"
        products={pcGames}
        badge="PC Master Race"
        limit={4}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Essentials"
        subtitle="PSN gift cards, PS4/PS5 games, and PlayStation Plus vouchers"
        icon={Tv}
        viewAllHref="/products?platform=PlayStation"
        products={playstationGames}
        badge="PlayStation"
        limit={4}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox & Game Pass"
        subtitle="Game Pass Ultimate, Xbox digital codes and console titles"
        icon={Gamepad2}
        viewAllHref="/products?platform=Xbox"
        products={xboxGames}
        badge="Xbox"
        limit={4}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards"
        subtitle="Steam Wallet, Apple iTunes, Google Play, Razer Gold & more"
        icon={CreditCard}
        viewAllHref="/products?category=Gift+Cards"
        products={giftCards}
        badge="Prepaid Vouchers"
        limit={4}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify & Telegram"
        icon={Sparkles}
        viewAllHref="/products?category=Subscriptions"
        products={subscriptions}
        badge="Subscriptions"
        limit={4}
      />

      {/* Coming Soon Teaser Bar */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-purple-950/30 to-slate-900 border border-slate-800 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-800/50 flex items-center justify-center text-purple-400 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-['Rajdhani',sans-serif]">
              Coming Soon to Dano Store
            </h3>
            <p className="text-xs text-slate-400">
              Upcoming AAA PC launches, new battle pass seasons, and expanded digital services.
            </p>
          </div>
        </div>

        <Link
          to="/products"
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors shrink-0"
        >
          Check Pre-Orders
        </Link>
      </section>
    </div>
  );
}
