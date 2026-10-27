import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Flame, ShieldCheck, Zap, ArrowRight, Smartphone, Monitor, Box, Tv, CreditCard, Star, Clock } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { products } = useProducts();
  const navigate = useNavigate();

  // Filter sections
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
  const flashDealsProducts = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const topRatedProducts = products.filter((p) => p.isTopRated).slice(0, 4);

  const xboxProducts = products.filter((p) => p.platform === 'Xbox' || p.category === 'xbox').slice(0, 4);
  const playstationProducts = products.filter((p) => p.platform === 'PlayStation' || p.category === 'playstation').slice(0, 4);
  const pcProducts = products.filter((p) => p.platform === 'PC' || p.category === 'pc').slice(0, 4);
  const mobileTopups = products.filter((p) => p.category === 'mobile').slice(0, 4);
  const giftcards = products.filter((p) => p.category === 'giftcards').slice(0, 4);
  const subscriptions = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  const categoryCards = [
    { name: 'Mobile Top-Ups', sub: 'UC, Diamonds, CP', icon: Smartphone, color: 'from-blue-600/20 to-cyan-500/20 border-cyan-500/30', path: '/products?category=mobile' },
    { name: 'PC Gaming', sub: 'Steam Keys & Codes', icon: Monitor, color: 'from-purple-600/20 to-indigo-500/20 border-purple-500/30', path: '/products?category=pc' },
    { name: 'Xbox Store', sub: 'Games & Passes', icon: Box, color: 'from-emerald-600/20 to-teal-500/20 border-emerald-500/30', path: '/products?platform=Xbox' },
    { name: 'PlayStation', sub: 'PSN Cards & Games', icon: Tv, color: 'from-blue-700/20 to-indigo-600/20 border-blue-500/30', path: '/products?platform=PlayStation' },
    { name: 'Gift Cards', sub: 'Steam, PSN, iTunes', icon: CreditCard, color: 'from-amber-600/20 to-yellow-500/20 border-amber-500/30', path: '/products?category=giftcards' },
    { name: 'Subscriptions', sub: 'Discord, Premium', icon: Sparkles, color: 'from-pink-600/20 to-purple-500/20 border-pink-500/30', path: '/products?category=subscriptions' },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero / Featured Section */}
      <section className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-[#070b1a] border border-slate-800/80 p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-extrabold uppercase tracking-widest shadow-sm">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Digital Gaming Store • Kurdistan & Iraq</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Level Up Your Game with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Instant Top-Ups</span> & Digital Codes
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Get instant PUBG UC, Free Fire Diamonds, Steam Keys, PSN Cards, and Premium Subscriptions in IQD. Fast, safe, and reliable payment via FastPay, Korek, and MasterCard.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-sm shadow-xl shadow-cyan-950/50 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Explore Store</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/products?category=mobile')}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-700/80 transition-colors cursor-pointer"
            >
              Mobile Top-Ups
            </button>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5">
          {categoryCards.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                to={cat.path}
                className={`p-4 rounded-2xl bg-gradient-to-br ${cat.color} border backdrop-blur-md hover:scale-105 transition-all shadow-lg flex flex-col items-center text-center space-y-2 group`}
              >
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-cyan-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">{cat.sub}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Coming Soon Teaser */}
      <section className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-blue-950/40 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-900/30 border border-purple-500/30 text-purple-400">
            <Clock className="w-6 h-6 animate-spin" />
          </div>
          <div>
            <span className="px-2 py-0.5 rounded bg-purple-900/80 text-purple-300 text-[10px] font-bold uppercase tracking-wider">
              Coming Soon
            </span>
            <h3 className="text-sm font-bold text-white mt-1">GTA VI Pre-Orders & Black Ops 6 Digital Bundles</h3>
            <p className="text-xs text-slate-400">Pre-orders for upcoming AAA titles will open soon for Kurdistan gamers!</p>
          </div>
        </div>
        <Link
          to="/products"
          className="px-4 py-2 rounded-xl bg-purple-900/50 hover:bg-purple-800/50 border border-purple-500/30 text-purple-200 text-xs font-bold shrink-0"
        >
          View Current Store
        </Link>
      </section>

      {/* Top Sales / Featured */}
      <ProductSection
        title="Top Sales & Featured"
        subtitle="Hand-picked bestselling games, top-ups, and cards in Kurdistan"
        products={featuredProducts}
        viewAllPath="/products"
        icon={Flame}
      />

      {/* Flash Deals */}
      <ProductSection
        title="Flash Deals & Discounted"
        subtitle="Limited time discounts on popular items"
        products={flashDealsProducts}
        viewAllPath="/products"
        icon={Zap}
      />

      {/* New & Trending */}
      <ProductSection
        title="New & Trending"
        subtitle="Recently trending games and mobile top-ups"
        products={trendingProducts}
        viewAllPath="/products"
        icon={Sparkles}
      />

      {/* Top Rated */}
      <ProductSection
        title="Top Rated Games & Services"
        subtitle="5-Star rated digital codes by gaming customers"
        products={topRatedProducts}
        viewAllPath="/products"
        icon={Star}
      />

      {/* Category Specific Sections */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, V-Bucks, Robux & VP"
        products={mobileTopups}
        viewAllPath="/products?category=mobile"
        icon={Smartphone}
      />

      <ProductSection
        title="PC Gaming Store"
        subtitle="Official Steam keys & digital codes"
        products={pcProducts}
        viewAllPath="/products?category=pc"
        icon={Monitor}
      />

      <ProductSection
        title="PlayStation Section"
        subtitle="PSN Gift Cards & PlayStation titles"
        products={playstationProducts}
        viewAllPath="/products?platform=PlayStation"
        icon={Tv}
      />

      <ProductSection
        title="Xbox Section"
        subtitle="Xbox gift cards and digital games"
        products={xboxProducts}
        viewAllPath="/products?platform=Xbox"
        icon={Box}
      />

      <ProductSection
        title="Digital Gift Cards"
        subtitle="Steam, PSN, Xbox, Google Play, Apple & Razer Gold"
        products={giftcards}
        viewAllPath="/products?category=giftcards"
        icon={CreditCard}
      />

      <ProductSection
        title="Subscriptions & Services"
        subtitle="Discord Nitro, YouTube Premium, Netflix & Spotify"
        products={subscriptions}
        viewAllPath="/products?category=subscriptions"
        icon={Sparkles}
      />
    </div>
  );
};

export default Home;
