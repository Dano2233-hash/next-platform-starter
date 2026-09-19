import React from 'react';
import { Link } from 'react-router-dom';
import {
  Gamepad2,
  Sparkles,
  Zap,
  Flame,
  Star,
  Gift,
  Smartphone,
  Tv,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { ProductSection } from '../components/ProductSection';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const { products } = useProducts();

  // Filter sections
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const trendingProducts = products.filter((p) => p.isTrending);
  const topRatedProducts = products.filter((p) => p.isTopRated);
  const featuredProducts = products.filter((p) => p.isFeatured);

  // Platform sections
  const xboxProducts = products.filter((p) => p.platform === 'Xbox');
  const psProducts = products.filter((p) => p.platform === 'PlayStation');
  const pcProducts = products.filter((p) => p.platform === 'PC');
  const mobileProducts = products.filter((p) => p.category === 'mobile');
  const giftCardProducts = products.filter((p) => p.category === 'giftcards');
  const subProducts = products.filter((p) => p.category === 'subscriptions');

  // Top Sales (sorted by soldCount)
  const topSales = [...products].sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#080d1a] via-[#050508] to-[#050508] pt-8 pb-12 border-b border-slate-800/60">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-bold shadow-lg shadow-cyan-500/10">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>#1 Gaming Marketplace in Kurdistan & Iraq</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-100 leading-tight tracking-tight">
                Level Up Your Gaming Experience with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400">
                  Instant Digital Delivery
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
                Get instant PUBG Mobile UC, Free Fire Diamonds, Steam Cards, PSN, Xbox, and licensed PC games at the best local prices in IQD. Fast & secure manual payments.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/products"
                  className="px-6 py-3.5 text-xs font-extrabold rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white shadow-xl shadow-cyan-500/25 hover:opacity-95 transition flex items-center gap-2"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Browse All Products</span>
                </Link>

                <Link
                  to="/products?category=mobile"
                  className="px-6 py-3.5 text-xs font-bold rounded-2xl bg-[#0e1424] text-slate-200 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 transition"
                >
                  Mobile Top-Ups
                </Link>
              </div>

              {/* Trust highlights */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-semibold">Instant Codes</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold">100% Legal & Safe</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="font-semibold">FastPay & Korek</span>
                </div>
              </div>
            </div>

            {/* Right Hero Showcase Card */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-[#0e1526] via-[#090d18] to-[#120e24] p-6 rounded-3xl border border-slate-800/90 shadow-2xl relative overflow-hidden group">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-[11px] font-extrabold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg shadow-md">
                    HOT DEAL TODAY
                  </span>
                  <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 24/7 Service
                  </span>
                </div>

                {topSales.length > 0 && (
                  <div className="space-y-4">
                    <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 h-48">
                      <img
                        src={
                          topSales[0].image ||
                          'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg'
                        }
                        alt={topSales[0].name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090d18] via-transparent to-transparent"></div>
                      <span className="absolute bottom-3 left-3 px-2.5 py-1 text-xs font-extrabold text-cyan-300 bg-cyan-950/90 border border-cyan-800 rounded-md">
                        {topSales[0].platform}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-extrabold text-white">
                        {topSales[0].name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                        {topSales[0].description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">
                          Starting From
                        </span>
                        <span className="text-lg font-black text-cyan-400">
                          {topSales[0].price} IQD
                        </span>
                      </div>
                      <Link
                        to={`/product/${topSales[0].id}`}
                        className="px-4 py-2.5 text-xs font-bold rounded-xl bg-cyan-500 text-black hover:bg-cyan-400 transition flex items-center gap-1"
                      >
                        Buy Now <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/products?category=mobile"
            className="group p-5 rounded-2xl bg-[#0b0f1a] hover:bg-[#12192c] border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex items-center gap-3"
          >
            <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-800/50 text-cyan-400 group-hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-400 transition">
                Mobile Top-Ups
              </h3>
              <p className="text-[11px] text-slate-400">PUBG, Free Fire, Robux</p>
            </div>
          </Link>

          <Link
            to="/products?category=games"
            className="group p-5 rounded-2xl bg-[#0b0f1a] hover:bg-[#12192c] border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex items-center gap-3"
          >
            <div className="p-3 rounded-xl bg-blue-950/80 border border-blue-800/50 text-blue-400 group-hover:scale-110 transition-transform">
              <Tv className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-400 transition">
                Paid Games
              </h3>
              <p className="text-[11px] text-slate-400">Steam, GTA V, Elden Ring</p>
            </div>
          </Link>

          <Link
            to="/products?category=giftcards"
            className="group p-5 rounded-2xl bg-[#0b0f1a] hover:bg-[#12192c] border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex items-center gap-3"
          >
            <div className="p-3 rounded-xl bg-purple-950/80 border border-purple-800/50 text-purple-400 group-hover:scale-110 transition-transform">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-400 transition">
                Gift Cards
              </h3>
              <p className="text-[11px] text-slate-400">Steam, PSN, Xbox, Apple</p>
            </div>
          </Link>

          <Link
            to="/products?category=subscriptions"
            className="group p-5 rounded-2xl bg-[#0b0f1a] hover:bg-[#12192c] border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex items-center gap-3"
          >
            <div className="p-3 rounded-xl bg-amber-950/80 border border-amber-800/50 text-amber-400 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-400 transition">
                Subscriptions
              </h3>
              <p className="text-[11px] text-slate-400">Nitro, YouTube, Netflix</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-950/40 via-purple-950/40 to-cyan-950/40 border border-cyan-800/40 rounded-3xl p-6 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 z-10 text-center md:text-left">
            <span className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-cyan-300 bg-cyan-950 rounded-md border border-cyan-800">
              COMING SOON TO DANO STORE
            </span>
            <h3 className="text-xl font-extrabold text-white">
              Grand Theft Auto VI & EA SPORTS FC 26 Pre-Orders
            </h3>
            <p className="text-xs text-slate-300 max-w-lg">
              Get notified first in Kurdistan & Iraq when pre-orders open for upcoming AAA blockbusters!
            </p>
          </div>
          <Link
            to="/products"
            className="px-5 py-3 text-xs font-bold rounded-2xl bg-cyan-500 text-black hover:bg-cyan-400 transition whitespace-nowrap z-10 shadow-lg shadow-cyan-500/20"
          >
            Explore Available Games
          </Link>
        </div>
      </section>

      {/* Flash Deals */}
      <ProductSection
        title="Flash Deals & Special Discounts"
        subtitle="Limited time offer prices on top game keys and wallet cards."
        badge="FLASH DEALS"
        viewAllLink="/products"
        products={flashDeals}
        limit={4}
      />

      {/* Top Sales */}
      <ProductSection
        title="Top Sales in Kurdistan & Iraq"
        subtitle="Most purchased digital games, top-ups, and subscriptions."
        badge="MOST POPULAR"
        viewAllLink="/products"
        products={topSales}
        limit={4}
      />

      {/* New & Trending */}
      <ProductSection
        title="New & Trending Products"
        subtitle="Fresh additions and trending gaming items this week."
        badge="TRENDING NOW"
        viewAllLink="/products"
        products={trendingProducts}
        limit={4}
      />

      {/* Top Rated */}
      <ProductSection
        title="Top Rated Games & Cards"
        subtitle="Rated 4.8+ stars by thousands of gamers in Iraq."
        badge="COMMUNITY FAVORITES"
        viewAllLink="/products"
        products={topRatedProducts}
        limit={4}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Console & PC Store"
        subtitle="Game Pass Ultimate, Xbox Gift Cards, and Xbox keys."
        badge="XBOX GAMING"
        viewAllLink="/products?platform=Xbox"
        products={xboxProducts}
        limit={4}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Network Store"
        subtitle="PSN Gift Cards for US, UK, and Global regions."
        badge="PLAYSTATION"
        viewAllLink="/products?platform=PlayStation"
        products={psProducts}
        limit={4}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Games & Steam Keys"
        subtitle="Licensed digital Steam keys and PC game titles."
        badge="PC GAMING"
        viewAllLink="/products?platform=PC"
        products={pcProducts}
        limit={4}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups & In-Game Currency"
        subtitle="PUBG UC, Free Fire Diamonds, MLBB, COD CP and more."
        badge="MOBILE TOP-UPS"
        viewAllLink="/products?category=mobile"
        products={mobileProducts}
        limit={4}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Digital Gift Cards"
        subtitle="Steam, PSN, Xbox, Google Play, Apple, Razer Gold."
        badge="GIFT CARDS"
        viewAllLink="/products?category=giftcards"
        products={giftCardProducts}
        limit={4}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix 4K, Spotify."
        badge="SUBSCRIPTIONS"
        viewAllLink="/products?category=subscriptions"
        products={subProducts}
        limit={4}
      />
    </div>
  );
};
