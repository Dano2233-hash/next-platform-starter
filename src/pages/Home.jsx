import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowRight, Zap, ShieldCheck, Award } from 'lucide-react';
import ProductSection from '../components/ProductSection';

export default function Home({ products, onAddToCart }) {
  // Sort and filter products for specific sections
  const featured = products.filter((p) => p.isFeatured).slice(0, 4);
  const trending = products.filter((p) => p.isTrending).slice(0, 4);
  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const topRated = products.filter((p) => p.isTopRated).slice(0, 4);

  const xboxGames = products.filter((p) => p.category === 'xbox').slice(0, 4);
  const playstationGames = products.filter((p) => p.category === 'playstation').slice(0, 4);
  const pcGames = products.filter((p) => p.category === 'pc').slice(0, 4);
  const mobileTopUps = products.filter((p) => p.category === 'mobile').slice(0, 4);
  const giftCards = products.filter((p) => p.category === 'giftcards').slice(0, 4);
  const subscriptions = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  // Coming Soon Dummy Products
  const comingSoon = [
    { id: 'cs-1', name: 'GTA VI', platform: 'PS5 / Xbox', category: 'others', type: 'Game', image: '', release: 'Fall 2025' },
    { id: 'cs-2', name: 'Monster Hunter Wilds', platform: 'PC / PS5', category: 'pc', type: 'Game', image: '', release: 'Feb 2025' },
    { id: 'cs-3', name: 'Civilization VII', platform: 'PC', category: 'pc', type: 'Game', image: '', release: 'Feb 2025' }
  ];

  return (
    <div className="space-y-12">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-black py-2 px-4 text-center font-black tracking-widest text-[10px] uppercase">
        ⚡ FREE INSTANT DELIVERY & 24/7 WHATSAPP VALIDATION FOR ALL KURDISTAN & IRAQ GAMERS! ⚡
      </div>

      {/* Hero / Featured Banner Section */}
      <section className="relative overflow-hidden rounded-2xl bg-[#09090c] border border-white/5 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 max-w-7xl mx-auto">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,255,0.1),transparent_50%)] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-xl space-y-6 z-10">
          <div className="inline-flex items-center gap-2 bg-[#0066ff]/10 border border-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            <Zap className="h-3.5 w-3.5 fill-cyan-400" />
            Voted #1 Game Shop in Iraq
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-none">
            LEVEL UP YOUR <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              DIGITAL EXPERIENCE
            </span>
          </h1>

          <p className="text-xs text-white/60 leading-relaxed max-w-md">
            Instant delivery of PUBG UC, Steam cards, premium subscription codes, and the latest release console games. Manual local payment validation with Kurdistan's most secure servers.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/products"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase tracking-widest rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/10 active:scale-95"
            >
              Browse Games
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/products?category=mobile"
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-lg border border-white/5 hover:border-white/10 transition-all"
            >
              Mobile Top-Ups
            </Link>
          </div>
        </div>

        {/* Hero Visual side representation */}
        <div className="relative w-full max-w-sm aspect-video md:aspect-square bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10 rounded-xl flex flex-col justify-between p-6 overflow-hidden shadow-2xl z-10 group">
          <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent pointer-events-none" />
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black uppercase bg-black/40 px-2.5 py-1 rounded text-cyan-400 border border-cyan-500/20">HOT RELEASE</span>
            <span className="text-xs font-bold text-white/40">DS-2025</span>
          </div>

          <div className="my-auto space-y-2 text-center md:text-left">
            <Gamepad2 className="h-12 w-12 text-cyan-400 mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-lg font-black text-white">RED DEAD REDEMPTION 2</h3>
            <p className="text-[11px] text-white/50">PC Steam Key Global - Masterpiece Open World Game.</p>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <div>
              <span className="text-[9px] text-white/40 block">IQD PROMO PRICE</span>
              <span className="text-sm font-black text-cyan-400">39,000 IQD</span>
            </div>
            <Link
              to="/products/rdr2"
              className="px-4 py-2 bg-white/10 hover:bg-cyan-500 hover:text-black font-bold text-[11px] uppercase tracking-wider rounded transition-all"
            >
              Get Key
            </Link>
          </div>
        </div>
      </section>

      {/* Grid of Store Strengths */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-7xl mx-auto">
        <div className="p-4 bg-[#0d0d11]/40 border border-white/5 rounded-xl flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-lg">
            <Zap className="h-5 w-5 fill-cyan-400/20" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Instant Digital Codes</h4>
            <p className="text-[10px] text-white/50">Your keys and top-ups deliver in seconds</p>
          </div>
        </div>
        <div className="p-4 bg-[#0d0d11]/40 border border-white/5 rounded-xl flex items-center gap-3">
          <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-lg">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">100% Legal & Secured</h4>
            <p className="text-[10px] text-white/50">We purchase directly from official distributors</p>
          </div>
        </div>
        <div className="p-4 bg-[#0d0d11]/40 border border-white/5 rounded-xl flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-lg">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Localized Support</h4>
            <p className="text-[10px] text-white/50">Fast validation via FastPay, Korek & Zain</p>
          </div>
        </div>
      </div>

      {/* Category Row */}
      <div className="max-w-7xl mx-auto">
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Quick Navigation</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { name: 'All Products', path: '/products', color: 'from-cyan-900/40 to-cyan-950/40' },
            { name: 'Xbox Store', path: '/products?category=xbox', color: 'from-green-900/40 to-green-950/40' },
            { name: 'PlayStation', path: '/products?category=playstation', color: 'from-blue-900/40 to-blue-950/40' },
            { name: 'PC Keys', path: '/products?category=pc', color: 'from-purple-900/40 to-purple-950/40' },
            { name: 'Mobile Top-Up', path: '/products?category=mobile', color: 'from-teal-900/40 to-teal-950/40' },
            { name: 'Gift Cards', path: '/products?category=giftcards', color: 'from-pink-900/40 to-pink-950/40' },
            { name: 'Subscriptions', path: '/products?category=subscriptions', color: 'from-indigo-900/40 to-indigo-950/40' },
            { name: 'Others', path: '/products?category=others', color: 'from-gray-900/40 to-gray-950/40' },
          ].map((cat, i) => (
            <Link
              key={i}
              to={cat.path}
              className={`p-4 rounded-lg bg-gradient-to-br ${cat.color} border border-white/5 text-center hover:border-white/20 transition-all duration-200 flex flex-col items-center justify-center`}
            >
              <span className="text-[11px] font-black uppercase text-white tracking-wider block">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* MAIN PRODUCTS SECTIONS */}
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Flash Deals Section */}
        <ProductSection
          title="Flash Deals"
          subtitle="Time-limited premium gaming promotions"
          products={flashDeals}
          onAddToCart={onAddToCart}
          viewAllPath="/products"
        />

        {/* Featured Products */}
        <ProductSection
          title="Top Sales"
          subtitle="Most purchased digital licenses this week"
          products={featured}
          onAddToCart={onAddToCart}
          viewAllPath="/products"
        />

        {/* Coming Soon Section */}
        <section className="py-8 border-y border-white/5">
          <div className="flex items-end justify-between mb-6">
            <div className="space-y-1">
              <h2 className="text-lg font-black tracking-wider uppercase text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-purple-500 rounded-full inline-block" />
                Coming Soon
              </h2>
              <p className="text-xs text-white/50">Anticipated games releasing soon</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {comingSoon.map((game) => (
              <div key={game.id} className="bg-[#0c0c10] border border-white/5 p-5 rounded-lg flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/20 uppercase tracking-widest">{game.platform}</span>
                  <h4 className="text-sm font-bold text-white mt-2 mb-1">{game.name}</h4>
                  <p className="text-[11px] text-white/40">Official Release: <span className="text-cyan-400 font-semibold">{game.release}</span></p>
                </div>
                <button disabled className="mt-4 w-full py-2 bg-white/5 border border-white/5 text-white/30 text-[10px] uppercase font-black tracking-widest rounded cursor-not-allowed">
                  Pre-Orders Locked
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* New & Trending */}
        <ProductSection
          title="New & Trending"
          subtitle="Hot items fresh from local top-ups"
          products={trending}
          onAddToCart={onAddToCart}
          viewAllPath="/products"
        />

        {/* Top Rated */}
        <ProductSection
          title="Top Rated"
          subtitle="Best customer reviews and rating score products"
          products={topRated}
          onAddToCart={onAddToCart}
          viewAllPath="/products"
        />

        {/* Xbox Section */}
        <ProductSection
          title="Xbox Section"
          subtitle="Official Xbox Keys, memberships and Gift Cards"
          products={xboxGames}
          onAddToCart={onAddToCart}
          viewAllPath="/products?category=xbox"
        />

        {/* PlayStation Section */}
        <ProductSection
          title="PlayStation Section"
          subtitle="PlayStation network cards, exclusive releases and games"
          products={playstationGames}
          onAddToCart={onAddToCart}
          viewAllPath="/products?category=playstation"
        />

        {/* PC Gaming Section */}
        <ProductSection
          title="PC Gaming Section"
          subtitle="Steam keys, GOG, Epic Games accounts and codes"
          products={pcGames}
          onAddToCart={onAddToCart}
          viewAllPath="/products?category=pc"
        />

        {/* Mobile Top-Ups Section */}
        <ProductSection
          title="Mobile Top-Ups Section"
          subtitle="PUBG UC, Garena Diamonds, MLBB and CoD Mobile points"
          products={mobileTopUps}
          onAddToCart={onAddToCart}
          viewAllPath="/products?category=mobile"
        />

        {/* Gift Cards Section */}
        <ProductSection
          title="Gift Cards Section"
          subtitle="Steam, PSN, Xbox, Google Play, Apple App Store, and Razer Gold"
          products={giftCards}
          onAddToCart={onAddToCart}
          viewAllPath="/products?category=giftcards"
        />

        {/* Subscriptions Section */}
        <ProductSection
          title="Subscriptions Section"
          subtitle="Discord Nitro, YouTube Premium, Canva Pro, Netflix shared screens"
          products={subscriptions}
          onAddToCart={onAddToCart}
          viewAllPath="/products?category=subscriptions"
        />
      </div>

    </div>
  );
}
