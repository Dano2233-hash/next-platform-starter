import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductSection } from '../components/ProductSection';
import { CategoryTabs } from '../components/CategoryTabs';
import {
  Flame,
  Zap,
  TrendingUp,
  Star,
  Gamepad2,
  Smartphone,
  CreditCard,
  Sparkles,
  ShieldCheck,
  Headphones,
  Clock,
  ArrowRight,
  Gift
} from 'lucide-react';

export function Home({ products = [], onAddToCart, onBuyNow }) {
  const navigate = useNavigate();

  // Filter products by tags and platforms
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);
  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 5);
  const topSales = products.slice().sort((a, b) => b.soldCount - a.soldCount).slice(0, 5);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 5);
  const topRatedProducts = products.filter((p) => p.isTopRated).slice(0, 5);

  const xboxProducts = products.filter((p) => p.platform === 'Xbox').slice(0, 5);
  const playstationProducts = products.filter((p) => p.platform === 'PlayStation').slice(0, 5);
  const pcProducts = products.filter((p) => p.platform === 'PC').slice(0, 5);
  const mobileProducts = products.filter((p) => p.category === 'top-up' || p.platform === 'Mobile').slice(0, 5);
  const giftCardProducts = products.filter((p) => p.category === 'gift-cards').slice(0, 5);
  const subscriptionProducts = products.filter((p) => p.category === 'subscriptions').slice(0, 5);

  const handleCategorySelect = (catId) => {
    if (catId === 'all') {
      navigate('/products');
    } else {
      navigate(`/products?category=${catId}`);
    }
  };

  return (
    <div className="space-y-12 pb-12">
      {/* HERO / FEATURED BANNER SECTION */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 border border-slate-800/80 shadow-2xl p-6 sm:p-10 lg:p-12 my-4">
        {/* Decorative Grid & Glow Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs font-extrabold shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400 animate-pulse" />
              <span>KURDISTAN & IRAQ #1 DIGITAL GAMING STORE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Instant Game Top-Ups & <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Digital Store Codes
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Get official PUBG UC, Free Fire Diamonds, Steam Keys, PlayStation & Xbox Cards, and Premium Subscriptions instantly with local payments via <span className="text-cyan-400 font-bold">FastPay, Korek, & MasterCard</span>.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/products"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-sm px-6 py-3.5 rounded-xl shadow-xl shadow-cyan-950/50 flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Gamepad2 className="w-5 h-5" />
                <span>Explore Store</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/products?category=top-up"
                className="bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all cursor-pointer"
              >
                Mobile Top-Ups
              </Link>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-semibold">24/7 Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold">100% Legal</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Headphones className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="font-semibold">Live Support</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card / Quick Highlight */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-[#090d16]/90 border border-cyan-500/30 rounded-2xl p-5 shadow-2xl relative space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Flame className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                  Top Best Sellers
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">
                  IQD Currency
                </span>
              </div>

              <div className="space-y-3">
                {products.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                        <img
                          src={item.image || 'fallback'}
                          alt={item.name}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 capitalize">{item.platform} • {item.type}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-cyan-400 block">From {item.price.toLocaleString()} IQD</span>
                      <span className="text-[10px] text-amber-400 font-bold">★ {item.rating}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/products?tag=hot"
                className="block text-center text-xs font-extrabold text-cyan-400 hover:text-cyan-300 bg-slate-900 py-2.5 rounded-xl border border-slate-800 transition-colors"
              >
                View Full Catalog →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY ROW */}
      <section className="my-8">
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Quick Navigation</h2>
        </div>
        <CategoryTabs activeCategory="all" onSelectCategory={handleCategorySelect} />
      </section>

      {/* COMING SOON BANNER */}
      <section className="bg-gradient-to-r from-purple-950/60 via-slate-900 to-cyan-950/60 border border-purple-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-extrabold text-purple-400 tracking-widest">Upcoming Releases</span>
            <h3 className="text-lg font-extrabold text-white">GTA VI & Monster Hunter Wilds Pre-Orders Coming Soon!</h3>
            <p className="text-xs text-slate-300">Stay tuned for official Kurdistan pre-orders with guaranteed fast activation.</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/products')}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shrink-0 cursor-pointer"
        >
          Explore Available Games
        </button>
      </section>

      {/* FLASH DEALS SECTION */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on top games and currency packages"
        icon={Zap}
        viewAllLink="/products?filter=flash"
        products={flashDeals}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* TOP SALES SECTION */}
      <ProductSection
        title="Top Sales"
        subtitle="Most purchased products by Kurdish & Iraqi gamers"
        icon={Flame}
        viewAllLink="/products"
        products={topSales}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* NEW & TRENDING */}
      <ProductSection
        title="New & Trending"
        subtitle="Recently added game titles and trending top-ups"
        icon={TrendingUp}
        viewAllLink="/products"
        products={trendingProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* TOP RATED */}
      <ProductSection
        title="Top Rated"
        subtitle="5-Star highly rated digital games & gift vouchers"
        icon={Star}
        viewAllLink="/products"
        products={topRatedProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* MOBILE TOP-UPS SECTION */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, MLBB, CODM CP & more"
        icon={Smartphone}
        viewAllLink="/products?category=top-up"
        products={mobileProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* PC GAMING SECTION */}
      <ProductSection
        title="PC Gaming"
        subtitle="Original Steam keys, GTA V, Elden Ring, RDR2 & Valorant Points"
        icon={Gamepad2}
        viewAllLink="/products?platform=PC"
        products={pcProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* PLAYSTATION SECTION */}
      <ProductSection
        title="PlayStation"
        subtitle="PSN Gift Cards, Tekken 8, Hogwarts Legacy & PS Plus"
        icon={Gamepad2}
        viewAllLink="/products?platform=PlayStation"
        products={playstationProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* XBOX SECTION */}
      <ProductSection
        title="Xbox Section"
        subtitle="Xbox Gift Cards & Forza Horizon 5 keys"
        icon={Gamepad2}
        viewAllLink="/products?platform=Xbox"
        products={xboxProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* GIFT CARDS SECTION */}
      <ProductSection
        title="Gift Cards"
        subtitle="Steam, Google Play, Apple, iTunes, Nintendo & Razer Gold"
        icon={CreditCard}
        viewAllLink="/products?category=gift-cards"
        products={giftCardProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {/* SUBSCRIPTIONS SECTION */}
      <ProductSection
        title="Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify & Canva Pro"
        icon={Sparkles}
        viewAllLink="/products?category=subscriptions"
        products={subscriptionProducts}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />
    </div>
  );
}
