import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Flame,
  Sparkles,
  Zap,
  Star,
  Gamepad2,
  Smartphone,
  Gift,
  Clock,
  ArrowRight,
  TrendingUp,
  Monitor,
  CheckCircle2,
  Tv
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import CategoryTabs from '../components/CategoryTabs';
import ProductCard from '../components/ProductCard';

export const Home = () => {
  const { products } = useProducts();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    if (catId !== 'all') {
      navigate(`/products?category=${catId}`);
    }
  };

  // Filtered lists for Home sections
  const featuredProducts = products.filter((p) => p.isFeatured && !p.isComingSoon);
  const topSalesProducts = [...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, 4);
  const flashDealsProducts = products.filter((p) => p.isFlashDeal && !p.isComingSoon);
  const trendingProducts = products.filter((p) => p.isTrending && !p.isComingSoon);
  const topRatedProducts = products.filter((p) => p.isTopRated && !p.isComingSoon);
  const comingSoonProducts = products.filter((p) => p.isComingSoon);

  const xboxProducts = products.filter((p) => p.platform === 'Xbox' && !p.isComingSoon);
  const playstationProducts = products.filter((p) => p.platform === 'PlayStation' && !p.isComingSoon);
  const pcProducts = products.filter((p) => p.platform === 'PC' && !p.isComingSoon);
  const mobileTopUps = products.filter((p) => p.category === 'topups' && !p.isComingSoon);
  const giftCards = products.filter((p) => p.category === 'giftcards' && !p.isComingSoon);
  const subscriptions = products.filter((p) => p.category === 'subscriptions' && !p.isComingSoon);

  const heroItem = products.find((p) => p.id === 'pubg-mobile-uc') || products[0];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero / Featured Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950/80 to-slate-950 border border-slate-800 p-6 md:p-12">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} /> Official Gaming Partner in Iraq
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-5xl text-slate-100 leading-tight">
              Top-Up UC, Diamonds & Buy <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Steam Games</span> Instantly
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Dano Store delivers official game codes, PUBG UC, Free Fire Diamonds, PlayStation & Xbox gift cards directly to your device with local FastPay, Korek & MasterCard payments.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                to="/products"
                className="px-6 py-3.5 rounded-2xl font-heading font-extrabold text-sm bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-slate-950 hover:scale-105 transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2"
              >
                <span>Explore Store</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/products?category=topups"
                className="px-6 py-3.5 rounded-2xl font-heading font-bold text-sm bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                <Smartphone size={18} className="text-cyan-400" />
                <span>Mobile Top-Ups</span>
              </Link>
            </div>

            {/* Micro Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 text-xs font-bold text-slate-400">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-400" /> Instant Key Delivery</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-cyan-400" /> FastPay & Korek</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-purple-400" /> 100% Guaranteed</span>
            </div>
          </div>

          {/* Featured Hero Product Display Card */}
          {heroItem && (
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm">
                <div className="text-xs font-bold uppercase text-cyan-400 tracking-wider mb-2 flex items-center gap-1">
                  <Flame size={14} className="text-orange-400" /> Featured Deal of the Day
                </div>
                <ProductCard product={heroItem} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Category Tabs Row */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-extrabold text-lg text-slate-200">Browse Categories</h3>
          <Link to="/products" className="text-xs text-cyan-400 font-bold hover:underline">
            View All Products &rarr;
          </Link>
        </div>
        <CategoryTabs activeCategory={activeCategory} onSelectCategory={handleCategorySelect} />
      </section>

      {/* Coming Soon Section */}
      {comingSoonProducts.length > 0 && (
        <ProductSection
          title="Coming Soon"
          subtitle="Pre-register & get notified when big titles drop"
          icon={Clock}
          badge="Upcoming"
          products={comingSoonProducts}
        />
      )}

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Best selling digital products in Kurdistan this week"
        icon={Flame}
        badge="Hot Seller"
        viewAllLink="/products"
        products={topSalesProducts}
      />

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on top games & gift cards"
        icon={Zap}
        badge="Special Price"
        viewAllLink="/products"
        products={flashDealsProducts}
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="Fresh additions trending among gamers"
        icon={TrendingUp}
        badge="Popular"
        viewAllLink="/products"
        products={trendingProducts}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated"
        subtitle="Highest customer rated games and subscriptions"
        icon={Star}
        badge="5.0 Rating"
        viewAllLink="/products"
        products={topRatedProducts}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming"
        subtitle="Steam keys, GTA V, Elden Ring, and AAA PC titles"
        icon={Monitor}
        badge="Steam & PC"
        viewAllLink="/products?platform=PC"
        products={pcProducts}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Section"
        subtitle="PSN gift cards, Tekken 8, MK11 & PS5 games"
        icon={Gamepad2}
        badge="PS4 / PS5"
        viewAllLink="/products?platform=PlayStation"
        products={playstationProducts}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Section"
        subtitle="Xbox gift cards, Game Pass Ultimate & Forza Horizon 5"
        icon={Tv}
        badge="Xbox One / Series X"
        viewAllLink="/products?platform=Xbox"
        products={xboxProducts}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, Robux, Valorant & COD CP"
        icon={Smartphone}
        badge="Instant Player ID"
        viewAllLink="/products?category=topups"
        products={mobileTopUps}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards"
        subtitle="Steam Wallet, PlayStation, Xbox, Google Play & Apple Cards"
        icon={Gift}
        badge="Global Codes"
        viewAllLink="/products?category=giftcards"
        products={giftCards}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix 4K, Spotify & Canva Pro"
        icon={Sparkles}
        badge="Digital Memberships"
        viewAllLink="/products?category=subscriptions"
        products={subscriptions}
      />
    </div>
  );
};

export default Home;
