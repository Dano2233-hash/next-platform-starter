import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts.jsx';
import ProductSection from '../components/ProductSection.jsx';
import ProductCard from '../components/ProductCard.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import {
  Gamepad2,
  Smartphone,
  CreditCard,
  Sparkles,
  Zap,
  Flame,
  Star,
  Clock,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Layers
} from 'lucide-react';

export const Home = () => {
  const { products } = useProducts();

  // Filter sections data
  const featuredProducts = products.filter((p) => p.isFeatured && !p.isComingSoon).slice(0, 4);
  const flashDeals = products.filter((p) => p.isFlashDeal && !p.isComingSoon).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending && !p.isComingSoon).slice(0, 4);
  const topRatedProducts = products.filter((p) => p.isTopRated && !p.isComingSoon).slice(0, 4);
  const comingSoonProducts = products.filter((p) => p.isComingSoon).slice(0, 4);

  // Platform specific sections
  const xboxProducts = products.filter((p) => p.platform === 'Xbox' && !p.isComingSoon).slice(0, 4);
  const playStationProducts = products.filter((p) => p.platform === 'PlayStation' && !p.isComingSoon).slice(0, 4);
  const pcProducts = products.filter((p) => p.platform === 'PC' && !p.isComingSoon).slice(0, 4);

  // Category specific sections
  const mobileTopUps = products.filter((p) => p.category === 'Mobile Top-Ups' && !p.isComingSoon).slice(0, 4);
  const giftCards = products.filter((p) => p.category === 'Gift Cards' && !p.isComingSoon).slice(0, 4);
  const subscriptions = products.filter((p) => p.category === 'Subscriptions' && !p.isComingSoon).slice(0, 4);

  const heroBanner = featuredProducts[0] || products[0];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#070e24] via-[#0b173a] to-[#0d0a28] border border-gray-800 p-6 md:p-10 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/80 border border-cyan-800/60 rounded-full text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Kurdistan & Iraq #1 Digital Gaming Store</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Instant Top-Ups, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Gift Cards & Games</span>
            </h1>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl">
              Buy PUBG UC, Free Fire Diamonds, Steam Wallet, PlayStation Cards, and PC Games instantly using local payment methods: FastPay, Korek & MasterCard.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/products"
                className="px-6 py-3.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-gray-950 font-black text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 group"
              >
                <span>Browse Store Catalog</span>
                <ChevronRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/products?category=Mobile Top-Ups"
                className="px-6 py-3.5 bg-[#091024] hover:bg-[#0f1b3d] border border-gray-700 text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2"
              >
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span>Mobile Top-Ups</span>
              </Link>
            </div>

            {/* Micro value badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-800/80 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-gray-300">100% Guaranteed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-gray-300">Instant Code</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-gray-300">IQD Pricing</span>
              </div>
            </div>
          </div>

          {/* Hero Featured Card */}
          {heroBanner && (
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                  <Flame className="w-4 h-4 text-amber-400 fill-amber-400" /> Featured Item
                </div>
                <ProductCard product={heroBanner} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Category Icons Bar */}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <Link
          to="/products?category=Mobile Top-Ups"
          className="p-4 rounded-2xl bg-[#080d1e] border border-gray-800 hover:border-cyan-500/50 transition-all flex flex-col items-center text-center space-y-2 group hover:-translate-y-1"
        >
          <div className="p-3 bg-cyan-950 text-cyan-400 rounded-xl group-hover:scale-110 transition-transform">
            <Smartphone className="w-6 h-6" />
          </div>
          <span className="text-xs font-extrabold text-white">Mobile Top-Ups</span>
        </Link>

        <Link
          to="/products?category=Gift Cards"
          className="p-4 rounded-2xl bg-[#080d1e] border border-gray-800 hover:border-purple-500/50 transition-all flex flex-col items-center text-center space-y-2 group hover:-translate-y-1"
        >
          <div className="p-3 bg-purple-950 text-purple-400 rounded-xl group-hover:scale-110 transition-transform">
            <CreditCard className="w-6 h-6" />
          </div>
          <span className="text-xs font-extrabold text-white">Gift Cards</span>
        </Link>

        <Link
          to="/products?category=Games"
          className="p-4 rounded-2xl bg-[#080d1e] border border-gray-800 hover:border-emerald-500/50 transition-all flex flex-col items-center text-center space-y-2 group hover:-translate-y-1"
        >
          <div className="p-3 bg-emerald-950 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <span className="text-xs font-extrabold text-white">Paid Games</span>
        </Link>

        <Link
          to="/products?category=Subscriptions"
          className="p-4 rounded-2xl bg-[#080d1e] border border-gray-800 hover:border-blue-500/50 transition-all flex flex-col items-center text-center space-y-2 group hover:-translate-y-1"
        >
          <div className="p-3 bg-blue-950 text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-xs font-extrabold text-white">Subscriptions</span>
        </Link>

        <Link
          to="/products?platform=PlayStation"
          className="p-4 rounded-2xl bg-[#080d1e] border border-gray-800 hover:border-indigo-500/50 transition-all flex flex-col items-center text-center space-y-2 group hover:-translate-y-1"
        >
          <div className="p-3 bg-indigo-950 text-indigo-400 rounded-xl group-hover:scale-110 transition-transform">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <span className="text-xs font-extrabold text-white">PlayStation</span>
        </Link>

        <Link
          to="/products?category=Others"
          className="p-4 rounded-2xl bg-[#080d1e] border border-gray-800 hover:border-amber-500/50 transition-all flex flex-col items-center text-center space-y-2 group hover:-translate-y-1"
        >
          <div className="p-3 bg-amber-950 text-amber-400 rounded-xl group-hover:scale-110 transition-transform">
            <Layers className="w-6 h-6" />
          </div>
          <span className="text-xs font-extrabold text-white">Others</span>
        </Link>
      </section>

      {/* Flash Deals Section */}
      {flashDeals.length > 0 && (
        <ProductSection
          title="Flash Deals"
          subtitle="Limited time special discounts on top gaming products"
          products={flashDeals}
          linkTo="/products"
          icon={Flame}
        />
      )}

      {/* New & Trending Section */}
      {trendingProducts.length > 0 && (
        <ProductSection
          title="New & Trending"
          subtitle="Most popular items right now among Kurdistan & Iraq gamers"
          products={trendingProducts}
          linkTo="/products"
          icon={TrendingUp}
        />
      )}

      {/* Top Rated Section */}
      {topRatedProducts.length > 0 && (
        <ProductSection
          title="Top Rated Products"
          subtitle="Highest customer satisfaction and positive reviews"
          products={topRatedProducts}
          linkTo="/products"
          icon={Star}
        />
      )}

      {/* Mobile Top-Ups Section */}
      {mobileTopUps.length > 0 && (
        <ProductSection
          title="Mobile Game Top-Ups"
          subtitle="PUBG UC, Free Fire Diamonds, Valorant Points & Robux"
          products={mobileTopUps}
          linkTo="/products?category=Mobile Top-Ups"
          icon={Smartphone}
        />
      )}

      {/* PC Gaming Section */}
      {pcProducts.length > 0 && (
        <ProductSection
          title="PC Gaming & Steam Keys"
          subtitle="GTA V, Elden Ring, Red Dead Redemption 2, and more"
          products={pcProducts}
          linkTo="/products?platform=PC"
          icon={Gamepad2}
        />
      )}

      {/* PlayStation Section */}
      {playStationProducts.length > 0 && (
        <ProductSection
          title="PlayStation Store"
          subtitle="PSN Gift Cards and digital PlayStation titles"
          products={playStationProducts}
          linkTo="/products?platform=PlayStation"
          icon={Gamepad2}
        />
      )}

      {/* Xbox Section */}
      {xboxProducts.length > 0 && (
        <ProductSection
          title="Xbox Store"
          subtitle="Xbox Gift Cards and Forza Horizon 5"
          products={xboxProducts}
          linkTo="/products?platform=Xbox"
          icon={Gamepad2}
        />
      )}

      {/* Gift Cards Section */}
      {giftCards.length > 0 && (
        <ProductSection
          title="Digital Gift Cards"
          subtitle="Steam Wallet, Google Play, Apple, Razer Gold & Amazon"
          products={giftCards}
          linkTo="/products?category=Gift Cards"
          icon={CreditCard}
        />
      )}

      {/* Subscriptions Section */}
      {subscriptions.length > 0 && (
        <ProductSection
          title="Digital Subscriptions"
          subtitle="Discord Nitro, YouTube Premium, Spotify & Canva Pro"
          products={subscriptions}
          linkTo="/products?category=Subscriptions"
          icon={Sparkles}
        />
      )}

      {/* Coming Soon Section */}
      {comingSoonProducts.length > 0 && (
        <ProductSection
          title="Coming Soon"
          subtitle="Upcoming blockbusters arriving soon at Dano Store"
          products={comingSoonProducts}
          linkTo="/products"
          icon={Clock}
        />
      )}
    </div>
  );
};

export default Home;
