import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Flame, Zap, Award, Smartphone, CreditCard, Gamepad2, Layers, Clock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';
import ProductImage from '../components/ProductImage';
import { CATEGORIES } from '../data/categories';

export default function Home() {
  const { products } = useProducts();

  const featuredProducts = products.filter((p) => p.isFeatured);
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const trendingProducts = products.filter((p) => p.isTrending);
  const topRatedProducts = products.filter((p) => p.isTopRated);

  const xboxProducts = products.filter((p) => p.platform === 'Xbox');
  const psProducts = products.filter((p) => p.platform === 'PlayStation');
  const pcProducts = products.filter((p) => p.platform === 'PC');
  const mobileProducts = products.filter((p) => p.category === 'mobile');
  const giftCardProducts = products.filter((p) => p.category === 'gift-cards');
  const subscriptionProducts = products.filter((p) => p.category === 'subscriptions');

  const mainHeroProduct = featuredProducts[0] || products[0];

  return (
    <div className="space-y-12 pb-12">

      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-cyan-900 to-purple-900 border-b border-cyan-500/20 py-2 px-4 text-center">
        <p className="text-xs font-bold text-cyan-200 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>INSTANT DIGITAL DELIVERY IN KURDISTAN & IRAQ | FASTPAY • KOREK • MASTERCARD</span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#060a14] via-[#091428] to-[#120b2b] border border-slate-800 p-6 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                <Flame className="w-3.5 h-3.5 text-cyan-400" />
                <span>Premier Gaming Store Kurdistan</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-100 leading-tight tracking-tight">
                Level Up Your Gaming Experience with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                  Dano Store
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Instant PUBG Mobile UC, Free Fire Diamonds, Steam Wallet, PlayStation Gift Cards, PC Games, and Subscriptions delivered fast.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  to="/products"
                  className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/25 flex items-center gap-2 active:scale-95 transition-all"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/products?category=mobile"
                  className="px-6 py-3 rounded-xl font-bold text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 transition-all"
                >
                  Mobile Top-Ups
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Manual FastPay Payment</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>Korek Transfer</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>MasterCard Accepted</span>
                </div>
              </div>
            </div>

            {/* Main Featured Highlight */}
            {mainHeroProduct && (
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm">
                  <ProductCard product={mainHeroProduct} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Category Row */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">
              Browse Categories
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select your favorite platform or product category
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={cat.id === 'all' ? '/products' : `/products?category=${cat.id}`}
                className="p-4 rounded-2xl bg-[#080d1a] border border-slate-800 hover:border-cyan-500/50 flex flex-col items-center justify-center text-center gap-2 group card-hover transition-all"
              >
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-colors">
                  {cat.id === 'mobile' && <Smartphone className="w-6 h-6 text-cyan-400" />}
                  {cat.id === 'games' && <Gamepad2 className="w-6 h-6 text-blue-400" />}
                  {cat.id === 'gift-cards' && <CreditCard className="w-6 h-6 text-purple-400" />}
                  {cat.id === 'subscriptions' && <Sparkles className="w-6 h-6 text-pink-400" />}
                  {cat.id === 'others' && <Layers className="w-6 h-6 text-amber-400" />}
                  {cat.id === 'all' && <Layers className="w-6 h-6 text-slate-400" />}
                </div>
                <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Flash Deals Section */}
        {flashDeals.length > 0 && (
          <ProductSection
            title="Flash Deals"
            subtitle="Limited time discounts on gaming keys and top-ups"
            icon={Zap}
            badge="Hot Discount"
            viewAllLink="/products"
            products={flashDeals.slice(0, 4)}
          />
        )}

        {/* New & Trending Section */}
        {trendingProducts.length > 0 && (
          <ProductSection
            title="New & Trending"
            subtitle="Most sought after products by Kurdistan gamers"
            icon={Flame}
            badge="Popular"
            viewAllLink="/products"
            products={trendingProducts.slice(0, 4)}
          />
        )}

        {/* Top Rated Section */}
        {topRatedProducts.length > 0 && (
          <ProductSection
            title="Top Rated"
            subtitle="5-star rated products with highest customer satisfaction"
            icon={Award}
            badge="5.0 Stars"
            viewAllLink="/products"
            products={topRatedProducts.slice(0, 4)}
          />
        )}

        {/* Coming Soon Teaser Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-slate-900 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="p-3 rounded-xl bg-purple-500/20 text-purple-300">
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">Coming Soon: Tournament Tickets & Exclusive Accounts</h3>
              <p className="text-xs text-slate-400 mt-0.5">We are constantly adding new digital keys, software licenses, and esports passes.</p>
            </div>
          </div>
          <Link
            to="/products"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shrink-0"
          >
            Check Available Store Items
          </Link>
        </div>

        {/* Mobile Top-Ups Section */}
        {mobileProducts.length > 0 && (
          <ProductSection
            title="Mobile Top-Ups"
            subtitle="PUBG UC, Free Fire Diamonds, Robux, Mobile Legends & CP"
            icon={Smartphone}
            viewAllLink="/products?category=mobile"
            products={mobileProducts.slice(0, 4)}
          />
        )}

        {/* PC Gaming Section */}
        {pcProducts.length > 0 && (
          <ProductSection
            title="PC Gaming Section"
            subtitle="Original Steam keys, GTA V, Elden Ring, Black Myth Wukong & more"
            icon={Gamepad2}
            viewAllLink="/products?platform=PC"
            products={pcProducts.slice(0, 4)}
          />
        )}

        {/* PlayStation Section */}
        {psProducts.length > 0 && (
          <ProductSection
            title="PlayStation Section"
            subtitle="God of War, PSN Gift Cards & PlayStation codes"
            icon={Gamepad2}
            viewAllLink="/products?platform=PlayStation"
            products={psProducts.slice(0, 4)}
          />
        )}

        {/* Xbox Section */}
        {xboxProducts.length > 0 && (
          <ProductSection
            title="Xbox Section"
            subtitle="Forza Horizon 5, Sea of Thieves, and Xbox digital gift cards"
            icon={Gamepad2}
            viewAllLink="/products?platform=Xbox"
            products={xboxProducts.slice(0, 4)}
          />
        )}

        {/* Gift Cards Section */}
        {giftCardProducts.length > 0 && (
          <ProductSection
            title="Gift Cards Section"
            subtitle="Steam Wallet, PlayStation, Xbox, Google Play, Razer Gold & Apple"
            icon={CreditCard}
            viewAllLink="/products?category=gift-cards"
            products={giftCardProducts.slice(0, 4)}
          />
        )}

        {/* Subscriptions Section */}
        {subscriptionProducts.length > 0 && (
          <ProductSection
            title="Subscriptions Section"
            subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify & Canva Pro"
            icon={Sparkles}
            viewAllLink="/products?category=subscriptions"
            products={subscriptionProducts.slice(0, 4)}
          />
        )}

      </div>
    </div>
  );
}
