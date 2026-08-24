import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductSection from '../components/ProductSection';
import { Sparkles, Flame, Zap, Award, Monitor, Gamepad2, Smartphone, Gift, CreditCard, Clock, ChevronRight } from 'lucide-react';

export default function Home({ products = [], onAddToCart, onBuyNow }) {
  const navigate = useNavigate();

  // Filter products by section flag / categories
  const topSales = products.filter((p) => p.isFeatured || p.soldCount > 2500).slice(0, 4);
  const flashDeals = products.filter((p) => p.isFlashDeal || (p.oldPrice && p.oldPrice > p.price)).slice(0, 4);
  const newTrending = products.filter((p) => p.isTrending).slice(0, 4);
  const topRated = products.filter((p) => p.isTopRated || p.rating >= 4.8).slice(0, 4);

  const xboxGames = products.filter((p) => p.platform === 'Xbox').slice(0, 4);
  const psGames = products.filter((p) => p.platform === 'PlayStation').slice(0, 4);
  const pcGames = products.filter((p) => p.platform === 'PC' && p.type === 'Game').slice(0, 4);
  const mobileTopUps = products.filter((p) => p.category === 'mobile').slice(0, 4);
  const giftCards = products.filter((p) => p.category === 'gift-cards').slice(0, 4);
  const subscriptions = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  return (
    <div className="space-y-12 pb-16">

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 border border-slate-800 p-8 sm:p-12 my-6 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Store for Kurdistan & Iraq</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Level Up Your Gaming Experience with{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Dano Store
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Instant game top-ups, official PC/console game keys, gift cards, and premium digital subscriptions delivered in minutes.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/products"
              className="px-6 py-3 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/20 transition active:scale-95 flex items-center gap-2"
            >
              <span>Explore All Products</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <Link
              to="/products?category=mobile"
              className="px-6 py-3 rounded-xl font-bold text-sm text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition"
            >
              Mobile Top-Ups
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Category Row */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Mobile Top-Ups', icon: Smartphone, link: '/products?category=mobile', color: 'text-cyan-400 bg-cyan-500/10' },
          { label: 'PC Games', icon: Monitor, link: '/products?platform=PC', color: 'text-blue-400 bg-blue-500/10' },
          { label: 'PlayStation', icon: Gamepad2, link: '/products?platform=PlayStation', color: 'text-purple-400 bg-purple-500/10' },
          { label: 'Xbox Store', icon: Gamepad2, link: '/products?platform=Xbox', color: 'text-green-400 bg-green-500/10' },
          { label: 'Gift Cards', icon: Gift, link: '/products?category=gift-cards', color: 'text-amber-400 bg-amber-500/10' },
          { label: 'Subscriptions', icon: CreditCard, link: '/products?category=subscriptions', color: 'text-rose-400 bg-rose-500/10' },
        ].map((item, idx) => (
          <Link
            key={idx}
            to={item.link}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition text-center group"
          >
            <div className={`p-3 rounded-xl ${item.color} mb-2 transition-transform group-hover:scale-110`}>
              <item.icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
              {item.label}
            </span>
          </Link>
        ))}
      </section>

      {/* Coming Soon Teaser Banner */}
      <section className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/80 via-indigo-950 to-slate-900 border border-purple-500/30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Coming Soon: Steam Deck & Hardware Vouchers</h4>
            <p className="text-xs text-slate-400">Pre-order perks and custom gaming vouchers releasing soon on Dano Store!</p>
          </div>
        </div>
        <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-purple-900/60 text-purple-300 text-xs font-bold border border-purple-500/40 shrink-0">
          Stay Tuned
        </span>
      </section>

      {/* Product Sections */}
      <ProductSection
        title="Top Sales"
        subtitle="Most purchased games & top-ups this month"
        icon={Flame}
        viewAllLink="/products"
        products={topSales}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on top gaming licenses"
        icon={Zap}
        viewAllLink="/products"
        products={flashDeals}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      <ProductSection
        title="New & Trending"
        subtitle="Fresh additions & trending titles"
        icon={Sparkles}
        viewAllLink="/products"
        products={newTrending}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      <ProductSection
        title="Top Rated"
        subtitle="Highly rated products by our community"
        icon={Award}
        viewAllLink="/products"
        products={topRated}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* Category Sections */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, Fortnite V-Bucks & more"
        icon={Smartphone}
        viewAllLink="/products?category=mobile"
        products={mobileTopUps}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      <ProductSection
        title="PC Gaming Store"
        subtitle="Official Steam keys & digital activation codes"
        icon={Monitor}
        viewAllLink="/products?platform=PC"
        products={pcGames}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      <ProductSection
        title="PlayStation Digital Store"
        subtitle="PSN gift cards & PlayStation games"
        icon={Gamepad2}
        viewAllLink="/products?platform=PlayStation"
        products={psGames}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      <ProductSection
        title="Xbox Digital Store"
        subtitle="Xbox gift cards & Game Pass compatible titles"
        icon={Gamepad2}
        viewAllLink="/products?platform=Xbox"
        products={xboxGames}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      <ProductSection
        title="Gift Cards"
        subtitle="Steam, Google Play, Apple, Razer Gold & more"
        icon={Gift}
        viewAllLink="/products?category=gift-cards"
        products={giftCards}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix & Spotify"
        icon={CreditCard}
        viewAllLink="/products?category=subscriptions"
        products={subscriptions}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

    </div>
  );
}
