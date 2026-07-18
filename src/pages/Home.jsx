import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Sparkles, Trophy, Flame, Plus, Gift, CreditCard, Shield } from 'lucide-react';
import CategoryTabs from '../components/CategoryTabs';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';

export default function Home({ products, onAddToCart, onBuyNow }) {
  const navigate = useNavigate();

  // Filter products by tags
  const featured = products.filter((p) => p.isFeatured).slice(0, 1);
  const heroProduct = featured[0] || products[0];

  const comingSoon = products.filter((p) => p.tag === "Coming Soon").slice(0, 4);
  const topSales = products.filter((p) => p.tag === "Top Sales").slice(0, 4);
  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const newTrending = products.filter((p) => p.isTrending || p.tag === "New & Trending").slice(0, 4);
  const topRated = products.filter((p) => p.isTopRated).slice(0, 4);

  // Filter products by section platform/category
  const xboxSection = products.filter((p) => p.platform === "Xbox").slice(0, 4);
  const psSection = products.filter((p) => p.platform === "PlayStation").slice(0, 4);
  const pcSection = products.filter((p) => p.platform === "PC" && p.category === "games").slice(0, 4);
  const mobileTopUps = products.filter((p) => p.category === "mobile").slice(0, 4);
  const giftCards = products.filter((p) => p.category === "giftcards").slice(0, 4);
  const subscriptions = products.filter((p) => p.category === "subscriptions").slice(0, 4);

  const handleCategoryChange = (catId) => {
    if (catId === 'all') {
      navigate('/products');
    } else {
      navigate(`/products?category=${catId}`);
    }
  };

  return (
    <div className="space-y-12">
      {/* 1. HERO / FEATURED SECTION */}
      {heroProduct && (
        <section className="relative overflow-hidden rounded-3xl border border-blue-500/10 bg-[#070b19]/60 backdrop-blur-xl">
          {/* Glowing purple ambient highlight */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-16 items-center">
            {/* Text description */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-800/30 text-xs font-bold text-cyan-400">
                <Sparkles className="h-4 w-4 animate-pulse" />
                <span>FEATURED DIGITAL DEAL</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none uppercase">
                {heroProduct.name}
              </h1>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
                {heroProduct.description}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 rounded-md text-xs font-black bg-black/40 text-cyan-400 border border-cyan-500/20">
                  {heroProduct.platform}
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-black bg-black/40 text-purple-400 border border-purple-500/20">
                  {heroProduct.type}
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-black bg-black/40 text-emerald-400 border border-emerald-500/20">
                  ★ {heroProduct.rating} Rating
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={() => navigate(`/products/${heroProduct.slug}`)}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-black uppercase text-white shadow-lg shadow-cyan-950/50 hover:from-blue-500 hover:to-cyan-400 transition transform hover:-translate-y-0.5 duration-300"
                >
                  <Play className="h-4 w-4 fill-white text-white" />
                  <span>Get Offer Now</span>
                </button>
                <button
                  onClick={() => onAddToCart(heroProduct)}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm font-black uppercase text-gray-300 hover:bg-white/10 transition"
                >
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>

            {/* Visual preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/5 group">
                {heroProduct.image ? (
                  <img
                    src={heroProduct.image}
                    alt={heroProduct.name}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition duration-700"
                  />
                ) : (
                  <div className="w-full h-full p-4 rounded-2xl bg-gradient-to-tr from-[#0c1527] to-[#040813] flex flex-col justify-between border border-white/10">
                    <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">Dano Store Exclusive</span>
                    <span className="text-3xl font-black text-center text-white my-auto">{heroProduct.name}</span>
                    <span className="text-xs text-gray-400 text-center">{heroProduct.platform} • {heroProduct.type}</span>
                  </div>
                )}
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. CATEGORY ROW */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-widest text-cyan-400">Browse Categories</h3>
          <span className="text-[11px] text-gray-500">Fast digital filter</span>
        </div>
        <CategoryTabs activeCategory="all" onCategoryChange={handleCategoryChange} />
      </section>

      {/* 3. COMING SOON */}
      {comingSoon.length > 0 && (
        <ProductSection
          title="Coming Soon"
          subtitle="Pre-order upcoming blockbusters & next-gen digital experiences."
          products={comingSoon}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      )}

      {/* 4. TOP SALES */}
      {topSales.length > 0 && (
        <ProductSection
          title="Top Sales"
          subtitle="Most purchased packages and premium titles by gamers in Iraq."
          products={topSales}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      )}

      {/* 5. FLASH DEALS */}
      {flashDeals.length > 0 && (
        <ProductSection
          title="Flash Deals"
          subtitle="Limited time discounts on gaming items. Buy before price goes up!"
          products={flashDeals}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      )}

      {/* 6. NEW & TRENDING */}
      {newTrending.length > 0 && (
        <ProductSection
          title="New & Trending"
          subtitle="Fresh updates, newly added items, and highly popular releases."
          products={newTrending}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      )}

      {/* 7. TOP RATED */}
      {topRated.length > 0 && (
        <ProductSection
          title="Top Rated"
          subtitle="Unmatched services with the highest ratings and best reviews."
          products={topRated}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      )}

      {/* 8. XBOX SECTION */}
      {xboxSection.length > 0 && (
        <ProductSection
          title="Xbox Section"
          subtitle="Elite keys, subscriptions, and console wallet cards for Xbox."
          products={xboxSection}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          linkTo="/products?platform=Xbox"
        />
      )}

      {/* 9. PLAYSTATION SECTION */}
      {psSection.length > 0 && (
        <ProductSection
          title="PlayStation Section"
          subtitle="Unlock the full power of your PlayStation 4 & 5 consoles."
          products={psSection}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          linkTo="/products?platform=PlayStation"
        />
      )}

      {/* 10. PC GAMING SECTION */}
      {pcSection.length > 0 && (
        <ProductSection
          title="PC Gaming Section"
          subtitle="Sizzling Steam CD keys, premium licenses, and launcher accounts."
          products={pcSection}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          linkTo="/products?platform=PC"
        />
      )}

      {/* 11. MOBILE TOP-UPS SECTION */}
      {mobileTopUps.length > 0 && (
        <ProductSection
          title="Mobile Top-Ups Section"
          subtitle="Recharge PUBG UC, Free Fire Diamonds, CoD Points & more instantly."
          products={mobileTopUps}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          linkTo="/products?category=mobile"
        />
      )}

      {/* 12. GIFT CARDS SECTION */}
      {giftCards.length > 0 && (
        <ProductSection
          title="Gift Cards Section"
          subtitle="Official digital codes for Steam, PSN, Xbox, Google Play & Apple stores."
          products={giftCards}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          linkTo="/products?category=giftcards"
        />
      )}

      {/* 13. SUBSCRIPTIONS SECTION */}
      {subscriptions.length > 0 && (
        <ProductSection
          title="Subscriptions Section"
          subtitle="Get Canva Pro, YouTube Premium, Discord Nitro & Netflix monthly."
          products={subscriptions}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          linkTo="/products?category=subscriptions"
        />
      )}
    </div>
  );
}
