import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flame,
  Zap,
  Star,
  Sparkles,
  Gamepad2,
  Smartphone,
  CreditCard,
  TrendingUp,
  Clock,
  ShieldCheck,
  ChevronRight,
  Tv,
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import ProductSection from '../components/ProductSection';
import CategoryTabs from '../components/CategoryTabs';

export default function Home() {
  const { products } = useProducts();
  const navigate = useNavigate();

  // Filter sections
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const topSales = [...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
  const topRatedProducts = products.filter((p) => p.isTopRated || p.rating >= 4.9).slice(0, 4);

  // Platform and Category specific sections
  const xboxProducts = products.filter((p) => p.platform === 'Xbox').slice(0, 4);
  const psProducts = products.filter((p) => p.platform === 'PlayStation').slice(0, 4);
  const pcProducts = products.filter((p) => p.platform === 'PC').slice(0, 4);
  const mobileTopUps = products.filter((p) => p.category === 'mobile').slice(0, 4);
  const giftCards = products.filter((p) => p.category === 'giftcards').slice(0, 4);
  const subscriptions = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  // Featured hero product
  const heroProduct = products.find((p) => p.id === 'pubg-mobile-uc') || products[0];

  const handleCategorySelect = (catId) => {
    if (catId === 'all') {
      navigate('/products');
    } else {
      navigate(`/products?category=${catId}`);
    }
  };

  return (
    <div className="space-y-10 pb-12">

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950/80 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kurdistan & Iraq #1 Digital Store</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Level Up Your Gaming Experience with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Instant Digital Codes</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Buy official PUBG Mobile UC, Free Fire Diamonds, Steam Wallet Cards, PlayStation Plus, Xbox Keys, and Subscriptions with direct local Iraq payment support.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/products?category=mobile"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/20 transition-all active:scale-95 flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Instant Top-Up Now</span>
              </Link>

              <Link
                to="/products"
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm transition-all"
              >
                Browse Full Catalog
              </Link>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 max-w-lg">
              <div>
                <span className="block text-lg font-black text-cyan-400">100%</span>
                <span className="text-[11px] text-slate-400 font-medium">Safe & Official</span>
              </div>
              <div>
                <span className="block text-lg font-black text-cyan-400">&lt; 3 Mins</span>
                <span className="text-[11px] text-slate-400 font-medium">Instant Delivery</span>
              </div>
              <div>
                <span className="block text-lg font-black text-cyan-400">Local Pay</span>
                <span className="text-[11px] text-slate-400 font-medium">FastPay & Korek</span>
              </div>
            </div>
          </div>

          {/* Hero Feature Box */}
          {heroProduct && (
            <div className="lg:col-span-5">
              <div className="bg-[#0a0e1a]/90 p-5 rounded-2xl border border-cyan-500/30 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-3 right-3 z-20">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-rose-600 text-white shadow-md">
                    Featured Item
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="h-44 rounded-xl overflow-hidden bg-slate-900 relative">
                    <img
                      src={heroProduct.image || ''}
                      alt={heroProduct.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-transparent" />
                  </div>

                  <div>
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                      {heroProduct.platform} &bull; {heroProduct.type}
                    </span>
                    <h3 className="text-lg font-black text-white mt-0.5">{heroProduct.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {heroProduct.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase">Starting From</span>
                      <p className="text-base font-extrabold text-cyan-400">
                        {heroProduct.price ? `${heroProduct.price.toLocaleString()} IQD` : ''}
                      </p>
                    </div>

                    <Link
                      to={`/product/${heroProduct.slug || heroProduct.id}`}
                      className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Category Row */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Browse Categories
        </h3>
        <CategoryTabs selectedCategory="all" onSelectCategory={handleCategorySelect} />
      </section>

      {/* Flash Deals Section */}
      {flashDeals.length > 0 && (
        <ProductSection
          title="Flash Deals"
          subtitle="Limited time discounts on top gaming credits & codes"
          products={flashDeals.slice(0, 4)}
          viewAllLink="/products?filter=flash"
          icon={Flame}
        />
      )}

      {/* Top Sales */}
      <ProductSection
        title="Top Sales"
        subtitle="Most popular items bought by Kurdistan & Iraq gamers"
        products={topSales}
        viewAllLink="/products"
        icon={TrendingUp}
      />

      {/* Coming Soon Teaser */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-950 border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-950 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
            <Clock className="w-6 h-6 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Coming Soon: Steam Deck & Console Bundles</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              We are adding physical gaming gear, gift code pre-orders, and tournament tickets soon!
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/products')}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold whitespace-nowrap border border-slate-700 transition-colors shrink-0"
        >
          Stay Updated
        </button>
      </section>

      {/* New & Trending */}
      <ProductSection
        title="New & Trending"
        subtitle="Newly updated packages and trending releases"
        products={trendingProducts}
        viewAllLink="/products"
        icon={Sparkles}
      />

      {/* Top Rated */}
      <ProductSection
        title="Top Rated Products"
        subtitle="Highest customer satisfaction rating (4.9/5.0)"
        products={topRatedProducts}
        viewAllLink="/products"
        icon={Star}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Gaming Top-Ups"
        subtitle="PUBG UC, Free Fire, Mobile Legends, Robux & CODM Points"
        products={mobileTopUps}
        viewAllLink="/products?category=mobile"
        icon={Smartphone}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Section"
        subtitle="Official Steam keys, Valorant VP, and popular PC titles"
        products={pcProducts}
        viewAllLink="/products?platform=PC"
        icon={Gamepad2}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Section"
        subtitle="PSN Gift Cards, PlayStation Plus, and PS5 digital games"
        products={psProducts}
        viewAllLink="/products?platform=PlayStation"
        icon={Tv}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Section"
        subtitle="Xbox Game Pass, Xbox Live Cards, and digital Xbox titles"
        products={xboxProducts}
        viewAllLink="/products?platform=Xbox"
        icon={Gamepad}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Digital Gift Cards"
        subtitle="Steam Wallet, iTunes, Google Play, Razer Gold, and Amazon Cards"
        products={giftCards}
        viewAllLink="/products?category=giftcards"
        icon={CreditCard}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify, and Telegram Premium"
        products={subscriptions}
        viewAllLink="/products?category=subscriptions"
        icon={Sparkles}
      />

    </div>
  );
}
