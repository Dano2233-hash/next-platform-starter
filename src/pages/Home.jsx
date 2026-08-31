import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Flame,
  Star,
  Clock,
  TrendingUp,
  Gamepad2,
  Tv,
  Smartphone,
  Gift,
  CreditCard,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import ProductSection from '../components/ProductSection';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function Home({ products = [], onAddToCart }) {
  // Section filters
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
  const topRatedProducts = products.filter((p) => p.isTopRated || p.rating >= 4.8).slice(0, 4);
  const topSales = products.filter((p) => p.soldCount > 1000).slice(0, 4);
  const comingSoon = products.filter((p) => p.isComingSoon || p.stock === 0).slice(0, 4);

  // Platform & Category sections
  const xboxProducts = products.filter((p) => p.platform === 'Xbox').slice(0, 4);
  const psProducts = products.filter((p) => p.platform === 'PlayStation').slice(0, 4);
  const pcProducts = products.filter((p) => p.platform === 'PC').slice(0, 4);
  const mobileProducts = products.filter((p) => p.category === 'mobile').slice(0, 4);
  const giftCardProducts = products.filter((p) => p.category === 'giftcards').slice(0, 4);
  const subscriptionProducts = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  const heroFeatured = featuredProducts[0] || products[0];

  return (
    <div className="space-y-10 pb-12">
      {/* --- HERO / FEATURED SECTION --- */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b1329] via-[#080d1a] to-[#04060d] border border-slate-800/80 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Official Gaming Store in Iraq & Kurdistan</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Instant Digital Code <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Top-Ups & Video Games
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Buy PUBG UC, Free Fire Diamonds, Steam Cards, PSN Cards, Xbox Codes, and paid PC games instantly using FastPay, Korek, or MasterCard.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/products"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products?category=mobile"
                className="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-extrabold text-xs uppercase tracking-wider border border-slate-700 hover:border-slate-600 transition-all"
              >
                Mobile Top-Ups
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 text-center">
              <div>
                <span className="block text-xl font-black text-white">100%</span>
                <span className="text-[11px] text-slate-400 font-medium">Verified Legal</span>
              </div>
              <div>
                <span className="block text-xl font-black text-cyan-400">Instant</span>
                <span className="text-[11px] text-slate-400 font-medium">Digital Delivery</span>
              </div>
              <div>
                <span className="block text-xl font-black text-purple-400">24/7</span>
                <span className="text-[11px] text-slate-400 font-medium">Local Support</span>
              </div>
            </div>
          </div>

          {/* Featured Game Spotlight Card */}
          {heroFeatured && (
            <div className="lg:col-span-5">
              <div className="relative bg-[#0d1527] border border-cyan-500/40 rounded-2xl p-4 shadow-xl hover:shadow-cyan-500/10 transition-all group">
                <div className="absolute top-6 left-6 z-10">
                  <span className="px-3 py-1 text-[11px] font-black uppercase rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md">
                    Featured Item
                  </span>
                </div>
                <ProductImage product={heroFeatured} className="h-56" />
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-cyan-400 font-bold uppercase">{heroFeatured.platform} • {heroFeatured.type}</span>
                    <span className="text-slate-400 font-medium">{heroFeatured.soldCount}+ Sold</span>
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-cyan-400 transition-colors">
                    {heroFeatured.name}
                  </h3>
                  <div className="flex items-baseline justify-between pt-2 border-t border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Starting at</span>
                      <span className="text-lg font-black text-white">{formatPrice(heroFeatured.price)}</span>
                    </div>
                    <Link
                      to={`/product/${heroFeatured.slug || heroFeatured.id}`}
                      className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 font-bold text-xs transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* --- CATEGORY ROW --- */}
      <section className="py-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <Link
            to="/products?category=mobile"
            className="p-4 rounded-2xl bg-[#090e1c] hover:bg-[#0e162a] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform mb-2">
              <Smartphone className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs text-slate-200 group-hover:text-cyan-400">Mobile Top-Ups</span>
            <span className="text-[10px] text-slate-400 mt-0.5">UC, VP, Robux, CP</span>
          </Link>

          <Link
            to="/products?category=games"
            className="p-4 rounded-2xl bg-[#090e1c] hover:bg-[#0e162a] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform mb-2">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs text-slate-200 group-hover:text-cyan-400">Paid Games</span>
            <span className="text-[10px] text-slate-400 mt-0.5">GTA V, RDR2, Elden Ring</span>
          </Link>

          <Link
            to="/products?category=giftcards"
            className="p-4 rounded-2xl bg-[#090e1c] hover:bg-[#0e162a] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform mb-2">
              <Gift className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs text-slate-200 group-hover:text-cyan-400">Gift Cards</span>
            <span className="text-[10px] text-slate-400 mt-0.5">Steam, PSN, Xbox, Apple</span>
          </Link>

          <Link
            to="/products?category=subscriptions"
            className="p-4 rounded-2xl bg-[#090e1c] hover:bg-[#0e162a] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform mb-2">
              <Tv className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs text-slate-200 group-hover:text-cyan-400">Subscriptions</span>
            <span className="text-[10px] text-slate-400 mt-0.5">Nitro, YouTube, Netflix</span>
          </Link>

          <Link
            to="/products"
            className="p-4 rounded-2xl bg-[#090e1c] hover:bg-[#0e162a] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col items-center text-center group col-span-2 sm:col-span-1"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:scale-110 transition-transform mb-2">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
            <span className="font-bold text-xs text-slate-200 group-hover:text-cyan-400">All Catalog</span>
            <span className="text-[10px] text-slate-400 mt-0.5">Explore Everything</span>
          </Link>
        </div>
      </section>

      {/* --- FLASH DEALS SECTION --- */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time special discounts"
        icon={Zap}
        linkTo="/products"
        products={flashDeals}
        onAddToCart={onAddToCart}
      />

      {/* --- TOP SALES SECTION --- */}
      <ProductSection
        title="Top Sales"
        subtitle="Best selling products in Kurdistan & Iraq"
        icon={Flame}
        linkTo="/products"
        products={topSales}
        onAddToCart={onAddToCart}
      />

      {/* --- NEW & TRENDING SECTION --- */}
      <ProductSection
        title="New & Trending"
        subtitle="Popular items trending right now"
        icon={TrendingUp}
        linkTo="/products"
        products={trendingProducts}
        onAddToCart={onAddToCart}
      />

      {/* --- TOP RATED SECTION --- */}
      <ProductSection
        title="Top Rated"
        subtitle="Highest customer ratings"
        icon={Star}
        linkTo="/products"
        products={topRatedProducts}
        onAddToCart={onAddToCart}
      />

      {/* --- MOBILE TOP-UPS SECTION --- */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, Robux & More"
        icon={Smartphone}
        linkTo="/products?category=mobile"
        products={mobileProducts}
        onAddToCart={onAddToCart}
      />

      {/* --- XBOX SECTION --- */}
      <ProductSection
        title="Xbox Gaming"
        subtitle="Games and digital codes for Xbox Series X|S"
        icon={Gamepad2}
        linkTo="/products?platform=Xbox"
        products={xboxProducts}
        onAddToCart={onAddToCart}
      />

      {/* --- PLAYSTATION SECTION --- */}
      <ProductSection
        title="PlayStation Section"
        subtitle="PS4/PS5 games & PSN gift cards"
        icon={Gamepad2}
        linkTo="/products?platform=PlayStation"
        products={psProducts}
        onAddToCart={onAddToCart}
      />

      {/* --- PC GAMING SECTION --- */}
      <ProductSection
        title="PC Gaming Section"
        subtitle="Steam keys, Epic Games & PC titles"
        icon={Gamepad2}
        linkTo="/products?platform=PC"
        products={pcProducts}
        onAddToCart={onAddToCart}
      />

      {/* --- GIFT CARDS SECTION --- */}
      <ProductSection
        title="Gift Cards Section"
        subtitle="Steam, PSN, Xbox, Apple & Google Play cards"
        icon={Gift}
        linkTo="/products?category=giftcards"
        products={giftCardProducts}
        onAddToCart={onAddToCart}
      />

      {/* --- SUBSCRIPTIONS SECTION --- */}
      <ProductSection
        title="Subscriptions Section"
        subtitle="Discord Nitro, YouTube Premium, Netflix & Spotify"
        icon={Tv}
        linkTo="/products?category=subscriptions"
        products={subscriptionProducts}
        onAddToCart={onAddToCart}
      />

      {/* --- COMING SOON SECTION --- */}
      {comingSoon.length > 0 && (
        <ProductSection
          title="Coming Soon"
          subtitle="Upcoming title reservations and releases"
          icon={Clock}
          linkTo="/products"
          products={comingSoon}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
}
