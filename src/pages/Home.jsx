import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Flame, Star, Sparkles, Smartphone, Gamepad2, CreditCard, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import ProductSection from '../components/ProductSection';
import ProductImage from '../components/ProductImage';

export default function Home() {
  const navigate = useNavigate();
  const { products } = useProducts();

  // Filter specific product sets
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);
  const flashDeals = products.filter((p) => p.isFlashDeal || p.oldPrice).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 8);
  const topRatedProducts = products.filter((p) => p.isTopRated || p.rating >= 4.9).slice(0, 8);

  const xboxProducts = products.filter((p) => p.platform === 'Xbox').slice(0, 4);
  const playstationProducts = products.filter((p) => p.platform === 'PlayStation').slice(0, 4);
  const pcProducts = products.filter((p) => p.platform === 'PC').slice(0, 4);
  const mobileProducts = products.filter((p) => p.platform === 'Mobile' || p.category === 'topups').slice(0, 4);
  const giftCardProducts = products.filter((p) => p.category === 'giftcards').slice(0, 4);
  const subscriptionProducts = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Featured Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-[#0c1329] via-[#080d1e] to-[#04060f] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Instant Digital Delivery in Iraq</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Level Up Your Gaming Experience with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400">Dano Store</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              Buy PC & Console Games, PUBG Mobile UC, Free Fire Diamonds, Steam Wallet, PSN, Discord Nitro, and digital subscriptions instantly using FastPay, Korek, and MasterCard.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/products"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center gap-2"
              >
                <span>Browse All Products</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <Link
                to="/products?category=topups"
                className="px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-700/80 hover:border-slate-600 text-slate-100 font-extrabold text-xs sm:text-sm transition-all"
              >
                Mobile Top-Ups
              </Link>
            </div>
          </div>

          {/* Hero Banner Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-[#090e1f] border border-slate-700/80 rounded-2xl p-4 shadow-2xl relative overflow-hidden group">
              <div className="relative h-64 rounded-xl overflow-hidden mb-3">
                <ProductImage product={featuredProducts[0]} className="h-full w-full" />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase text-cyan-400 border border-cyan-500/30">
                  Featured Title
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-slate-100 text-sm">
                    {featuredProducts[0]?.name || 'Grand Theft Auto V'}
                  </h3>
                  <p className="text-xs text-cyan-400 font-extrabold mt-0.5">
                    {featuredProducts[0]?.price ? `${featuredProducts[0].price} IQD` : '22,000 IQD'}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/products/${featuredProducts[0]?.id || 'gta-v'}`)}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold text-xs hover:bg-cyan-500/30"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link
          to="/products?category=games"
          className="bg-[#090d1a] border border-slate-800/80 hover:border-blue-500/50 p-4 sm:p-5 rounded-2xl flex items-center gap-3 transition-all hover:-translate-y-1 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-110 transition-transform">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-100 group-hover:text-blue-400 transition-colors">
              Paid Games
            </h3>
            <p className="text-[10px] text-slate-500">PC, Xbox, PlayStation</p>
          </div>
        </Link>

        <Link
          to="/products?category=topups"
          className="bg-[#090d1a] border border-slate-800/80 hover:border-cyan-500/50 p-4 sm:p-5 rounded-2xl flex items-center gap-3 transition-all hover:-translate-y-1 group"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-110 transition-transform">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-100 group-hover:text-cyan-400 transition-colors">
              Mobile Top-Ups
            </h3>
            <p className="text-[10px] text-slate-500">PUBG, Free Fire, Robux</p>
          </div>
        </Link>

        <Link
          to="/products?category=giftcards"
          className="bg-[#090d1a] border border-slate-800/80 hover:border-purple-500/50 p-4 sm:p-5 rounded-2xl flex items-center gap-3 transition-all hover:-translate-y-1 group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-110 transition-transform">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-100 group-hover:text-purple-400 transition-colors">
              Gift Cards
            </h3>
            <p className="text-[10px] text-slate-500">Steam, PSN, Apple, Google</p>
          </div>
        </Link>

        <Link
          to="/products?category=subscriptions"
          className="bg-[#090d1a] border border-slate-800/80 hover:border-amber-500/50 p-4 sm:p-5 rounded-2xl flex items-center gap-3 transition-all hover:-translate-y-1 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-100 group-hover:text-amber-400 transition-colors">
              Subscriptions
            </h3>
            <p className="text-[10px] text-slate-500">Discord Nitro, YouTube, Netflix</p>
          </div>
        </Link>
      </section>

      {/* Coming Soon Banner */}
      <section className="bg-gradient-to-r from-purple-950/60 via-slate-900 to-blue-950/60 border border-purple-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Coming Soon</span>
            <h3 className="font-heading font-bold text-slate-100 text-sm">GTA VI & EA Sports FC 25 Global Keys</h3>
            <p className="text-xs text-slate-400">Pre-orders opening soon with local FastPay and Korek payments.</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/products')}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shrink-0"
        >
          View Store Catalog
        </button>
      </section>

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Most popular products in Kurdistan & Iraq"
        icon={Flame}
        viewAllLink="/products"
        products={featuredProducts}
      />

      {/* Flash Deals Section */}
      {flashDeals.length > 0 && (
        <ProductSection
          title="Flash Deals & Sale Offers"
          subtitle="Limited time discounted digital codes"
          icon={Zap}
          viewAllLink="/products"
          products={flashDeals}
        />
      )}

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="Hot releases and high-demand game recharges"
        icon={Sparkles}
        viewAllLink="/products"
        products={trendingProducts}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated Products"
        subtitle="Highest customer satisfaction rating"
        icon={Star}
        viewAllLink="/products"
        products={topRatedProducts}
      />

      {/* Platform / Category Breakdown Sections */}
      <ProductSection
        title="Mobile Top-Ups & Game Credits"
        subtitle="UC, Diamonds, V-Bucks, VP & Robux"
        icon={Smartphone}
        viewAllLink="/products?category=topups"
        products={mobileProducts}
      />

      <ProductSection
        title="PC Gaming & Steam Titles"
        subtitle="Official Steam & Epic Games activation keys"
        icon={Gamepad2}
        viewAllLink="/products?platform=PC"
        products={pcProducts}
      />

      <ProductSection
        title="PlayStation Store"
        subtitle="PSN Wallet Top-ups & PlayStation Plus"
        icon={Gamepad2}
        viewAllLink="/products?platform=PlayStation"
        products={playstationProducts}
      />

      <ProductSection
        title="Xbox Console & Game Pass"
        subtitle="Xbox gift cards and Game Pass Ultimate"
        icon={Gamepad2}
        viewAllLink="/products?platform=Xbox"
        products={xboxProducts}
      />

      <ProductSection
        title="Gift Cards & Wallet Codes"
        subtitle="Steam, Google Play, Apple & Amazon cards"
        icon={CreditCard}
        viewAllLink="/products?category=giftcards"
        products={giftCardProducts}
      />

      <ProductSection
        title="Subscriptions & Digital Services"
        subtitle="Discord Nitro, YouTube Premium, Netflix & Canva"
        icon={Sparkles}
        viewAllLink="/products?category=subscriptions"
        products={subscriptionProducts}
      />
    </div>
  );
}
