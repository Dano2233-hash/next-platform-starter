import React from 'react';
import { Link } from 'react-router-dom';
import {
  Gamepad2,
  Zap,
  Flame,
  Star,
  Clock,
  Sparkles,
  Smartphone,
  CreditCard,
  Crown,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Percent
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { products } = useProducts();
  const navigate = useNavigate();

  // Segregate products for different sections
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const topSales = [...products].sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0)).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending);
  const topRatedProducts = products.filter((p) => p.isTopRated || p.rating >= 4.9);

  // Platform & Category specific
  const xboxProducts = products.filter((p) => p.platform === 'Xbox');
  const playstationProducts = products.filter((p) => p.platform === 'PlayStation');
  const pcProducts = products.filter((p) => p.platform === 'PC' && p.category === 'games');
  const mobileTopups = products.filter((p) => p.category === 'mobile-topups');
  const giftCards = products.filter((p) => p.category === 'gift-cards');
  const subscriptions = products.filter((p) => p.category === 'subscriptions');

  // Hero Featured Product
  const featuredProduct = products.find((p) => p.id === 'black-myth-wukong') || products[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Hero / Featured Section */}
      <section className="relative overflow-hidden pt-6 pb-8 border-b border-slate-900 bg-gradient-to-b from-[#0c1224] via-[#080d19] to-[#05070f]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Hero Pitch */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-bold tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>KURDISTAN & IRAQ DIGITAL GAMING STORE</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Level Up Your Game with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                  Instant Digital Keys
                </span>{' '}
                & Top-Ups
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Official game keys, PUBG Mobile UC, Free Fire Diamonds, Steam gift cards, and subscriptions. Pay manually with FastPay, Korek, and MasterCard in IQD.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/products"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm transition shadow-[0_0_25px_rgba(0,102,255,0.4)] flex items-center gap-2"
                >
                  <span>Explore All Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/products?category=mobile-topups"
                  className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-sm font-bold transition flex items-center gap-2"
                >
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  <span>Mobile Top-Ups</span>
                </Link>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-lg">
                <div>
                  <div className="text-lg font-black text-white">100%</div>
                  <div className="text-[11px] text-slate-400 font-medium">Safe & Legal</div>
                </div>
                <div>
                  <div className="text-lg font-black text-cyan-400">IQD Only</div>
                  <div className="text-[11px] text-slate-400 font-medium">No FX Conversion</div>
                </div>
                <div>
                  <div className="text-lg font-black text-white">5 Mins</div>
                  <div className="text-[11px] text-slate-400 font-medium">Fast Dispatch</div>
                </div>
              </div>
            </div>

            {/* Right Featured Banner Card */}
            {featuredProduct && (
              <div className="lg:col-span-5">
                <div className="relative group rounded-2xl p-1 bg-gradient-to-tr from-cyan-500/30 via-blue-600/30 to-purple-600/30 border border-cyan-500/30 shadow-2xl">
                  <div className="bg-[#0b101e] rounded-[15px] p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-800">
                        Featured Title
                      </span>
                      <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        5.0 GOTY Choice
                      </span>
                    </div>

                    <div className="rounded-xl overflow-hidden aspect-video border border-slate-800 relative">
                      <img
                        src={featuredProduct.image}
                        alt={featuredProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                        <div>
                          <div className="text-[10px] uppercase text-cyan-400 font-bold tracking-wider">
                            {featuredProduct.platform} • {featuredProduct.type}
                          </div>
                          <div className="text-sm font-bold text-white truncate">
                            {featuredProduct.name}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2">
                      {featuredProduct.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">Starting at</div>
                        <div className="text-lg font-black text-white">
                          {featuredProduct.price.toLocaleString()} IQD
                        </div>
                      </div>
                      <Link
                        to={`/product/${featuredProduct.slug}`}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-lg text-xs font-bold shadow"
                      >
                        View Options
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryTabs onSelectCategory={(slug) => navigate(slug === 'all' ? '/products' : `/products?category=${slug}`)} />
        </div>
      </section>

      {/* Coming Soon Announcement Banner */}
      <section className="py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-950/60 via-slate-900 to-blue-950/60 border border-purple-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <Clock className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500 text-white">
                    Coming Soon
                  </span>
                  <h3 className="text-sm font-bold text-white">Grand Theft Auto VI & Monster Hunter Wilds</h3>
                </div>
                <p className="text-xs text-slate-400">
                  Pre-orders and direct reservation for Kurdistan & Iraq gamers will unlock soon. Stay connected on Discord!
                </p>
              </div>
            </div>
            <a
              href="https://discord.gg/danostore"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold whitespace-nowrap shadow transition"
            >
              Join VIP Waitlist
            </a>
          </div>
        </div>
      </section>

      {/* Flash Deals Section */}
      <ProductSection
        title="⚡ Flash Deals"
        subtitle="Limited-time discounts on top PC & mobile products"
        badge="Hot Deals"
        badgeColor="rose"
        actionLink="/products?flash=true"
        products={flashDeals}
        limit={4}
      />

      {/* Top Sales Section */}
      <ProductSection
        title="🔥 Top Sales"
        subtitle="Most popular items bought by gamers in Erbil, Sulaymaniyah, & Baghdad"
        badge="Best Sellers"
        badgeColor="amber"
        actionLink="/products"
        products={topSales}
        limit={4}
      />

      {/* New & Trending Section */}
      <ProductSection
        title="🚀 New & Trending"
        subtitle="What everyone is playing right now"
        badge="Trending"
        badgeColor="cyan"
        actionLink="/products?trending=true"
        products={trendingProducts}
        limit={4}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="⭐ Top Rated"
        subtitle="Highest customer satisfaction & instant delivery rating"
        badge="5.0 Score"
        badgeColor="purple"
        actionLink="/products?toprated=true"
        products={topRatedProducts}
        limit={4}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Console & Game Pass"
        subtitle="Digital codes and game editions for Xbox Series X|S and Xbox One"
        badge="Xbox"
        badgeColor="blue"
        actionLink="/products?platform=Xbox"
        products={xboxProducts}
        limit={4}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Hits"
        subtitle="PSN Gift Cards and top PlayStation digital editions"
        badge="PlayStation"
        badgeColor="blue"
        actionLink="/products?platform=PlayStation"
        products={playstationProducts}
        limit={4}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Mastery"
        subtitle="Official Steam keys and PC digital licenses"
        badge="PC Games"
        badgeColor="cyan"
        actionLink="/products?platform=PC"
        products={pcProducts}
        limit={4}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, COD Mobile CP, and more"
        badge="Instant Recharge"
        badgeColor="amber"
        actionLink="/products?category=mobile-topups"
        products={mobileTopups}
        limit={4}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Digital Gift Cards"
        subtitle="Steam, Apple, Google Play, Razer Gold & Amazon"
        badge="Gift Cards"
        badgeColor="purple"
        actionLink="/products?category=gift-cards"
        products={giftCards}
        limit={4}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix 4K, and Spotify"
        badge="Subscriptions"
        badgeColor="rose"
        actionLink="/products?category=subscriptions"
        products={subscriptions}
        limit={4}
      />
    </div>
  );
}
