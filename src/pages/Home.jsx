import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flame,
  Zap,
  Gamepad2,
  Smartphone,
  Monitor,
  Tv,
  CreditCard,
  Sparkles,
  ShieldCheck,
  Clock,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Star,
  Award
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';

export const Home = () => {
  const { products } = useProducts();
  const navigate = useNavigate();

  // Filtered product collections
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const topSales = products.filter((p) => p.soldCount >= 1500 || p.tag === 'Top Sales').slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
  const topRatedProducts = products.filter((p) => p.isTopRated).slice(0, 4);

  // Platform and category specific sections
  const xboxProducts = products.filter((p) => p.platform === 'Xbox' || p.category === 'xbox').slice(0, 4);
  const playstationProducts = products.filter((p) => p.platform === 'PlayStation' || p.category === 'playstation').slice(0, 4);
  const pcProducts = products.filter((p) => p.platform === 'PC' || p.category === 'pc').slice(0, 4);
  const mobileProducts = products.filter((p) => p.platform === 'Mobile' || p.category === 'mobile').slice(0, 4);
  const giftCardProducts = products.filter((p) => p.platform === 'Gift Card' || p.category === 'giftcards').slice(0, 4);
  const subscriptionProducts = products.filter((p) => p.type === 'Subscription' || p.category === 'subscriptions').slice(0, 4);

  const heroCategories = [
    { title: 'Mobile Top-Ups', desc: 'PUBG, Free Fire, Valorant, Robux', icon: Smartphone, color: 'from-blue-600 to-cyan-500', path: '/products?platform=Mobile' },
    { title: 'Paid Steam Games', desc: 'GTA V, Elden Ring, RDR2', icon: Monitor, color: 'from-purple-600 to-indigo-600', path: '/products?platform=PC' },
    { title: 'Console Store Cards', desc: 'PlayStation & Xbox Cards', icon: Tv, color: 'from-cyan-600 to-blue-700', path: '/products?category=giftcards' },
    { title: 'Digital Subscriptions', desc: 'Discord Nitro, YouTube, Netflix', icon: Zap, color: 'from-amber-500 to-purple-600', path: '/products?category=subscriptions' },
  ];

  return (
    <div className="space-y-12 pb-16">

      {/* Hero / Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c132c] via-[#090d1f] to-[#050813] border border-cyan-500/20 p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Official Gaming Digital Store Kurdistan &amp; Iraq</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight">
              Level Up Your Gaming Experience with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Instant Top-Ups
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Buy PUBG UC, Free Fire Diamonds, Valorant Points, Steam Keys, and Digital Gift Cards using local payments: FastPay, Korek, and MasterCard.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/products')}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/25 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Gamepad2 className="w-5 h-5 text-slate-950" />
                <span>Explore Catalog</span>
              </button>

              <button
                onClick={() => navigate('/products?platform=Mobile')}
                className="px-6 py-3.5 rounded-2xl bg-[#0c1226] hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Mobile Games</span>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-800/80 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Legal Keys</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Local Iraq FastPay</span>
              </div>
            </div>
          </div>

          {/* Hero Feature Grid Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {heroCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={idx}
                  to={cat.path}
                  className="p-4 rounded-2xl bg-[#090e21] border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 group flex flex-col justify-between h-36"
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cat.color} p-[1px]`}>
                    <div className="w-full h-full bg-[#090e21] rounded-[11px] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{cat.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
          Browse By Category
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { name: 'Mobile Top-Ups', icon: Smartphone, path: '/products?platform=Mobile', count: '12 Items' },
            { name: 'PC Games', icon: Monitor, path: '/products?platform=PC', count: '20 Games' },
            { name: 'Xbox Store', icon: Gamepad2, path: '/products?platform=Xbox', count: 'Console' },
            { name: 'PlayStation', icon: Tv, path: '/products?platform=PlayStation', count: 'PSN Cards' },
            { name: 'Gift Cards', icon: CreditCard, path: '/products?category=giftcards', count: 'Global' },
            { name: 'Subscriptions', icon: Zap, path: '/products?category=subscriptions', count: 'Premium' },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <Link
                key={i}
                to={c.path}
                className="p-4 bg-[#090e21] hover:bg-[#0d142d] border border-slate-800 hover:border-cyan-500/40 rounded-2xl text-center space-y-2 group transition-all"
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center group-hover:border-cyan-400">
                  <Icon className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white group-hover:text-cyan-300">{c.name}</h4>
                  <span className="text-[10px] text-slate-500">{c.count}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Flash Deals Section */}
      {flashDeals.length > 0 && (
        <ProductSection
          title="Flash Deals"
          subtitle="Limited time discounts on top gaming digital products."
          icon={Flame}
          badge="Special Discounts"
          viewAllPath="/products?filter=flash"
          products={flashDeals.slice(0, 4)}
        />
      )}

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Most popular items bought by Iraqi and Kurdish gamers."
        icon={TrendingUp}
        badge="Best Sellers"
        viewAllPath="/products"
        products={topSales}
      />

      {/* New & Trending */}
      <ProductSection
        title="New & Trending"
        subtitle="Fresh game keys, top-ups, and subscriptions."
        icon={Sparkles}
        badge="Hot Items"
        viewAllPath="/products"
        products={trendingProducts}
      />

      {/* Top Rated */}
      <ProductSection
        title="Top Rated"
        subtitle="5-star rated products loved by our community."
        icon={Star}
        badge="Community Choice"
        viewAllPath="/products"
        products={topRatedProducts}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Section"
        subtitle="Xbox Games, Game Pass Subscriptions, and Gift Cards."
        icon={Gamepad2}
        badge="Xbox Store"
        viewAllPath="/products?platform=Xbox"
        products={xboxProducts}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Section"
        subtitle="PSN Wallet Cards, PlayStation Games, and Memberships."
        icon={Tv}
        badge="PlayStation Store"
        viewAllPath="/products?platform=PlayStation"
        products={playstationProducts}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Section"
        subtitle="Steam Keys, Valorant Points, and PC Games."
        icon={Monitor}
        badge="Steam & PC"
        viewAllPath="/products?platform=PC"
        products={pcProducts}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, Robux, and MLBB."
        icon={Smartphone}
        badge="Instant Direct ID"
        viewAllPath="/products?platform=Mobile"
        products={mobileProducts}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards"
        subtitle="Steam, Google Play, Apple, iTunes, Amazon, and Razer Gold."
        icon={CreditCard}
        badge="100% Digital Codes"
        viewAllPath="/products?category=giftcards"
        products={giftCardProducts}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify, Canva Pro."
        icon={Zap}
        badge="Premium Accounts"
        viewAllPath="/products?category=subscriptions"
        products={subscriptionProducts}
      />

      {/* Coming Soon Teaser Banner */}
      <section className="bg-gradient-to-r from-purple-950/60 via-[#0a0e22] to-cyan-950/60 border border-purple-500/20 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold bg-purple-900/50 text-purple-300 border border-purple-500/30">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>Coming Soon to Dano Store</span>
          </div>
          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
            Expanded Console Game Keys &amp; In-Game Bundles
          </h3>
          <p className="text-xs text-slate-400 max-w-xl">
            We are regularly expanding our digital inventory for Nintendo Switch eShop keys and specialized PC bundles across Iraq.
          </p>
        </div>

        <button
          onClick={() => navigate('/products')}
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 shrink-0 transition-all cursor-pointer"
        >
          View Current Store Items
        </button>
      </section>

    </div>
  );
};

export default Home;
