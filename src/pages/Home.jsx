import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductSection from '../components/ProductSection';
import CategoryTabs from '../components/CategoryTabs';
import {
  Gamepad2,
  Zap,
  ShieldCheck,
  Flame,
  Star,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Tag
} from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function Home({ products = [], onAddToCart, onBuyNow }) {
  const navigate = useNavigate();

  const handleSelectCategory = (catId) => {
    if (catId === 'all') {
      navigate('/products');
    } else {
      navigate(`/products?category=${catId}`);
    }
  };

  // Filter products for various featured sections
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
  const topRatedProducts = products.filter((p) => p.isTopRated).slice(0, 4);

  const xboxProducts = products.filter((p) => p.category === 'xbox' || p.platform === 'Xbox').slice(0, 4);
  const psProducts = products.filter((p) => p.category === 'playstation' || p.platform === 'PlayStation').slice(0, 4);
  const pcProducts = products.filter((p) => p.category === 'pc' || p.platform === 'PC').slice(0, 4);
  const mobileProducts = products.filter((p) => p.category === 'mobile' || p.platform === 'Mobile').slice(0, 4);
  const giftCardProducts = products.filter((p) => p.category === 'gift-cards' || p.platform === 'Gift Card').slice(0, 4);
  const subscriptionProducts = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  return (
    <div className="space-y-12 pb-16">
      {/* HERO SECTION */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-800/80 bg-gradient-to-r from-[#070b19] via-[#09112a] to-[#0d071d] p-6 md:p-12 shadow-2xl">
        {/* Decorative Ambient Lights */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-extrabold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Official Gaming Hub Kurdistan & Iraq</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Level Up Your Game With{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
              Dano Store
            </span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Get instant PUBG UC, Free Fire Diamonds, Steam Wallet Cards, Discord Nitro, and official paid games. Manual FastPay, Korek & MasterCard checkout.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/products"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-cyan-600/25 flex items-center gap-2 transition-all"
            >
              <span>Explore All Store</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/products?category=mobile"
              className="px-6 py-3 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-cyan-500 text-xs sm:text-sm font-bold rounded-xl transition-all"
            >
              PUBG UC & Top-Ups
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES ROW */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Tag className="w-4 h-4 text-cyan-400" />
          Browse By Category
        </h3>
        <CategoryTabs activeCategory="all" onSelectCategory={handleSelectCategory} />
      </section>

      {/* FEATURED HERO PRODUCTS ROW */}
      <ProductSection
        title="Featured Offers"
        subtitle="Hand-picked top gaming packages and digital codes"
        linkTo="/products"
        products={featuredProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* COMING SOON SECTION */}
      <section className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-blue-950/40 border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-purple-900/60 text-purple-300 border border-purple-500/40 text-[11px] font-extrabold uppercase">
              <Clock className="w-3 h-3" />
              <span>Upcoming Releases</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              GTA VI & Monster Hunter Wilds - Pre-Orders Opening Soon
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Stay tuned! Dano Store will offer instant pre-order digital activation keys for upcoming global AAA blockbusters.
            </p>
          </div>

          <Link
            to="/products"
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/30 shrink-0"
          >
            Browse Catalog
          </Link>
        </div>
      </section>

      {/* TOP SALES */}
      <ProductSection
        title="Top Sales"
        subtitle="Most popular items bought by Kurdistan gamers"
        linkTo="/products"
        products={products.slice(0, 4)}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* FLASH DEALS */}
      <section className="bg-[#090e1c] border border-cyan-500/30 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-rose-500 animate-bounce" />
            <div>
              <h2 className="text-xl font-black text-white">Flash Deals</h2>
              <p className="text-xs text-slate-400">Limited time discounts up to 50% OFF</p>
            </div>
          </div>
          <Link to="/products" className="text-xs font-bold text-cyan-400 hover:text-cyan-300">
            View All Deals &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {flashDeals.map((product) => (
            <ProductSection
              key={product.id}
              products={[product]}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      </section>

      {/* NEW & TRENDING */}
      <ProductSection
        title="New & Trending"
        subtitle="Hot digital codes trending right now"
        linkTo="/products"
        products={trendingProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* TOP RATED */}
      <ProductSection
        title="Top Rated Games & Services"
        subtitle="Rated 4.8+ by satisfied buyers"
        linkTo="/products"
        products={topRatedProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* CATEGORY SPECIFIC SECTIONS */}
      <ProductSection
        title="PC Gaming"
        subtitle="Steam keys, Valorant VP, and AAA titles"
        linkTo="/products?category=pc"
        products={pcProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      <ProductSection
        title="Mobile Top-Ups"
        subtitle="PUBG UC, Free Fire, Mobile Legends & CODM"
        linkTo="/products?category=mobile"
        products={mobileProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      <ProductSection
        title="Gift Cards"
        subtitle="Steam, PlayStation, Xbox, iTunes & Google Play"
        linkTo="/products?category=gift-cards"
        products={giftCardProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      <ProductSection
        title="PlayStation"
        subtitle="PSN Gift Cards and PS5 games"
        linkTo="/products?category=playstation"
        products={psProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      <ProductSection
        title="Xbox"
        subtitle="Game Pass & Xbox Live Digital Codes"
        linkTo="/products?category=xbox"
        products={xboxProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      <ProductSection
        title="Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix & Spotify"
        linkTo="/products?category=subscriptions"
        products={subscriptionProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />
    </div>
  );
}
