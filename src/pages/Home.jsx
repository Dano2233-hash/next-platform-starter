import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Flame,
  Zap,
  TrendingUp,
  Star,
  Clock,
  Gamepad2,
  Tv,
  Smartphone,
  CreditCard,
  ShieldCheck,
  CheckCircle,
  ChevronRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';
import ProductImage from '../components/ProductImage';
import CategoryTabs from '../components/CategoryTabs';
import { useProducts } from '../hooks/useProducts';

export default function Home() {
  const { products } = useProducts();

  // Filter products for various sections
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const topSalesProducts = products.slice().sort((a, b) => b.soldCount - a.soldCount).slice(0, 4);
  const flashDealsProducts = products.filter((p) => p.isFlashDeal || p.oldPrice > p.price).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
  const topRatedProducts = products.filter((p) => p.isTopRated || p.rating >= 4.9).slice(0, 4);

  // Platform & Category specific sections
  const xboxProducts = products.filter((p) => p.platform === 'xbox').slice(0, 4);
  const playstationProducts = products.filter((p) => p.platform === 'playstation').slice(0, 4);
  const pcProducts = products.filter((p) => p.platform === 'pc').slice(0, 4);
  const mobileProducts = products.filter((p) => p.platform === 'mobile' || p.category === 'mobile-topups').slice(0, 4);
  const giftCardProducts = products.filter((p) => p.category === 'gift-cards' || p.platform === 'gift-card').slice(0, 4);
  const subscriptionProducts = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  // Hero main item (e.g. PUBG UC or Black Myth: Wukong or Elden Ring)
  const heroItem = products.find((p) => p.id === 'pubg-mobile-uc') || products[0];

  return (
    <div className="min-h-screen bg-[#05070f] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-cyan-900/80 via-blue-900/80 to-purple-900/80 border-b border-cyan-500/20 py-2 px-4 text-center text-xs font-semibold text-cyan-200">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>Instant Digital Delivery in Kurdistan & Iraq! FastPay, Korek & MasterCard accepted.</span>
        </div>
      </div>

      {/* Navbar */}
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12 my-6">
        {/* Category Filter Bar */}
        <div className="bg-[#080c19] border border-slate-800/80 p-3 rounded-2xl">
          <CategoryTabs
            selectedCategory="all"
            onSelectCategory={(catId) => {
              if (catId === 'all') window.location.href = '/products';
              else window.location.href = `/products?category=${catId}`;
            }}
          />
        </div>

        {/* Hero Banner Section */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0a0f1d] via-[#11182d] to-[#080d19] border border-slate-800 p-6 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>KURDISTAN #1 GAMING STORE</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight leading-none">
                Power Up Your Gaming with <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">Dano Store</span>
              </h1>

              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Get instant game keys, PUBG UC, Free Fire Diamonds, Steam Wallets, and Digital Subscriptions at unbeatable IQD prices. Fast, secure, and hassle-free.
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                  <p className="text-lg font-extrabold text-cyan-400">100%</p>
                  <p className="text-[11px] text-slate-400 font-semibold">Official Keys</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                  <p className="text-lg font-extrabold text-cyan-400">Instant</p>
                  <p className="text-[11px] text-slate-400 font-semibold">Fast Delivery</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                  <p className="text-lg font-extrabold text-purple-400">IQD Only</p>
                  <p className="text-[11px] text-slate-400 font-semibold">Local Payments</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/products"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-extrabold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
                >
                  <span>Explore Catalog</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/products?category=mobile-topups"
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm transition-all"
                >
                  PUBG & Mobile UC
                </Link>
              </div>
            </div>

            {/* Hero Right Featured Item Showcase */}
            {heroItem && (
              <div className="lg:col-span-5">
                <div className="bg-[#0d1322] border border-slate-700/80 rounded-2xl p-5 shadow-2xl relative group">
                  <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                    HOT PICK
                  </div>
                  <ProductImage
                    src={heroItem.image}
                    alt={heroItem.name}
                    category={heroItem.category}
                    platform={heroItem.platform}
                    className="h-56 rounded-xl"
                  />
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-bold text-cyan-400 uppercase">{heroItem.type}</span>
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" /> {heroItem.rating}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-100">{heroItem.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{heroItem.description}</p>
                    <div className="pt-2 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase block">Starting at</span>
                        <span className="text-xl font-black text-cyan-400">
                          {heroItem.price.toLocaleString()} IQD
                        </span>
                      </div>
                      <Link
                        to={`/products/${heroItem.slug || heroItem.id}`}
                        className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition-colors"
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

        {/* Coming Soon Section */}
        <section className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-blue-950/40 border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-400 shrink-0">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-purple-400 uppercase tracking-widest">Upcoming Title</span>
                <h3 className="text-lg font-bold text-slate-100">GTA VI & Monster Hunter Wilds</h3>
                <p className="text-xs text-slate-400">Pre-orders opening soon on Dano Store with special Kurdistan launch discounts.</p>
              </div>
            </div>
            <Link
              to="/products"
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs whitespace-nowrap transition-colors"
            >
              Notify Me
            </Link>
          </div>
        </section>

        {/* Top Sales Section */}
        <ProductSection
          title="Top Sales"
          subtitle="Most purchased products by gamers in Kurdistan & Iraq"
          icon={Flame}
          viewAllLink="/products?sort=popular"
          products={topSalesProducts}
        />

        {/* Flash Deals Section */}
        <ProductSection
          title="Flash Deals"
          subtitle="Limited time discounts on top game keys & top-ups"
          icon={Zap}
          viewAllLink="/products?filter=flash"
          products={flashDealsProducts}
        />

        {/* New & Trending Section */}
        <ProductSection
          title="New & Trending"
          subtitle="Latest released games and high-demand game currencies"
          icon={TrendingUp}
          viewAllLink="/products?filter=trending"
          products={trendingProducts}
        />

        {/* Top Rated Section */}
        <ProductSection
          title="Top Rated"
          subtitle="Highest rated digital items as reviewed by our customers"
          icon={Star}
          viewAllLink="/products?filter=top-rated"
          products={topRatedProducts}
        />

        {/* Xbox Section */}
        <ProductSection
          title="Xbox Games & Cards"
          subtitle="Xbox Game Pass, Xbox Live Gift Cards, and Xbox Titles"
          icon={Gamepad2}
          viewAllLink="/products?platform=xbox"
          products={xboxProducts}
        />

        {/* PlayStation Section */}
        <ProductSection
          title="PlayStation Network"
          subtitle="PSN Gift Cards, PlayStation Plus, and PS4/PS5 Games"
          icon={Gamepad2}
          viewAllLink="/products?platform=playstation"
          products={playstationProducts}
        />

        {/* PC Gaming Section */}
        <ProductSection
          title="PC Gaming"
          subtitle="Steam keys, Valorant VP, and PC Master Race blockbusters"
          icon={Tv}
          viewAllLink="/products?platform=pc"
          products={pcProducts}
        />

        {/* Mobile Top-Ups Section */}
        <ProductSection
          title="Mobile Top-Ups"
          subtitle="PUBG UC, Free Fire Diamonds, Robux, COD CP, and MLBB"
          icon={Smartphone}
          viewAllLink="/products?category=mobile-topups"
          products={mobileProducts}
        />

        {/* Gift Cards Section */}
        <ProductSection
          title="Gift Cards"
          subtitle="Steam, Google Play, Apple, Razer Gold, and Nintendo eShop"
          icon={CreditCard}
          viewAllLink="/products?category=gift-cards"
          products={giftCardProducts}
        />

        {/* Subscriptions Section */}
        <ProductSection
          title="Digital Subscriptions"
          subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify, and Canva Pro"
          icon={Zap}
          viewAllLink="/products?category=subscriptions"
          products={subscriptionProducts}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
