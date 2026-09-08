import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Zap,
  Flame,
  Star,
  Clock,
  TrendingUp,
  Gamepad2,
  Gamepad,
  Monitor,
  Smartphone,
  CreditCard,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { CategoryTabs } from '../components/CategoryTabs';
import { ProductSection } from '../components/ProductSection';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const { products } = useProducts();
  const navigate = useNavigate();
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('all');

  const handleCategorySelect = (catId) => {
    setSelectedCategoryTab(catId);
    if (catId !== 'all') {
      navigate(`/products?category=${catId}`);
    }
  };

  // Filtered lists for Home page sections
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const trendingProducts = products.filter((p) => p.isTrending);
  const topRatedProducts = products.filter((p) => p.isTopRated);
  const topSalesProducts = [...products].sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0)).slice(0, 8);

  const xboxProducts = products.filter((p) => p.category === 'xbox' || p.platform === 'Xbox');
  const playstationProducts = products.filter((p) => p.category === 'playstation' || p.platform === 'PlayStation');
  const pcProducts = products.filter((p) => p.category === 'pc' || p.platform === 'PC');
  const mobileProducts = products.filter((p) => p.category === 'mobile' || p.platform === 'Mobile');
  const giftCardProducts = products.filter((p) => p.category === 'giftcards' || p.platform === 'Gift Card');
  const subscriptionProducts = products.filter((p) => p.category === 'subscriptions' || p.platform === 'Service');

  // Hero featured product
  const heroProduct = products.find((p) => p.id === 'black-myth-wukong') || products[0];

  return (
    <div className="space-y-12 pb-16">

      {/* 1. HERO / FEATURED BANNER SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1224] via-[#080d1a] to-[#12082b] border border-slate-800/80 p-6 sm:p-10 shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Official Gaming Digital Store • Kurdistan & Iraq</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none">
              Level Up Your Game <br />
              With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">Instant Delivery</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Buy PC & Console Games, PUBG UC, Valorant VP, Free Fire Diamonds, PSN Cards, Steam Wallets, and Discord Nitro with local Kurdish payment methods.
            </p>

            {/* Quick Stats Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-md">
              <div className="bg-[#0b1326]/80 p-3 rounded-2xl border border-slate-800">
                <span className="text-lg font-black text-cyan-400 block">100%</span>
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Legal Keys</span>
              </div>
              <div className="bg-[#0b1326]/80 p-3 rounded-2xl border border-slate-800">
                <span className="text-lg font-black text-blue-400 block">&lt; 5 Mins</span>
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Instant Delivery</span>
              </div>
              <div className="bg-[#0b1326]/80 p-3 rounded-2xl border border-slate-800">
                <span className="text-lg font-black text-purple-400 block">FastPay</span>
                <span className="text-[11px] text-slate-400 font-semibold uppercase">& Korek Accepted</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/products"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-sm shadow-xl shadow-cyan-950/50 flex items-center gap-2 transition-all active:scale-95"
              >
                <span>Browse Store Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products?category=mobile"
                className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-700 transition-colors"
              >
                Mobile Top-Ups
              </Link>
            </div>
          </div>

          {/* Hero Highlight Card */}
          {heroProduct && (
            <div className="lg:col-span-5">
              <div className="relative bg-[#0b1120] rounded-2xl border border-slate-700/80 p-4 shadow-2xl group hover:border-cyan-500/50 transition-colors">
                <div className="absolute top-6 left-6 z-20">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/90 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg">
                    HOT RELEASE
                  </span>
                </div>

                <div className="overflow-hidden rounded-xl h-56 mb-4 relative">
                  {heroProduct.image ? (
                    <img
                      src={heroProduct.image}
                      alt={heroProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-cyan-400 font-bold">
                      {heroProduct.name}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-transparent" />
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                    {heroProduct.platform} • {heroProduct.type}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{heroProduct.rating}</span>
                  </div>
                </div>

                <h3 className="text-lg font-black text-white mb-2">{heroProduct.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {heroProduct.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-medium block">Special Price</span>
                    <span className="text-xl font-extrabold text-cyan-300">
                      {heroProduct.price ? `${heroProduct.price.toLocaleString()} IQD` : ''}
                    </span>
                  </div>
                  <Link
                    to={`/product/${heroProduct.slug || heroProduct.id}`}
                    className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 2. CATEGORY ROW */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-cyan-400" />
            <span>Browse Categories</span>
          </h2>
          <Link to="/products" className="text-xs font-bold text-cyan-400 hover:underline">
            View All Categories
          </Link>
        </div>
        <CategoryTabs
          selectedCategory={selectedCategoryTab}
          onSelectCategory={handleCategorySelect}
        />
      </section>

      {/* 3. COMING SOON ANNOUNCEMENT BANNER */}
      <section className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-blue-950/80 rounded-2xl border border-purple-800/40 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <span>Coming Soon: GTA VI Pre-Orders & Special Bundles</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-500/30 text-purple-300">
                Upcoming
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Stay tuned for instant reservation and automated keys arrival on Dano Store.
            </p>
          </div>
        </div>
        <Link
          to="/products"
          className="shrink-0 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition-colors"
        >
          Explore Catalog
        </Link>
      </section>

      {/* 4. FLASH DEALS SECTION */}
      {flashDeals.length > 0 && (
        <ProductSection
          title="Flash Deals"
          subtitle="Limited time discounts on top gaming codes and top-ups."
          badgeText="Hot Sales"
          icon={Flame}
          viewAllLink="/products?filter=flash"
          products={flashDeals}
          limit={4}
        />
      )}

      {/* 5. TOP SALES SECTION */}
      <ProductSection
        title="Top Sales"
        subtitle="Most ordered products by gamers across Erbil, Sulaymaniyah, and Baghdad."
        badgeText="Best Sellers"
        icon={Zap}
        viewAllLink="/products"
        products={topSalesProducts}
        limit={4}
      />

      {/* 6. NEW & TRENDING SECTION */}
      {trendingProducts.length > 0 && (
        <ProductSection
          title="New & Trending"
          subtitle="Discover what's viral in gaming this week."
          badgeText="Trending"
          icon={TrendingUp}
          viewAllLink="/products?filter=trending"
          products={trendingProducts}
          limit={4}
        />
      )}

      {/* 7. TOP RATED SECTION */}
      {topRatedProducts.length > 0 && (
        <ProductSection
          title="Top Rated Games & Services"
          subtitle="Highest customer satisfaction ratings and verified reviews."
          badgeText="5.0 Stars"
          icon={Star}
          viewAllLink="/products?filter=toprated"
          products={topRatedProducts}
          limit={4}
        />
      )}

      {/* 8. XBOX SECTION */}
      {xboxProducts.length > 0 && (
        <ProductSection
          title="Xbox Store"
          subtitle="Xbox Game Pass, console titles, and Xbox gift cards."
          badgeText="Xbox Series X|S"
          icon={Gamepad2}
          viewAllLink="/products?category=xbox"
          products={xboxProducts}
          limit={4}
        />
      )}

      {/* 9. PLAYSTATION SECTION */}
      {playstationProducts.length > 0 && (
        <ProductSection
          title="PlayStation Store"
          subtitle="PS5 & PS4 digital codes and PSN top-up cards."
          badgeText="PS4 & PS5"
          icon={Gamepad}
          viewAllLink="/products?category=playstation"
          products={playstationProducts}
          limit={4}
        />
      )}

      {/* 10. PC GAMING SECTION */}
      {pcProducts.length > 0 && (
        <ProductSection
          title="PC Gaming"
          subtitle="Steam keys, Valorant VP, and PC blockbusters."
          badgeText="Steam / Epic / Riot"
          icon={Monitor}
          viewAllLink="/products?category=pc"
          products={pcProducts}
          limit={4}
        />
      )}

      {/* 11. MOBILE TOP-UPS SECTION */}
      {mobileProducts.length > 0 && (
        <ProductSection
          title="Mobile Top-Ups"
          subtitle="Direct Player ID top-ups for PUBG UC, Free Fire, COD Mobile, and more."
          badgeText="Instant Player ID"
          icon={Smartphone}
          viewAllLink="/products?category=mobile"
          products={mobileProducts}
          limit={4}
        />
      )}

      {/* 12. GIFT CARDS SECTION */}
      {giftCardProducts.length > 0 && (
        <ProductSection
          title="Digital Gift Cards"
          subtitle="Steam Wallet, PlayStation, Xbox, Google Play, and Apple cards."
          badgeText="Instant Codes"
          icon={CreditCard}
          viewAllLink="/products?category=giftcards"
          products={giftCardProducts}
          limit={4}
        />
      )}

      {/* 13. SUBSCRIPTIONS SECTION */}
      {subscriptionProducts.length > 0 && (
        <ProductSection
          title="Digital Subscriptions"
          subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify, Canva, and more."
          badgeText="Pro Upgrades"
          icon={Zap}
          viewAllLink="/products?category=subscriptions"
          products={subscriptionProducts}
          limit={4}
        />
      )}

    </div>
  );
};
