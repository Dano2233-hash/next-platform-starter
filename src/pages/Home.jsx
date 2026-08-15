import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductSection from '../components/ProductSection.jsx';
import { Gamepad2, Zap, Flame, Star, Sparkles, Clock, ArrowRight, ShieldCheck, Smartphone, Monitor, Tv, CreditCard } from 'lucide-react';

export default function Home({ products, onAddToCart, onBuyNow }) {
  const navigate = useNavigate();

  // Categories Filtered
  const featured = products.filter((p) => p.isFeatured);
  const trending = products.filter((p) => p.isTrending);
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const topRated = products.filter((p) => p.isTopRated);

  const xboxGames = products.filter((p) => p.platform === 'Xbox');
  const playstationGames = products.filter((p) => p.platform === 'PlayStation');
  const pcGames = products.filter((p) => p.platform === 'PC');
  const mobileTopups = products.filter((p) => p.category === 'mobile');
  const giftCards = products.filter((p) => p.category === 'gift-cards');
  const subscriptions = products.filter((p) => p.category === 'subscriptions');

  return (
    <div className="space-y-10 pb-12">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#090f24] via-[#0d1636] to-[#170b2e] border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 bg-blue-950/80 border border-blue-500/30 text-cyan-400 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Premium Digital Store for Kurdistan & Iraq
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Level Up Your Gaming Experience with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">Dano Store</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Instant delivery on PUBG UC, Free Fire Diamonds, Steam Wallet Cards, PlayStation Top-ups, Discord Nitro, and top PC games with local IQD payments.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/products"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all"
              >
                <span>Browse Store Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products?category=mobile"
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-sm rounded-xl border border-slate-700/80 transition-all flex items-center gap-2"
              >
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span>Mobile Top-Ups</span>
              </Link>
            </div>
          </div>

          {/* Hero Featured Cards Preview */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div
              onClick={() => navigate('/product/pubg-mobile-uc')}
              className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl hover:border-cyan-500/50 transition-all cursor-pointer group shadow-xl"
            >
              <div className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-wider mb-1">Top Up</div>
              <h3 className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">PUBG Mobile UC</h3>
              <p className="text-xs text-slate-400 mt-1">From 1,500 IQD</p>
              <div className="mt-3 text-xs font-bold text-blue-400 flex items-center gap-1">
                <span>Instant UC</span> <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => navigate('/product/gta-v')}
              className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl hover:border-purple-500/50 transition-all cursor-pointer group shadow-xl"
            >
              <div className="text-[10px] font-extrabold text-purple-400 uppercase tracking-wider mb-1">Steam Game</div>
              <h3 className="font-bold text-white text-sm group-hover:text-purple-400 transition-colors">GTA V Premium</h3>
              <p className="text-xs text-slate-400 mt-1">24,000 IQD</p>
              <div className="mt-3 text-xs font-bold text-purple-400 flex items-center gap-1">
                <span>Buy Key</span> <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => navigate('/product/steam-wallet')}
              className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl hover:border-amber-500/50 transition-all cursor-pointer group shadow-xl"
            >
              <div className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider mb-1">Gift Card</div>
              <h3 className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors">Steam Wallet</h3>
              <p className="text-xs text-slate-400 mt-1">From 16,000 IQD</p>
              <div className="mt-3 text-xs font-bold text-amber-400 flex items-center gap-1">
                <span>Get Code</span> <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => navigate('/product/discord-nitro')}
              className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl hover:border-emerald-500/50 transition-all cursor-pointer group shadow-xl"
            >
              <div className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider mb-1">Subscription</div>
              <h3 className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors">Discord Nitro</h3>
              <p className="text-xs text-slate-400 mt-1">From 6,500 IQD</p>
              <div className="mt-3 text-xs font-bold text-emerald-400 flex items-center gap-1">
                <span>Upgrade</span> <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY ROW */}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <Link
          to="/products?category=mobile"
          className="bg-[#0b1120] border border-slate-800/80 p-4 rounded-2xl flex flex-col items-center text-center hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 mb-2 group-hover:scale-110 transition-transform">
            <Smartphone className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-200">Mobile Top-Ups</span>
        </Link>

        <Link
          to="/products?category=pc"
          className="bg-[#0b1120] border border-slate-800/80 p-4 rounded-2xl flex flex-col items-center text-center hover:border-blue-500/50 hover:bg-slate-900/80 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400 mb-2 group-hover:scale-110 transition-transform">
            <Monitor className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-200">PC Games</span>
        </Link>

        <Link
          to="/products?category=playstation"
          className="bg-[#0b1120] border border-slate-800/80 p-4 rounded-2xl flex flex-col items-center text-center hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400 mb-2 group-hover:scale-110 transition-transform">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-200">PlayStation</span>
        </Link>

        <Link
          to="/products?category=xbox"
          className="bg-[#0b1120] border border-slate-800/80 p-4 rounded-2xl flex flex-col items-center text-center hover:border-green-500/50 hover:bg-slate-900/80 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-green-950 border border-green-800 flex items-center justify-center text-green-400 mb-2 group-hover:scale-110 transition-transform">
            <Tv className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-200">Xbox Games</span>
        </Link>

        <Link
          to="/products?category=gift-cards"
          className="bg-[#0b1120] border border-slate-800/80 p-4 rounded-2xl flex flex-col items-center text-center hover:border-amber-500/50 hover:bg-slate-900/80 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400 mb-2 group-hover:scale-110 transition-transform">
            <CreditCard className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-200">Gift Cards</span>
        </Link>

        <Link
          to="/products?category=subscriptions"
          className="bg-[#0b1120] border border-slate-800/80 p-4 rounded-2xl flex flex-col items-center text-center hover:border-purple-500/50 hover:bg-slate-900/80 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400 mb-2 group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-200">Subscriptions</span>
        </Link>
      </section>

      {/* COMING SOON BANNER */}
      <section className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-blue-950/40 border border-purple-800/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-900/80 border border-purple-700 flex items-center justify-center text-purple-300 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Coming Soon: GTA VI Pre-Orders & EA SPORTS FC 25 Points</h3>
            <p className="text-xs text-slate-400 mt-0.5">Stay tuned for exclusive Kurdistan early bird pre-orders.</p>
          </div>
        </div>
        <span className="bg-purple-900/80 text-purple-300 border border-purple-700 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
          Stay Tuned
        </span>
      </section>

      {/* FLASH DEALS SECTION */}
      <ProductSection
        title="⚡ Flash Deals"
        subtitle="Limited time discounts on gaming top-ups and keys"
        products={flashDeals}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        linkTo="/products"
        limit={4}
      />

      {/* NEW & TRENDING */}
      <ProductSection
        title="🔥 New & Trending"
        subtitle="Hottest releases requested by Kurdistan gamers"
        products={trending}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        linkTo="/products"
        limit={4}
      />

      {/* TOP RATED */}
      <ProductSection
        title="⭐ Top Rated Products"
        subtitle="Highest customer satisfaction digital items"
        products={topRated}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        linkTo="/products"
        limit={4}
      />

      {/* MOBILE TOP-UPS SECTION */}
      <ProductSection
        title="📱 Mobile Game Top-Ups"
        subtitle="Instant UC, Diamonds, V-Bucks, and Gems delivery"
        products={mobileTopups}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        linkTo="/products?category=mobile"
        limit={4}
      />

      {/* PC GAMING SECTION */}
      <ProductSection
        title="💻 PC Gaming Keys"
        subtitle="Official Steam & Epic Games activation codes"
        products={pcGames}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        linkTo="/products?category=pc"
        limit={4}
      />

      {/* PLAYSTATION SECTION */}
      <ProductSection
        title="🎮 PlayStation Games & Cards"
        subtitle="PSN Store wallet codes and PS5 titles"
        products={playstationGames}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        linkTo="/products?platform=PlayStation"
        limit={4}
      />

      {/* XBOX SECTION */}
      <ProductSection
        title="🟢 Xbox Games & Cards"
        subtitle="Xbox Series X/S digital keys & gift cards"
        products={xboxGames}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        linkTo="/products?platform=Xbox"
        limit={4}
      />

      {/* GIFT CARDS SECTION */}
      <ProductSection
        title="🎁 Gift Cards"
        subtitle="Steam, Google Play, iTunes, and Razer Gold cards"
        products={giftCards}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        linkTo="/products?category=gift-cards"
        limit={4}
      />

      {/* SUBSCRIPTIONS SECTION */}
      <ProductSection
        title="⚡ Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify & Canva"
        products={subscriptions}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        linkTo="/products?category=subscriptions"
        limit={4}
      />
    </div>
  );
}
