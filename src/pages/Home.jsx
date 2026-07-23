import React from 'react';
import { Sparkles, Gamepad2, Gift, Tv, ChevronRight, Zap, Trophy, Flame, Phone } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';
import { useProducts } from '../hooks/useProducts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';
import ProductSection from '../components/ProductSection';

export function Home() {
  const { navigate } = useNavigation();
  const { products } = useProducts();

  // Filter products for various sections
  const flashDeals = products.filter(p => p.isFlashDeal && p.stock > 0);
  const trending = products.filter(p => p.isTrending);
  const topRated = products.filter(p => p.isTopRated);
  const topSales = products.filter(p => p.soldCount > 1000).sort((a, b) => b.soldCount - a.soldCount);

  // Platform filters
  const pcGames = products.filter(p => p.platform?.toLowerCase() === 'pc' && p.category === 'games');
  const xboxGames = products.filter(p => p.platform?.toLowerCase() === 'xbox');
  const psGames = products.filter(p => p.platform?.toLowerCase() === 'playstation');
  const mobileTopups = products.filter(p => p.platform?.toLowerCase() === 'mobile');
  const giftCards = products.filter(p => p.platform?.toLowerCase() === 'giftcard');
  const subscriptions = products.filter(p => p.platform?.toLowerCase() === 'subscription');

  // Coming soon mock datasets
  const comingSoonGames = [
    {
      id: 'gta-vi',
      name: 'Grand Theft Auto VI',
      release: 'Fall 2025',
      platform: 'PS5 / Xbox Series X',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg', // Placeholders
      desc: 'Grand Theft Auto VI heads to the state of Leonida, home to the neon-soaked streets of Vice City and beyond.'
    },
    {
      id: 'monster-hunter-wilds',
      name: 'Monster Hunter Wilds',
      release: 'Feb 2025',
      platform: 'PC / Xbox / PS5',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
      desc: 'The next generation in the critically acclaimed action RPG franchise. Hunt giant beasts in dynamic wilderness.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-brand-blue via-brand-purple to-brand-blue py-1.5 px-4 text-center text-[11px] sm:text-xs font-bold uppercase tracking-widest text-white shadow-md z-50">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          Instant Deliveries & 24/7 Support in Kurdistan & Iraq • Sole Currency is IQD
        </span>
      </div>

      {/* Navbar Component */}
      <Navbar />

      {/* Main Content Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-16">

        {/* HERO / FEATURED SECTION */}
        <section className="relative rounded-2xl overflow-hidden bg-[#0d0d15] border border-brand-border/60">
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#0d0d15]/80 to-transparent z-10" />
          {/* Ambient Purple/Blue back-glow */}
          <div className="absolute -top-1/2 right-0 w-[500px] h-[500px] bg-brand-purple/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-1/2 right-1/4 w-[400px] h-[400px] bg-brand-cyan/15 blur-3xl rounded-full" />

          <div className="relative z-20 px-6 sm:px-12 py-12 sm:py-20 lg:w-2/3 space-y-6">
            <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-brand-blue text-white rounded-md border border-brand-cyan/30">
              FEATURED OFFER
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none text-white">
              BLACK MYTH: <span className="bg-gradient-to-r from-brand-cyan to-brand-purple bg-clip-text text-transparent">WUKONG</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Venture as the Destined One through a breathtaking mythological Chinese realm. Now available for PC with instant keys and 100% legal delivery in Iraq.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => navigate('#/product/black-myth-wukong')}
                className="px-6 py-3 rounded-xl bg-brand-blue text-xs font-extrabold uppercase tracking-widest hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/25 transition btn-glow text-center"
              >
                Get Steam Key
              </button>
              <button
                onClick={() => navigate('#/products')}
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-extrabold uppercase tracking-widest border border-white/10 transition text-center"
              >
                Browse Store Catalog
              </button>
            </div>
          </div>
        </section>

        {/* CATEGORY ROW SECTION */}
        <section className="space-y-4">
          <div className="text-center">
            <h2 className="text-xs font-black uppercase tracking-widest text-brand-cyan">Explore Categories</h2>
            <p className="text-lg font-extrabold text-white">Choose Your Gaming Service</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { name: 'Mobile Top-Ups', hash: '#/products?platform=mobile', icon: Phone, color: 'hover:border-yellow-500/50 hover:shadow-yellow-500/5' },
              { name: 'Console / PC Games', hash: '#/products?category=games', icon: Gamepad2, color: 'hover:border-cyan-500/50 hover:shadow-cyan-500/5' },
              { name: 'Gift Cards', hash: '#/products?platform=giftcard', icon: Gift, color: 'hover:border-purple-500/50 hover:shadow-purple-500/5' },
              { name: 'Subscriptions', hash: '#/products?platform=subscription', icon: Tv, color: 'hover:border-pink-500/50 hover:shadow-pink-500/5' },
              { name: 'Other Services', hash: '#/products?category=others', icon: Sparkles, color: 'hover:border-brand-blue/50 hover:shadow-brand-blue/5' }
            ].map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  onClick={() => navigate(cat.hash)}
                  className={`flex flex-col items-center justify-center p-5 rounded-xl bg-[#0d0d15] border border-brand-border/60 cursor-pointer transition-all duration-300 ${cat.color}`}
                >
                  <Icon className="h-7 w-7 text-white mb-3" />
                  <span className="text-xs sm:text-sm font-bold text-gray-200 text-center">{cat.name}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* FLASH DEALS SECTION */}
        {flashDeals.length > 0 && (
          <section className="space-y-4">
            <SectionHeader
              title="Flash Deals"
              description="Limited quantities at legendary discounts. Act fast!"
              viewAllHref="#/products?category=flash"
              titleAccent="LIMITED TIME"
            />
            <ProductSection products={flashDeals} limit={4} />
          </section>
        )}

        {/* NEW & TRENDING */}
        <section className="space-y-4">
          <SectionHeader
            title="New & Trending"
            description="The hottest and most popular items flying off shelves right now."
            viewAllHref="#/products"
            titleAccent="HOT"
          />
          <ProductSection products={trending} limit={4} />
        </section>

        {/* TOP SALES */}
        <section className="space-y-4">
          <SectionHeader
            title="Top Sales"
            description="Most purchased keys, points, and cards by local players."
            viewAllHref="#/products"
            titleAccent="BESTSELLER"
          />
          <ProductSection products={topSales} limit={4} />
        </section>

        {/* TOP RATED */}
        <section className="space-y-4">
          <SectionHeader
            title="Top Rated"
            description="Highest-rated digital products and services according to user satisfaction."
            viewAllHref="#/products"
            titleAccent="5 STARS"
          />
          <ProductSection products={topRated} limit={4} />
        </section>

        {/* MOBILE TOP-UPS */}
        <section className="space-y-4">
          <SectionHeader
            title="Mobile Top-Ups"
            description="UC, Diamonds, CP, and Robux delivered directly to your Player ID instantly."
            viewAllHref="#/products?platform=mobile"
            titleAccent="DIRECT PIN"
          />
          <ProductSection products={mobileTopups} limit={4} />
        </section>

        {/* XBOX SECTION */}
        <section className="space-y-4">
          <SectionHeader
            title="Xbox Ecosystem"
            description="Xbox codes, subscriptions, game keys, and Xbox wallet vouchers."
            viewAllHref="#/products?platform=xbox"
            titleAccent="XBOX"
          />
          <ProductSection products={xboxGames} limit={4} />
        </section>

        {/* PLAYSTATION SECTION */}
        <section className="space-y-4">
          <SectionHeader
            title="PlayStation Corner"
            description="PlayStation Plus memberships, US region wallets, and game keys."
            viewAllHref="#/products?platform=playstation"
            titleAccent="PSN"
          />
          <ProductSection products={psGames} limit={4} />
        </section>

        {/* PC GAMING SECTION */}
        <section className="space-y-4">
          <SectionHeader
            title="PC Gaming"
            description="Steam games, battle royale top-ups, and game keys delivered securely."
            viewAllHref="#/products?platform=pc"
            titleAccent="STEAM/PC"
          />
          <ProductSection products={pcGames} limit={4} />
        </section>

        {/* GIFT CARDS */}
        <section className="space-y-4">
          <SectionHeader
            title="Gift Cards"
            description="Steam, iTunes, Google Play, Razer Gold, Amazon and PlayStation vouchers."
            viewAllHref="#/products?platform=giftcard"
            titleAccent="GIFT CARDS"
          />
          <ProductSection products={giftCards} limit={4} />
        </section>

        {/* SUBSCRIPTIONS */}
        <section className="space-y-4">
          <SectionHeader
            title="Premium Subscriptions"
            description="Discord Nitro, YouTube Premium, Canva, Netflix, and Telegram Premium codes."
            viewAllHref="#/products?platform=subscription"
            titleAccent="SERVICES"
          />
          <ProductSection products={subscriptions} limit={4} />
        </section>

        {/* COMING SOON SECTION */}
        <section className="space-y-4 border-t border-brand-border/40 pt-12">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
              Coming Soon
              <span className="text-brand-purple bg-brand-purple/10 px-2.5 py-0.5 text-xs font-bold rounded border border-brand-purple/30 uppercase tracking-widest">
                PRE-ORDER INFO
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Highly anticipated blockbusters releasing soon. Sign up for notifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comingSoonGames.map((game) => (
              <div
                key={game.id}
                className="flex flex-col sm:flex-row gap-4 p-5 rounded-xl bg-[#0d0d15] border border-brand-border/60 hover:border-brand-purple/50 transition duration-300"
              >
                <div className="w-full sm:w-2/5 overflow-hidden rounded-lg bg-black/40 h-32 sm:h-auto border border-white/5 flex-shrink-0">
                  <img src={game.image} alt={game.name} className="w-full h-full object-cover opacity-75 group-hover:opacity-100" />
                </div>
                <div className="flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-brand-purple bg-brand-purple/10 border border-brand-purple/30 px-2 py-0.5 rounded">
                        {game.platform}
                      </span>
                      <span className="text-[10px] font-black text-yellow-500">
                        {game.release}
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-base">{game.name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mt-1 line-clamp-2">{game.desc}</p>
                  </div>
                  <button
                    disabled
                    className="w-full sm:w-max px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-extrabold text-gray-400 cursor-not-allowed uppercase tracking-wider"
                  >
                    PRE-ORDERS OPENING SOON
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

export default Home;
