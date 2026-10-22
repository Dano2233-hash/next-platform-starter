import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Zap, Sparkles, ShieldCheck, ArrowRight, Flame, Trophy, Smartphone, Monitor, Box, CreditCard, Clock } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductSection } from '../components/ProductSection';
import { ProductCard } from '../components/ProductCard';
import { categories } from '../data/categories';
import { useProducts } from '../hooks/useProducts';

export const Home = () => {
  const { products } = useProducts();

  // Filtered lists for each section
  const topSales = products.filter((p) => p.soldCount > 2500 || p.tag === 'Best Seller');
  const flashDeals = products.filter((p) => p.isFlashDeal || (p.oldPrice && p.oldPrice > p.price));
  const newAndTrending = products.filter((p) => p.isTrending);
  const topRated = products.filter((p) => p.isTopRated || p.rating >= 4.9);

  const xboxSection = products.filter((p) => p.platform === 'Xbox' || p.category === 'Xbox');
  const playstationSection = products.filter((p) => p.platform === 'PlayStation' || p.category === 'PlayStation');
  const pcGamingSection = products.filter((p) => p.platform === 'PC' || p.category === 'PC Gaming');
  const mobileTopUps = products.filter((p) => p.category === 'Mobile Top-Ups');
  const giftCardsSection = products.filter((p) => p.category === 'Gift Cards');
  const subscriptionsSection = products.filter((p) => p.category === 'Subscriptions');

  // Featured hero products
  const featuredHero = products.find((p) => p.slug === 'pubg-mobile-uc') || products[0];
  const secondaryHero = products.filter((p) => p.isFeatured).slice(1, 4);

  // Coming soon mock list
  const comingSoonGames = [
    {
      id: 'cs-1',
      name: 'GTA VI (Grand Theft Auto 6)',
      platform: 'PlayStation / Xbox',
      category: 'PC Gaming',
      releaseDate: 'Expected 2025',
      image: ''
    },
    {
      id: 'cs-2',
      name: 'Monster Hunter Wilds',
      platform: 'PC / Console',
      category: 'PC Gaming',
      releaseDate: 'Early 2025',
      image: ''
    },
    {
      id: 'cs-3',
      name: 'Assassin\'s Creed Shadows',
      platform: 'PC / PS5',
      category: 'PC Gaming',
      releaseDate: 'Coming Soon',
      image: ''
    }
  ];

  return (
    <div className="min-h-screen bg-[#05070f] text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 flex-1 w-full">

        {/* HERO / FEATURED SECTION */}
        <section className="mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Main Featured Banner */}
            <div className="lg:col-span-2 relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 p-6 sm:p-10 flex flex-col justify-between min-h-[360px] shadow-2xl group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,229,255,0.15),transparent_60%)] pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-extrabold text-xs uppercase tracking-wider mb-4 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>Featured Store Special</span>
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-100 tracking-tight leading-tight max-w-xl">
                  Instant Top-Ups & Digital Games in <span className="text-cyan-400">Kurdistan / Iraq</span>
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm mt-3 max-w-lg leading-relaxed font-medium">
                  Official PUBG Mobile UC, Free Fire Diamonds, Steam Wallet, PlayStation, Xbox, and PC CD keys. Safe & manual payment via FastPay, Korek, and MasterCard.
                </p>
              </div>

              <div className="relative z-10 pt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/products"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/25 flex items-center gap-2 active:scale-95 transition-all"
                >
                  <Gamepad2 className="w-4 h-4 text-slate-950" />
                  <span>Explore All Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to={`/product/${featuredHero?.slug || featuredHero?.id}`}
                  className="px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-cyan-300 font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all"
                >
                  <span>Quick Buy PUBG UC</span>
                </Link>
              </div>
            </div>

            {/* Side Hero Cards */}
            <div className="flex flex-col gap-4 justify-between">
              {secondaryHero.map((prod) => (
                <Link
                  key={prod.id}
                  to={`/product/${prod.slug || prod.id}`}
                  className="p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex items-center gap-4 group shadow-md"
                >
                  <div className="w-16 h-16 rounded-xl bg-slate-800 overflow-hidden flex-shrink-0 border border-slate-700 flex items-center justify-center font-bold text-xs text-cyan-400">
                    {prod.image ? (
                      <img src={prod.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    ) : (
                      prod.platform
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                      {prod.category}
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-100 group-hover:text-cyan-400 transition-colors truncate">
                      {prod.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-black text-cyan-300">
                        From {prod.price.toLocaleString()} IQD
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CATEGORY ROW */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              <span>Browse Categories</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all text-center group flex flex-col items-center justify-center space-y-2 hover:-translate-y-1 shadow-md"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} p-0.5 shadow-md`}>
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Gamepad2 className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="font-extrabold text-xs text-slate-200 group-hover:text-cyan-400 transition-colors">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        {/* TOP SALES */}
        <ProductSection
          title="Top Sales"
          subtitle="Most popular products in Erbil, Sulaymaniyah, Duhok & Baghdad"
          badgeText="Bestsellers"
          iconType="flame"
          products={topSales}
          viewAllLink="/products"
          maxItems={4}
        />

        {/* FLASH DEALS */}
        <ProductSection
          title="Flash Deals"
          subtitle="Limited time discounted gaming keys and top-up packages"
          badgeText="Special Offers"
          iconType="flash"
          products={flashDeals}
          viewAllLink="/products"
          maxItems={4}
        />

        {/* NEW & TRENDING */}
        <ProductSection
          title="New & Trending"
          subtitle="Latest releases and trending digital subscriptions"
          badgeText="Hot Right Now"
          iconType="sparkle"
          products={newAndTrending}
          viewAllLink="/products"
          maxItems={4}
        />

        {/* TOP RATED */}
        <ProductSection
          title="Top Rated"
          subtitle="Highest rated products by gamers in Iraq"
          badgeText="Customer Favorite"
          iconType="award"
          products={topRated}
          viewAllLink="/products"
          maxItems={4}
        />

        {/* COMING SOON */}
        <section className="mb-14 bg-gradient-to-r from-purple-950/40 via-slate-900 to-blue-950/40 p-6 sm:p-8 rounded-3xl border border-purple-500/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Upcoming Releases</span>
              </span>
              <h2 className="text-xl font-black text-slate-100">Coming Soon</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {comingSoonGames.map((game) => (
              <div key={game.id} className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-extrabold text-xs">
                  SOON
                </div>
                <div>
                  <h3 className="font-extrabold text-xs text-slate-200">{game.name}</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">{game.platform}</p>
                  <span className="text-[10px] font-bold text-purple-400 mt-1 block">{game.releaseDate}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PLATFORM SECTIONS */}
        <ProductSection
          title="Xbox Gaming & Game Pass"
          subtitle="Digital Xbox games, subscriptions, and store codes"
          badgeText="Xbox Platform"
          iconType="sparkle"
          products={xboxSection}
          viewAllLink="/products?platform=Xbox"
          maxItems={4}
        />

        <ProductSection
          title="PlayStation Store & Games"
          subtitle="PSN gift cards, PlayStation Plus, and PS5 digital titles"
          badgeText="PlayStation"
          iconType="sparkle"
          products={playstationSection}
          viewAllLink="/products?platform=PlayStation"
          maxItems={4}
        />

        <ProductSection
          title="PC Gaming & Steam Keys"
          subtitle="Steam CD keys, activation codes, and PC games"
          badgeText="PC Master Race"
          iconType="sparkle"
          products={pcGamingSection}
          viewAllLink="/products?platform=PC"
          maxItems={4}
        />

        <ProductSection
          title="Mobile Top-Ups"
          subtitle="PUBG UC, Free Fire Diamonds, COD CP & Mobile Legends"
          badgeText="Mobile Gaming"
          iconType="flash"
          products={mobileTopUps}
          viewAllLink="/products?category=Mobile Top-Ups"
          maxItems={4}
        />

        <ProductSection
          title="Gift Cards"
          subtitle="Official vouchers for Steam, Google Play, Apple & Razer Gold"
          badgeText="Digital Vouchers"
          iconType="award"
          products={giftCardsSection}
          viewAllLink="/products?category=Gift Cards"
          maxItems={4}
        />

        <ProductSection
          title="Digital Subscriptions"
          subtitle="Discord Nitro, YouTube Premium, Netflix & Spotify"
          badgeText="Memberships"
          iconType="sparkle"
          products={subscriptionsSection}
          viewAllLink="/products?category=Subscriptions"
          maxItems={4}
        />

      </main>

      <Footer />
    </div>
  );
};
