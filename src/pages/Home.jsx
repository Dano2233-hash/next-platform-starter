import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Zap, Award, Sparkles, Gamepad2, Smartphone, Monitor, Tv, CreditCard, ShieldCheck } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { products } = useProducts();

  // Filters for home sections
  const featuredProducts = products.filter(p => p.isFeatured);
  const topSalesProducts = products.filter(p => p.tag === 'Top Sales' || p.soldCount > 3000);
  const flashDealsProducts = products.filter(p => p.isFlashDeal);
  const newTrendingProducts = products.filter(p => p.isTrending);
  const topRatedProducts = products.filter(p => p.isTopRated || p.rating >= 4.9);

  // Platform & Category specific sections
  const xboxProducts = products.filter(p => p.platform === 'Xbox' || p.category === 'xbox').slice(0, 4);
  const playstationProducts = products.filter(p => p.platform === 'PlayStation' || p.category === 'playstation').slice(0, 4);
  const pcProducts = products.filter(p => p.platform === 'PC' || p.category === 'pc').slice(0, 4);
  const mobileProducts = products.filter(p => p.platform === 'Mobile' || p.category === 'mobile').slice(0, 4);
  const giftCardProducts = products.filter(p => p.type === 'Gift Card' || p.category === 'giftcards').slice(0, 4);
  const subscriptionProducts = products.filter(p => p.type === 'Subscription' || p.category === 'subscriptions').slice(0, 4);

  return (
    <div className="space-y-10 pb-16">

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 bg-gradient-to-b from-[#080d1f] via-[#05070f] to-[#05070f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>KURDISTAN & IRAQ #1 DIGITAL GAMING HUB</span>
              </div>

              <h1 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-white tracking-wide leading-tight">
                INSTANT TOP-UPS, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
                  GAMES & GIFT CARDS
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Get instant delivery for PUBG UC, Free Fire Diamonds, Steam Wallet, PlayStation, Xbox Cards & PC Games with FastPay, Korek, and MasterCard!
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/products?category=mobile"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-slate-950 text-slate-950" />
                  <span>Buy Top-Ups Now</span>
                </Link>

                <Link
                  to="/products"
                  className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-200 hover:text-cyan-400 font-orbitron font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Browse Catalog
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>100% Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Instant Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-purple-400" />
                  <span>24/7 Live Support</span>
                </div>
              </div>
            </div>

            {/* Right Hero Showcase Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {featuredProducts.slice(0, 2).map((prod) => (
                <div key={prod.id} className="transform hover:-translate-y-1 transition-transform">
                  <ProductCard product={prod} />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Category Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="font-orbitron font-bold text-xs uppercase text-slate-400 tracking-wider mb-4">
          Explore Categories
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { name: 'Mobile Top-Ups', path: '/products?category=mobile', icon: Smartphone, color: 'text-cyan-400' },
            { name: 'PC Gaming', path: '/products?platform=PC', icon: Monitor, color: 'text-blue-400' },
            { name: 'Xbox Store', path: '/products?platform=Xbox', icon: Gamepad2, color: 'text-emerald-400' },
            { name: 'PlayStation', path: '/products?platform=PlayStation', icon: Tv, color: 'text-indigo-400' },
            { name: 'Gift Cards', path: '/products?category=giftcards', icon: CreditCard, color: 'text-purple-400' },
            { name: 'Subscriptions', path: '/products?category=subscriptions', icon: Zap, color: 'text-amber-400' }
          ].map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              className="p-4 rounded-xl bg-[#090e1f] border border-slate-800/80 hover:border-cyan-500/50 hover:bg-[#0c1224] transition-all flex flex-col items-center text-center gap-2 group"
            >
              <cat.icon className={`w-6 h-6 ${cat.color} group-hover:scale-110 transition-transform`} />
              <span className="font-orbitron text-xs font-semibold text-slate-200 group-hover:text-cyan-400">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/80 via-purple-950/80 to-slate-950 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-purple-500/20 text-purple-300 border border-purple-500/40">
              COMING SOON TO DANO STORE
            </span>
            <h3 className="font-orbitron font-extrabold text-xl text-white">
              GTA 6 Digital Pre-Orders & EA SPORTS FC 25 Ultimate Keys
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Get ready for the biggest upcoming gaming releases in Kurdistan & Iraq. Pre-order notifications will open soon.
            </p>
          </div>
          <Link
            to="/products"
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-orbitron font-bold text-xs uppercase tracking-wider shrink-0 transition-colors"
          >
            Stay Tuned
          </Link>
        </div>
      </section>

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Best selling top-ups and games in Kurdistan & Iraq"
        viewAllLink="/products"
        products={topSalesProducts.slice(0, 4)}
        icon={Flame}
      />

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounted rates on popular keys & cards"
        viewAllLink="/products"
        products={flashDealsProducts.slice(0, 4)}
        icon={Zap}
      />

      {/* New & Trending */}
      <ProductSection
        title="New & Trending"
        subtitle="Recently added and viral gaming packages"
        viewAllLink="/products"
        products={newTrendingProducts.slice(0, 4)}
        icon={Sparkles}
      />

      {/* Top Rated */}
      <ProductSection
        title="Top Rated"
        subtitle="Highest customer rated digital keys and services"
        viewAllLink="/products"
        products={topRatedProducts.slice(0, 4)}
        icon={Award}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Section"
        subtitle="Xbox Series X|S games, gift cards and Game Pass"
        viewAllLink="/products?platform=Xbox"
        products={xboxProducts}
        icon={Gamepad2}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Section"
        subtitle="PSN gift cards, PS Plus & PlayStation digital keys"
        viewAllLink="/products?platform=PlayStation"
        products={playstationProducts}
        icon={Tv}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Section"
        subtitle="Steam, Epic Games & Riot points for PC gamers"
        viewAllLink="/products?platform=PC"
        products={pcProducts}
        icon={Monitor}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds & Mobile Legends"
        viewAllLink="/products?category=mobile"
        products={mobileProducts}
        icon={Smartphone}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards"
        subtitle="Steam Wallet, iTunes, Google Play & Razer Gold"
        viewAllLink="/products?category=giftcards"
        products={giftCardProducts}
        icon={CreditCard}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Subscriptions"
        subtitle="Discord Nitro, YouTube Premium & Netflix 4K"
        viewAllLink="/products?category=subscriptions"
        products={subscriptionProducts}
        icon={Zap}
      />

    </div>
  );
}
