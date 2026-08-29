import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Zap,
  Flame,
  Star,
  Clock,
  TrendingUp,
  Gamepad2,
  Tv,
  Gift,
  Smartphone,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import CategoryTabs from '../components/CategoryTabs';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';

export default function Home({ products = [], onAddToCart, onBuyNow }) {
  const navigate = useNavigate();

  // Filtered sections according to flags & categories
  const featuredProducts = products.filter((p) => p.isFeatured && !p.isComingSoon);
  const flashDeals = products.filter((p) => p.isFlashDeal && !p.isComingSoon);
  const trendingProducts = products.filter((p) => p.isTrending && !p.isComingSoon);
  const topRatedProducts = products.filter((p) => p.isTopRated && !p.isComingSoon);
  const topSalesProducts = [...products].sort((a, b) => b.soldCount - a.soldCount).filter(p => !p.isComingSoon);
  const comingSoonProducts = products.filter((p) => p.isComingSoon);

  const xboxProducts = products.filter((p) => p.platform === 'Xbox' && !p.isComingSoon);
  const playStationProducts = products.filter((p) => p.platform === 'PlayStation' && !p.isComingSoon);
  const pcProducts = products.filter((p) => p.platform === 'PC' && !p.isComingSoon);
  const mobileTopUps = products.filter((p) => p.category === 'mobile-topups' && !p.isComingSoon);
  const giftCards = products.filter((p) => p.category === 'gift-cards' && !p.isComingSoon);
  const subscriptions = products.filter((p) => p.category === 'subscriptions' && !p.isComingSoon);

  const handleSelectCategory = (catId) => {
    if (catId === 'all') {
      navigate('/products');
    } else {
      navigate(`/products?category=${catId}`);
    }
  };

  return (
    <div className="space-y-10 pb-12">

      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-r from-slate-950 via-[#0a0e1c] to-slate-950 p-6 sm:p-10 lg:p-14 shadow-2xl">
        {/* Glow ambient lights */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-bold text-xs mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Instant Mobile & Gaming Top-Ups in Kurdistan & Iraq</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Level Up Your Gaming Experience With{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
              Dano Store
            </span>
          </h1>

          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Get instant PUBG UC, Free Fire Diamonds, Steam Games, PSN & Xbox Gift Cards, and Subscriptions. Pay easily via FastPay, Korek, or MasterCard.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/products"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-cyan-600/30 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Explore All Products</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <Link
              to="/products?category=mobile-topups"
              className="px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-bold text-sm transition-all"
            >
              Mobile Top-Ups
            </Link>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section className="space-y-3">
        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Browse By Category</h3>
        <CategoryTabs activeCategory="all" onSelectCategory={handleSelectCategory} />
      </section>

      {/* Featured Banner Cards */}
      {featuredProducts.length > 0 && (
        <ProductSection
          title="Featured Titles & Top-Ups"
          subtitle="Handpicked digital products with immediate local delivery"
          icon={Zap}
          badgeText="Featured"
          viewAllLink="/products"
          products={featuredProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          limit={4}
        />
      )}

      {/* Flash Deals */}
      {flashDeals.length > 0 && (
        <ProductSection
          title="Flash Deals"
          subtitle="Limited time discounts on gaming keys and currency"
          icon={Flame}
          badgeText="Hot Deals"
          viewAllLink="/products"
          products={flashDeals}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          limit={4}
        />
      )}

      {/* New & Trending */}
      {trendingProducts.length > 0 && (
        <ProductSection
          title="New & Trending"
          subtitle="Most popular items bought by gamers across Kurdistan"
          icon={TrendingUp}
          viewAllLink="/products"
          products={trendingProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          limit={4}
        />
      )}

      {/* Top Sales */}
      {topSalesProducts.length > 0 && (
        <ProductSection
          title="Top Sales"
          subtitle="Highest volume sold games and mobile packages"
          icon={Flame}
          viewAllLink="/products"
          products={topSalesProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          limit={4}
        />
      )}

      {/* Top Rated */}
      {topRatedProducts.length > 0 && (
        <ProductSection
          title="Top Rated Products"
          subtitle="Highest customer ratings and verified feedback"
          icon={Star}
          viewAllLink="/products"
          products={topRatedProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          limit={4}
        />
      )}

      {/* Coming Soon Section */}
      {comingSoonProducts.length > 0 && (
        <ProductSection
          title="Coming Soon"
          subtitle="Upcoming unreleased blockbuster titles available for pre-order"
          icon={Clock}
          badgeText="Upcoming"
          viewAllLink="/products"
          products={comingSoonProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          limit={4}
        />
      )}

      {/* Xbox Section */}
      {xboxProducts.length > 0 && (
        <ProductSection
          title="Xbox Gaming"
          subtitle="Xbox Series X|S codes, subscriptions and gift cards"
          icon={Gamepad2}
          viewAllLink="/products?platform=Xbox"
          products={xboxProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          limit={4}
        />
      )}

      {/* PlayStation Section */}
      {playStationProducts.length > 0 && (
        <ProductSection
          title="PlayStation Corner"
          subtitle="PS5 & PS4 digital codes, PSN cards and memberships"
          icon={Tv}
          viewAllLink="/products?platform=PlayStation"
          products={playStationProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          limit={4}
        />
      )}

      {/* PC Gaming Section */}
      {pcProducts.length > 0 && (
        <ProductSection
          title="PC Gaming Store"
          subtitle="Official Steam keys, Riot Points, V-Bucks & PC keys"
          icon={Gamepad2}
          viewAllLink="/products?platform=PC"
          products={pcProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          limit={4}
        />
      )}

      {/* Mobile Top-Ups Section */}
      {mobileTopUps.length > 0 && (
        <ProductSection
          title="Mobile Top-Ups"
          subtitle="PUBG UC, Free Fire Diamonds, Mobile Legends, COD CP"
          icon={Smartphone}
          viewAllLink="/products?category=mobile-topups"
          products={mobileTopUps}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          limit={4}
        />
      )}

      {/* Gift Cards Section */}
      {giftCards.length > 0 && (
        <ProductSection
          title="Gift Cards"
          subtitle="Steam Wallet, PlayStation, Xbox, Google Play, Apple Cards"
          icon={Gift}
          viewAllLink="/products?category=gift-cards"
          products={giftCards}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          limit={4}
        />
      )}

      {/* Subscriptions Section */}
      {subscriptions.length > 0 && (
        <ProductSection
          title="Digital Subscriptions"
          subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify, Canva Pro"
          icon={ShieldCheck}
          viewAllLink="/products?category=subscriptions"
          products={subscriptions}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          limit={4}
        />
      )}

    </div>
  );
}
