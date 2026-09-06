import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';
import {
  Sparkles,
  Zap,
  Flame,
  Star,
  Gamepad2,
  Tv,
  Monitor,
  Smartphone,
  CreditCard,
  Clock,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export default function Home({ products = [], onAddToCart, onBuyNow }) {
  const navigate = useNavigate();

  // Filter sections
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const topSalesProducts = [...products].sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0)).slice(0, 4);
  const flashDealsProducts = products.filter((p) => p.isFlashDeal || (p.oldPrice && p.oldPrice > p.price)).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
  const topRatedProducts = products.filter((p) => p.isTopRated || p.rating >= 4.9).slice(0, 4);

  // Platform & Category sections
  const xboxProducts = products.filter((p) => p.platform === 'Xbox' || p.name.includes('Xbox')).slice(0, 4);
  const psProducts = products.filter((p) => p.platform === 'PlayStation' || p.name.includes('PlayStation') || p.name.includes('PSN')).slice(0, 4);
  const pcProducts = products.filter((p) => p.platform === 'PC' || p.category === 'games').slice(0, 4);
  const mobileProducts = products.filter((p) => p.category === 'mobile' || p.platform === 'Mobile').slice(0, 4);
  const giftCardProducts = products.filter((p) => p.category === 'giftcards' || p.platform === 'Gift Card').slice(0, 4);
  const subProducts = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  // Coming Soon mock items
  const comingSoon = [
    {
      id: 'cs-gta-6',
      title: 'Grand Theft Auto VI',
      platform: 'PlayStation / Xbox',
      release: 'Expected 2025',
      badge: 'Pre-Order Soon'
    },
    {
      id: 'cs-monster-hunter',
      title: 'Monster Hunter Wilds',
      platform: 'PC / PS5 / Xbox',
      release: 'Coming 2025',
      badge: 'Wishlist'
    },
    {
      id: 'cs-assassins-creed-shadows',
      title: 'Assassin\'s Creed Shadows',
      platform: 'PC / Console',
      release: 'Coming Soon',
      badge: 'Pre-Order Soon'
    }
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1326] via-[#081020] to-[#12082b] border border-slate-800/80 p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Kurdistan & Iraq #1 Digital Store</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Get Instant Codes for <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
                Games, UC, VP & Gift Cards
              </span>
            </h1>

            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Buy PC games, PUBG UC, Valorant Points, PlayStation gift cards, and premium digital subscriptions with 100% official codes and local payment options.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/products')}
                className="py-3.5 px-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-950/40 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Browse All Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/products?category=mobile')}
                className="py-3.5 px-6 bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-xs rounded-xl border border-slate-700/80 transition-colors cursor-pointer"
              >
                Mobile Top-Ups
              </button>
            </div>

            {/* Quick Badges */}
            <div className="pt-4 flex items-center gap-6 text-xs text-slate-400 border-t border-slate-800/60 font-semibold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> FastPay & Korek
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> Instant Processing
              </span>
            </div>
          </div>

          {/* Hero Featured Cards Preview */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {featuredProducts.slice(0, 2).map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY ROW */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-white tracking-tight">Explore Categories</h2>
          <Link to="/products" className="text-xs font-bold text-cyan-400 hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/products?category=games"
            className="p-5 bg-[#090e1a] border border-slate-800 hover:border-cyan-500/50 rounded-2xl flex flex-col items-center text-center gap-3 transition-all group hover:-translate-y-1"
          >
            <div className="p-3.5 rounded-xl bg-blue-950/60 text-blue-400 border border-blue-800/50 group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Paid Games</h3>
              <p className="text-[11px] text-slate-400">PC & Console Digital Keys</p>
            </div>
          </Link>

          <Link
            to="/products?category=mobile"
            className="p-5 bg-[#090e1a] border border-slate-800 hover:border-cyan-500/50 rounded-2xl flex flex-col items-center text-center gap-3 transition-all group hover:-translate-y-1"
          >
            <div className="p-3.5 rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-800/50 group-hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Mobile Top-Ups</h3>
              <p className="text-[11px] text-slate-400">PUBG UC, Free Fire, Robux</p>
            </div>
          </Link>

          <Link
            to="/products?category=giftcards"
            className="p-5 bg-[#090e1a] border border-slate-800 hover:border-cyan-500/50 rounded-2xl flex flex-col items-center text-center gap-3 transition-all group hover:-translate-y-1"
          >
            <div className="p-3.5 rounded-xl bg-purple-950/60 text-purple-400 border border-purple-800/50 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Gift Cards</h3>
              <p className="text-[11px] text-slate-400">Steam, PSN, Xbox, Apple</p>
            </div>
          </Link>

          <Link
            to="/products?category=subscriptions"
            className="p-5 bg-[#090e1a] border border-slate-800 hover:border-cyan-500/50 rounded-2xl flex flex-col items-center text-center gap-3 transition-all group hover:-translate-y-1"
          >
            <div className="p-3.5 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Subscriptions</h3>
              <p className="text-[11px] text-slate-400">Discord Nitro, YouTube, Spotify</p>
            </div>
          </Link>
        </div>
      </section>

      {/* FLASH DEALS */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on top digital titles & gift cards"
        icon={Zap}
        badge="Hot Sales"
        products={flashDealsProducts}
        linkTo="/products"
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* TOP SALES */}
      <ProductSection
        title="Top Sales"
        subtitle="Most popular items bought in Kurdistan and Iraq"
        icon={Flame}
        badge="Best Sellers"
        products={topSalesProducts}
        linkTo="/products"
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* NEW & TRENDING */}
      <ProductSection
        title="New & Trending"
        subtitle="Freshly added games and updated top-up options"
        icon={Sparkles}
        badge="Trending"
        products={trendingProducts}
        linkTo="/products"
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* COMING SOON BANNER */}
      <section className="bg-gradient-to-r from-[#0a0f1d] via-[#11182c] to-[#0d0a1d] border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-black text-white">Coming Soon to Dano Store</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {comingSoon.map((item) => (
            <div key={item.id} className="p-4 bg-[#070b15] border border-slate-800/80 rounded-xl space-y-2">
              <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase bg-purple-950 text-purple-300 border border-purple-800/60 rounded">
                {item.badge}
              </span>
              <h3 className="text-sm font-bold text-slate-100">{item.title}</h3>
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium pt-1">
                <span>{item.platform}</span>
                <span className="text-cyan-400 font-bold">{item.release}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TOP RATED */}
      <ProductSection
        title="Top Rated"
        subtitle="Highest customer ratings and verified digital deliveries"
        icon={Star}
        badge="5.0 Rated"
        products={topRatedProducts}
        linkTo="/products"
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* MOBILE TOP-UPS SECTION */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, Robux, and Valorant VP"
        icon={Smartphone}
        badge="Direct ID Refill"
        products={mobileProducts}
        linkTo="/products?category=mobile"
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* PC GAMING SECTION */}
      <ProductSection
        title="PC Gaming"
        subtitle="Steam keys and digital PC activation codes"
        icon={Monitor}
        badge="Steam CDN"
        products={pcProducts}
        linkTo="/products?platform=PC"
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* PLAYSTATION SECTION */}
      <ProductSection
        title="PlayStation Store"
        subtitle="PSN Wallet Cards, Plus Memberships, and PS5 Games"
        icon={Tv}
        badge="PSN Codes"
        products={psProducts}
        linkTo="/products?platform=PlayStation"
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* XBOX SECTION */}
      <ProductSection
        title="Xbox Store"
        subtitle="Xbox Game Pass Ultimate, Gift Cards & Digital Games"
        icon={Gamepad2}
        badge="Xbox Live"
        products={xboxProducts}
        linkTo="/products?platform=Xbox"
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* GIFT CARDS SECTION */}
      <ProductSection
        title="Gift Cards"
        subtitle="Steam, Google Play, Apple, Nintendo, and Amazon"
        icon={CreditCard}
        badge="100% Valid Codes"
        products={giftCardProducts}
        linkTo="/products?category=giftcards"
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* SUBSCRIPTIONS SECTION */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify & Canva Pro"
        icon={Sparkles}
        badge="Instant Upgrade"
        products={subProducts}
        linkTo="/products?category=subscriptions"
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />
    </div>
  );
}
