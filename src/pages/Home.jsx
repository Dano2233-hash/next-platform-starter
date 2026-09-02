import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductSection from '../components/ProductSection';
import ProductImage from '../components/ProductImage';
import {
  Flame,
  Zap,
  TrendingUp,
  Star,
  Gamepad2,
  Gift,
  Crown,
  Smartphone,
  ShieldCheck,
  Headphones,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export default function Home({ products = [], onAddToCart, onBuyNow }) {
  const navigate = useNavigate();

  const topSalesProducts = products.filter((p) => p.soldCount >= 2000).slice(0, 4);
  const flashDealsProducts = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
  const topRatedProducts = products.filter((p) => p.isTopRated).slice(0, 4);

  const xboxProducts = products.filter((p) => p.platform === 'Xbox').slice(0, 4);
  const psProducts = products.filter((p) => p.platform === 'PlayStation').slice(0, 4);
  const pcProducts = products.filter((p) => p.platform === 'PC').slice(0, 4);
  const mobileProducts = products.filter((p) => p.category === 'Mobile Top-Ups').slice(0, 4);
  const giftCardProducts = products.filter((p) => p.category === 'Gift Cards').slice(0, 4);
  const subscriptionProducts = products.filter((p) => p.category === 'Subscriptions').slice(0, 4);

  const heroProduct = products.find((p) => p.id === 'pubg-mobile-uc') || products[0];

  return (
    <div className="space-y-12">
      <div className="bg-gradient-to-r from-blue-900 via-cyan-900 to-purple-900 text-cyan-200 text-xs py-2 px-4 text-center font-bold tracking-wide border-b border-cyan-500/20 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
        <span>INSTANT DIGITAL TOP-UPS & GAME KEYS IN KURDISTAN & IRAQ — 100% GUARANTEED</span>
        <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0a0f1d] via-[#0d162b] to-[#070b14] border border-slate-800/80 p-8 md:p-12 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-extrabold uppercase tracking-wider">
                <Flame className="w-4 h-4 fill-cyan-400" />
                <span>#1 Gaming Digital Store in Iraq</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Level Up Your Game with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Dano Store</span>
              </h1>

              <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl">
                Get instant delivery for PUBG UC, Free Fire Diamonds, Steam Wallet cards, PlayStation Plus, Xbox codes, and full PC games with local FastPay & Korek payment methods.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/products"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-sm transition-all duration-300 shadow-xl shadow-cyan-950/60"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/products?category=Mobile%20Top-Ups"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm transition-colors"
                >
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  <span>Mobile Top-Ups</span>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs font-semibold text-slate-400">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Instant Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Official Keys</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-cyan-400" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            {heroProduct && (
              <div className="lg:col-span-5">
                <div
                  onClick={() => navigate(`/product/${heroProduct.id}`)}
                  className="bg-[#0b101d] rounded-2xl p-5 border border-cyan-500/30 shadow-2xl hover:border-cyan-400 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-black uppercase">
                      Featured Pick
                    </span>
                    <span className="text-xs font-bold text-slate-400">{heroProduct.platform}</span>
                  </div>
                  <div className="rounded-xl overflow-hidden mb-4 h-48">
                    <ProductImage product={heroProduct} className="h-full w-full" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {heroProduct.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 mb-4">
                    {heroProduct.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                    <span className="text-lg font-black text-cyan-400">
                      From {heroProduct.price?.toLocaleString()} IQD
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onBuyNow) {
                          onBuyNow(heroProduct);
                        } else {
                          onAddToCart(heroProduct, heroProduct.packages?.[0] || null, 1);
                          navigate('/checkout');
                        }
                      }}
                      className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 cursor-pointer"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-4">
          Browse Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="p-4 rounded-2xl bg-[#0a0f1d] border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900 transition-all flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:text-cyan-300 transition-all mb-2.5">
                {cat.name === 'Mobile Top-Ups' && <Smartphone className="w-5 h-5" />}
                {cat.name === 'Paid Games' && <Gamepad2 className="w-5 h-5" />}
                {cat.name === 'Gift Cards' && <Gift className="w-5 h-5" />}
                {cat.name === 'Subscriptions' && <Crown className="w-5 h-5" />}
                {cat.name === 'Others' && <Sparkles className="w-5 h-5" />}
              </div>
              <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-blue-950/60 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-purple-500 text-slate-950">
                Coming Soon
              </span>
              <h3 className="text-base font-bold text-white mt-1">
                GTA VI Pre-Orders & EA SPORTS FC 25 Packs
              </h3>
              <p className="text-xs text-slate-400">
                Register interest to be notified as soon as pre-orders launch in Kurdistan.
              </p>
            </div>
          </div>
          <button
            onClick={() => alert('Thanks for your interest! We will announce availability on WhatsApp.')}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold whitespace-nowrap cursor-pointer"
          >
            Notify Me
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ProductSection
          title="Top Sales"
          subtitle="Most ordered items by players across Erbil, Sulaymaniyah, and Baghdad"
          icon={Flame}
          viewAllLink="/products"
          products={topSalesProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />

        <ProductSection
          title="Flash Deals"
          subtitle="Limited-time discounted top-ups and key packages"
          icon={Zap}
          viewAllLink="/products"
          products={flashDealsProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />

        <ProductSection
          title="New & Trending"
          subtitle="Trending games and newly added subscriptions"
          icon={TrendingUp}
          viewAllLink="/products"
          products={trendingProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />

        <ProductSection
          title="Top Rated"
          subtitle="Highest rating customer choices"
          icon={Star}
          viewAllLink="/products"
          products={topRatedProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />

        <ProductSection
          title="Xbox Games & Cards"
          subtitle="Xbox Game Pass, Xbox Live, and Xbox Digital Keys"
          icon={Gamepad2}
          viewAllLink="/products?platform=Xbox"
          products={xboxProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />

        <ProductSection
          title="PlayStation Store"
          subtitle="PSN Gift Cards, PlayStation Plus, and PS5 Digital Codes"
          icon={Gamepad2}
          viewAllLink="/products?platform=PlayStation"
          products={psProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />

        <ProductSection
          title="PC Gaming Store"
          subtitle="Steam Wallet cards, official Steam PC keys, and Riot Points"
          icon={Gamepad2}
          viewAllLink="/products?platform=PC"
          products={pcProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />

        <ProductSection
          title="Mobile Top-Ups"
          subtitle="PUBG UC, Free Fire Diamonds, Robux, and COD Points"
          icon={Smartphone}
          viewAllLink="/products?category=Mobile%20Top-Ups"
          products={mobileProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />

        <ProductSection
          title="Gift Cards"
          subtitle="Steam, PSN, Xbox, Google Play, Apple, and Razer Gold"
          icon={Gift}
          viewAllLink="/products?category=Gift%20Cards"
          products={giftCardProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />

        <ProductSection
          title="Digital Subscriptions"
          subtitle="Discord Nitro, YouTube Premium, Netflix, and Spotify"
          icon={Crown}
          viewAllLink="/products?category=Subscriptions"
          products={subscriptionProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      </div>
    </div>
  );
}
