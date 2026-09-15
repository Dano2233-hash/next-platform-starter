import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  TrendingUp,
  Star,
  Zap,
  Gamepad2,
  Smartphone,
  Gift,
  Clock,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

const Home = () => {
  const { products } = useProducts();

  // Filter sections data dynamically
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const topSales = products.filter((p) => p.isFeatured);
  const trending = products.filter((p) => p.isTrending);
  const topRated = products.filter((p) => p.isTopRated);

  const xboxGames = products.filter((p) => p.platform === 'Xbox');
  const psGames = products.filter((p) => p.platform === 'PlayStation');
  const pcGames = products.filter((p) => p.platform === 'PC' && p.category === 'games');
  const mobileTopUps = products.filter((p) => p.category === 'mobile');
  const giftCards = products.filter((p) => p.category === 'gift-cards');
  const subscriptions = products.filter((p) => p.category === 'subscriptions');

  const categoriesOverview = [
    { title: 'Paid PC & Console Games', icon: Gamepad2, link: '/products?category=games', color: 'from-blue-600 to-indigo-600', count: 'Official Keys' },
    { title: 'Mobile Game Top-Ups', icon: Smartphone, link: '/products?category=mobile', color: 'from-purple-600 to-pink-600', count: 'Direct Player ID' },
    { title: 'Digital Gift Cards', icon: Gift, link: '/products?category=gift-cards', color: 'from-cyan-600 to-teal-600', count: 'Instant Codes' },
    { title: 'Premium Subscriptions', icon: Zap, link: '/products?category=subscriptions', color: 'from-amber-600 to-orange-600', count: '100% Legal' },
  ];

  return (
    <div className="space-y-12 pb-12">

      {/* HERO BANNER SECTION */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-blue-950/80 to-slate-950 border border-slate-800 p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,102,255,0.2),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/40 text-cyan-300 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Kurdistan & Iraq #1 Digital Gaming Store
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight leading-tight">
            Level Up Your Gaming Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400">Instantly</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Get instant codes, game activation keys, mobile top-ups (PUBG UC, Free Fire, VP, Robux) and premium subscriptions with FastPay, Korek, and MasterCard.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/products"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-extrabold text-white text-sm shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all hover:scale-105"
            >
              Explore Store
              <ChevronRight className="w-4 h-4" />
            </Link>

            <Link
              to="/products?category=mobile"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 font-bold text-slate-200 text-sm flex items-center gap-2 transition-colors"
            >
              <Smartphone className="w-4 h-4 text-cyan-400" />
              Mobile Top-Ups
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORY ROW GRID */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoriesOverview.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <Link
                key={cat.title}
                to={cat.link}
                className="group relative p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex items-center justify-between overflow-hidden shadow-md"
              >
                <div className="space-y-1 z-10">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">{cat.count}</span>
                  <h3 className="font-bold text-slate-100 group-hover:text-cyan-300 transition-colors text-sm">
                    {cat.title}
                  </h3>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform shrink-0`}>
                  <IconComponent className="w-6 h-6" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* COMING SOON BANNER */}
      <section className="bg-gradient-to-r from-purple-950/60 via-slate-900 to-blue-950/60 border border-purple-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-purple-900/60 text-purple-300 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" /> Coming Soon To Dano Store
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-100">
            Monster Hunter Wilds & GTA VI Pre-Orders
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Stay tuned for upcoming next-gen AAA releases, exclusive Kurdish gaming tournaments, and automated instant wallet recharges coming directly to Dano Store!
          </p>
        </div>

        <Link
          to="/products"
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-xs text-white uppercase tracking-wider shrink-0 transition-colors shadow-lg shadow-purple-900/40"
        >
          View Current Catalog
        </Link>
      </section>

      {/* FLASH DEALS */}
      {flashDeals.length > 0 && (
        <ProductSection
          title="Flash Deals"
          subtitle="Limited-time discounted prices on games and digital codes"
          products={flashDeals.slice(0, 4)}
          viewAllLink="/products"
          icon={Flame}
        />
      )}

      {/* TOP SALES */}
      {topSales.length > 0 && (
        <ProductSection
          title="Top Sales"
          subtitle="Best selling games and top-ups selected by Iraqi gamers"
          products={topSales.slice(0, 4)}
          viewAllLink="/products"
          icon={TrendingUp}
        />
      )}

      {/* NEW & TRENDING */}
      {trending.length > 0 && (
        <ProductSection
          title="New & Trending"
          subtitle="Hot packages and newly added games trending right now"
          products={trending.slice(0, 4)}
          viewAllLink="/products"
          icon={Sparkles}
        />
      )}

      {/* TOP RATED */}
      {topRated.length > 0 && (
        <ProductSection
          title="Top Rated Games & Services"
          subtitle="Highest rated digital items by our gaming community"
          products={topRated.slice(0, 4)}
          viewAllLink="/products"
          icon={Star}
        />
      )}

      {/* MOBILE TOP-UPS SECTION */}
      {mobileTopUps.length > 0 && (
        <ProductSection
          title="Mobile Game Top-Ups"
          subtitle="PUBG Mobile UC, Free Fire Diamonds, VP, Robux & MLBB"
          products={mobileTopUps.slice(0, 4)}
          viewAllLink="/products?category=mobile"
          icon={Smartphone}
        />
      )}

      {/* PC GAMING SECTION */}
      {pcGames.length > 0 && (
        <ProductSection
          title="PC Gaming Keys"
          subtitle="Steam keys, GTA V, Elden Ring, Red Dead 2 & Black Myth Wukong"
          products={pcGames.slice(0, 4)}
          viewAllLink="/products?platform=PC"
          icon={Gamepad2}
        />
      )}

      {/* XBOX SECTION */}
      {xboxGames.length > 0 && (
        <ProductSection
          title="Xbox Games & Cards"
          subtitle="Xbox Game Pass, Forza Horizon 5 & Xbox Store gift codes"
          products={xboxGames.slice(0, 4)}
          viewAllLink="/products?platform=Xbox"
          icon={Layers}
        />
      )}

      {/* PLAYSTATION SECTION */}
      {psGames.length > 0 && (
        <ProductSection
          title="PlayStation Network"
          subtitle="Tekken 8, Hogwarts Legacy & PSN Wallet gift cards"
          products={psGames.slice(0, 4)}
          viewAllLink="/products?platform=PlayStation"
          icon={Gamepad2}
        />
      )}

      {/* GIFT CARDS SECTION */}
      {giftCards.length > 0 && (
        <ProductSection
          title="Digital Gift Cards"
          subtitle="Steam, PlayStation, Xbox, Apple & Google Play wallet cards"
          products={giftCards.slice(0, 4)}
          viewAllLink="/products?category=gift-cards"
          icon={Gift}
        />
      )}

      {/* SUBSCRIPTIONS SECTION */}
      {subscriptions.length > 0 && (
        <ProductSection
          title="Subscriptions & Digital Services"
          subtitle="Discord Nitro, YouTube Premium, Netflix 4K, Spotify & Canva Pro"
          products={subscriptions.slice(0, 4)}
          viewAllLink="/products?category=subscriptions"
          icon={Zap}
        />
      )}

    </div>
  );
};

export default Home;
