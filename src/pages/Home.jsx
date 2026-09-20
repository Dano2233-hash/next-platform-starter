import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Gamepad2,
  Sparkles,
  Zap,
  ShieldCheck,
  Flame,
  Award,
  Clock,
  ChevronRight,
  Smartphone,
  Gift,
  Monitor,
  Tv
} from 'lucide-react';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';

export const Home = ({ products = [] }) => {
  const navigate = useNavigate();

  // Filter sections
  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const topSales = products.filter((p) => p.soldCount > 2500 || p.isFeatured).slice(0, 4);
  const newTrending = products.filter((p) => p.isTrending).slice(0, 4);
  const topRated = products.filter((p) => p.isTopRated || p.rating >= 4.9).slice(0, 4);

  const xboxGames = products.filter((p) => p.platform === 'xbox').slice(0, 4);
  const playstationGames = products.filter((p) => p.platform === 'playstation').slice(0, 4);
  const pcGames = products.filter((p) => p.category === 'games' && p.platform === 'pc').slice(0, 4);
  const mobileTopups = products.filter((p) => p.category === 'mobile').slice(0, 4);
  const giftCards = products.filter((p) => p.category === 'gift-cards').slice(0, 4);
  const subscriptions = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  return (
    <div className="space-y-12 pb-16">

      {/* HERO SECTION */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-r from-[#0a1128] via-[#0d1636] to-[#120b2e] p-6 sm:p-12 shadow-2xl mt-4">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Official Kurdistan & Iraq Gaming Store
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            INSTANT TOP-UPS, <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              PAID GAMES & GIFT CARDS
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Get instant PUBG Mobile UC, Free Fire Diamonds, Steam Wallet, and full paid PC & Console games delivered immediately. Pay easily using <strong>FastPay</strong>, <strong>Korek Telecom</strong>, or <strong>MasterCard</strong> in local IQD currency.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-slate-950 font-black text-sm shadow-xl shadow-cyan-950 hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4" /> Explore Catalog
            </button>
            <button
              onClick={() => navigate('/products?category=mobile')}
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm transition-all cursor-pointer"
            >
              Mobile Top-Ups
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORY ROW GRID */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Browse Categories
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/products?category=mobile"
            className="p-5 rounded-2xl bg-[#0b1021] border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center gap-3 group"
          >
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-100 text-sm group-hover:text-cyan-400 transition-colors">
                Mobile Top-Ups
              </h4>
              <p className="text-[11px] text-slate-400">UC, Diamonds, VP</p>
            </div>
          </Link>

          <Link
            to="/products?category=games"
            className="p-5 rounded-2xl bg-[#0b1021] border border-slate-800 hover:border-purple-500/50 transition-all flex items-center gap-3 group"
          >
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-100 text-sm group-hover:text-purple-400 transition-colors">
                PC & Console Games
              </h4>
              <p className="text-[11px] text-slate-400">GTA V, RDR2, Elden Ring</p>
            </div>
          </Link>

          <Link
            to="/products?category=gift-cards"
            className="p-5 rounded-2xl bg-[#0b1021] border border-slate-800 hover:border-blue-500/50 transition-all flex items-center gap-3 group"
          >
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-100 text-sm group-hover:text-blue-400 transition-colors">
                Gift Cards
              </h4>
              <p className="text-[11px] text-slate-400">Steam, PSN, Xbox, Google</p>
            </div>
          </Link>

          <Link
            to="/products?category=subscriptions"
            className="p-5 rounded-2xl bg-[#0b1021] border border-slate-800 hover:border-emerald-500/50 transition-all flex items-center gap-3 group"
          >
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <Tv className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-100 text-sm group-hover:text-emerald-400 transition-colors">
                Subscriptions
              </h4>
              <p className="text-[11px] text-slate-400">Discord, YouTube, Netflix</p>
            </div>
          </Link>
        </div>
      </section>

      {/* COMING SOON BANNER */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-900 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-300">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-white text-base">Coming Soon: GTA VI Pre-Orders & Custom Gaming PCs</h4>
            <p className="text-xs text-slate-400">Pre-orders for upcoming 2025 blockbuster releases will be available directly on Dano Store.</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/products')}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold whitespace-nowrap cursor-pointer"
        >
          View Upcoming Titles
        </button>
      </section>

      {/* FLASH DEALS SECTION */}
      {flashDeals.length > 0 && (
        <ProductSection
          title="Flash Deals ⚡"
          subtitle="Limited time discounted prices on top game packages"
          products={flashDeals}
          linkTo="/products"
        />
      )}

      {/* TOP SALES SECTION */}
      <ProductSection
        title="Top Sales 🔥"
        subtitle="Most ordered game packages and top-ups in Kurdistan"
        products={topSales}
        linkTo="/products"
      />

      {/* NEW & TRENDING SECTION */}
      <ProductSection
        title="New & Trending 📈"
        subtitle="Hot releases and popular digital services"
        products={newTrending}
        linkTo="/products"
      />

      {/* TOP RATED SECTION */}
      <ProductSection
        title="Top Rated ⭐"
        subtitle="Highest customer rated digital keys and cards"
        products={topRated}
        linkTo="/products"
      />

      {/* MOBILE TOP-UPS SECTION */}
      <ProductSection
        title="Mobile Top-Ups 📱"
        subtitle="Instant PUBG UC, Free Fire, Valorant VP, and Robux"
        products={mobileTopups}
        linkTo="/products?category=mobile"
      />

      {/* PC GAMING SECTION */}
      <ProductSection
        title="PC Gaming Store 🖥️"
        subtitle="Genuine Steam codes for GTA V, Elden Ring, RDR2, and Black Myth Wukong"
        products={pcGames}
        linkTo="/products?category=games"
      />

      {/* PLAYSTATION SECTION */}
      {playstationGames.length > 0 && (
        <ProductSection
          title="PlayStation Corner 🎮"
          subtitle="PS4 & PS5 digital games and US PSN cards"
          products={playstationGames}
          linkTo="/products?platform=playstation"
        />
      )}

      {/* XBOX SECTION */}
      {xboxGames.length > 0 && (
        <ProductSection
          title="Xbox Gaming 💚"
          subtitle="Xbox Game Pass & Xbox Store digital titles"
          products={xboxGames}
          linkTo="/products?platform=xbox"
        />
      )}

      {/* GIFT CARDS SECTION */}
      <ProductSection
        title="Gift Cards Store 🎁"
        subtitle="Steam, Google Play, PlayStation, Apple, and Razer Gold"
        products={giftCards}
        linkTo="/products?category=gift-cards"
      />

      {/* SUBSCRIPTIONS SECTION */}
      <ProductSection
        title="Digital Subscriptions 📺"
        subtitle="Discord Nitro, YouTube Premium, Netflix 4K, Spotify & Canva Pro"
        products={subscriptions}
        linkTo="/products?category=subscriptions"
      />

    </div>
  );
};

export default Home;
