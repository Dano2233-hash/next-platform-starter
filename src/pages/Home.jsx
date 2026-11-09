import React from 'react';
import { Link } from 'react-router-dom';
import {
  Gamepad2,
  Flame,
  Sparkles,
  Clock,
  Star,
  Smartphone,
  CreditCard,
  Tv,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Percent
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductSection from '../components/ProductSection';
import ProductCard from '../components/ProductCard';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';

/**
 * Home page sections requirement:
 * - Top announcement bar (rendered in Navbar/global)
 * - Navbar (rendered globally in App)
 * - Hero / featured section
 * - Category row
 * - Coming Soon
 * - Top Sales
 * - Flash Deals
 * - New & Trending
 * - Top Rated
 * - Xbox section
 * - PlayStation section
 * - PC Gaming section
 * - Mobile Top-Ups section
 * - Gift Cards section
 * - Subscriptions section
 * - Footer (rendered globally in App)
 */
export default function Home() {
  const { products } = useProducts();

  // Filter products for each section
  const featuredProduct = products.find((p) => p.isFeatured && p.id === 'elden-ring') || products[0];
  const heroShowcase = products.filter((p) => p.isFeatured).slice(0, 4);

  const flashDeals = products.filter((p) => p.isFlashDeal || (p.oldPrice && p.oldPrice > p.price)).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
  const topRatedProducts = products.filter((p) => p.isTopRated || p.rating >= 4.9).slice(0, 4);
  const topSalesProducts = [...products].sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0)).slice(0, 4);

  // Platform and category specific sections
  const pcGames = products.filter((p) => p.platform === 'PC' && p.category === 'games').slice(0, 4);
  const playStationProducts = products.filter((p) => p.platform === 'PlayStation').slice(0, 4);
  const xboxProducts = products.filter((p) => p.platform === 'Xbox').slice(0, 4);
  const mobileTopUps = products.filter((p) => p.category === 'mobile-topup').slice(0, 4);
  const giftCards = products.filter((p) => p.category === 'gift-cards').slice(0, 4);
  const subscriptions = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  return (
    <div className="space-y-12 pb-16">

      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-8 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[250px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative rounded-3xl bg-gradient-to-br from-[#0c1226] via-[#090e1f] to-[#060814] border border-white/10 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Iraq & Kurdistan #1 Gaming Destination</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading tracking-wide leading-tight">
                INSTANT DIGITAL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
                  KEYS & TOP-UPS
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
                Unlock Steam titles, PUBG Mobile UC, Fortnite V-Bucks, PlayStation cards, and digital subscriptions at guaranteed local prices. Pay easily with FastPay, Korek, or MasterCard.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/products"
                  className="px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] transition-all flex items-center gap-2"
                >
                  <span>Explore All Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/products?category=mobile-topup"
                  className="px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-900/90 text-white border border-white/10 hover:border-cyan-500/40 hover:bg-slate-800 transition-all flex items-center gap-2"
                >
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  <span>Mobile Top-Ups</span>
                </Link>
              </div>

              {/* Badges strip */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-slate-300 font-semibold">Instant Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-slate-300 font-semibold">100% Genuine</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-slate-300 font-semibold">FastPay & Korek</span>
                </div>
              </div>
            </div>

            {/* Right Hero Spotlight Product Card */}
            {featuredProduct && (
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl bg-slate-900/90 border border-cyan-500/30 p-4 shadow-2xl backdrop-blur-md group">
                  <div className="relative overflow-hidden rounded-xl">
                    <ProductImage product={featuredProduct} heightClass="h-60 sm:h-64" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-rose-600 text-white shadow-lg">
                      Spotlight
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="text-cyan-400 font-bold uppercase">{featuredProduct.platform} • {featuredProduct.type}</span>
                      <div className="flex items-center gap-1 text-amber-400 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{featuredProduct.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors font-heading">
                      {featuredProduct.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {featuredProduct.description}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase">Starting at</span>
                        <div className="text-xl font-black text-cyan-400 font-heading">
                          {formatPrice(featuredProduct.price)}
                        </div>
                      </div>
                      <Link
                        to={`/product/${featuredProduct.slug}`}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
                      >
                        Order Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 2. CATEGORY ROW */}
      <section className="py-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/products?category=games"
            className="group p-5 rounded-2xl bg-[#090e21] border border-white/5 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all duration-300 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">Paid Games</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Steam, PC & Console</p>
            </div>
          </Link>

          <Link
            to="/products?category=mobile-topup"
            className="group p-5 rounded-2xl bg-[#090e21] border border-white/5 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all duration-300 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">Mobile Top-Ups</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">PUBG UC, Free Fire & more</p>
            </div>
          </Link>

          <Link
            to="/products?category=gift-cards"
            className="group p-5 rounded-2xl bg-[#090e21] border border-white/5 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all duration-300 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">Gift Cards</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Steam, PSN & Apple</p>
            </div>
          </Link>

          <Link
            to="/products?category=subscriptions"
            className="group p-5 rounded-2xl bg-[#090e21] border border-white/5 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all duration-300 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <Tv className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">Subscriptions</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Discord Nitro & Netflix</p>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. COMING SOON BANNER */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-purple-950/60 to-slate-900 border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-400 text-slate-950">
                Coming Soon
              </span>
              <h3 className="text-lg font-bold text-white font-heading">
                Grand Theft Auto VI & Monster Hunter Wilds Pre-Orders
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Be the first to reserve upcoming major releases at special launch day pricing in Iraq.
            </p>
          </div>
        </div>
        <Link
          to="/products"
          className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white whitespace-nowrap transition-colors"
        >
          View Release Calendar
        </Link>
      </section>

      {/* 4. FLASH DEALS */}
      <ProductSection
        title="Flash Deals"
        subtitle="Time-sensitive discounts on popular top-ups and digital titles."
        tag="Special Offers"
        linkTo="/products?sale=true"
        icon={Flame}
        products={flashDeals}
      />

      {/* 5. TOP SALES */}
      <ProductSection
        title="Top Sales"
        subtitle="The highest-selling products chosen by our Iraqi and Kurdish gamers."
        tag="Most Popular"
        linkTo="/products?sort=sales"
        icon={TrendingUp}
        products={topSalesProducts}
      />

      {/* 6. NEW & TRENDING */}
      <ProductSection
        title="New & Trending"
        subtitle="Hot picks currently trending in the regional gaming community."
        tag="Trending Now"
        linkTo="/products?trending=true"
        icon={Sparkles}
        products={trendingProducts}
      />

      {/* 7. TOP RATED */}
      <ProductSection
        title="Top Rated"
        subtitle="Highest customer-rated keys, gift vouchers, and premium packages."
        tag="5-Star Verified"
        linkTo="/products?sort=rating"
        icon={Star}
        products={topRatedProducts}
      />

      {/* 8. PC GAMING SECTION */}
      <ProductSection
        title="PC Gaming"
        subtitle="Original digital Steam keys and verified PC licenses."
        tag="Steam & PC"
        linkTo="/products?platform=PC"
        icon={Gamepad2}
        products={pcGames}
      />

      {/* 9. PLAYSTATION SECTION */}
      <ProductSection
        title="PlayStation Network"
        subtitle="PlayStation Store cards and PS5 digital games."
        tag="PS4 & PS5"
        linkTo="/products?platform=PlayStation"
        icon={Gamepad2}
        products={playStationProducts}
      />

      {/* 10. XBOX SECTION */}
      <ProductSection
        title="Xbox Gaming"
        subtitle="Xbox Series X|S games, Game Pass keys, and gift cards."
        tag="Xbox Console"
        linkTo="/products?platform=Xbox"
        icon={Gamepad2}
        products={xboxProducts}
      />

      {/* 11. MOBILE TOP-UPS SECTION */}
      <ProductSection
        title="Mobile Top-Ups"
        subtitle="Instant UC, Diamonds, V-Bucks, and Robux by Player ID."
        tag="Fast Top-Up"
        linkTo="/products?category=mobile-topup"
        icon={Smartphone}
        products={mobileTopUps}
      />

      {/* 12. GIFT CARDS SECTION */}
      <ProductSection
        title="Gift Cards"
        subtitle="Global and US digital wallet codes for Apple, Steam, Google Play, and Amazon."
        tag="Vouchers"
        linkTo="/products?category=gift-cards"
        icon={CreditCard}
        products={giftCards}
      />

      {/* 13. SUBSCRIPTIONS SECTION */}
      <ProductSection
        title="Subscriptions & Services"
        subtitle="Legal premium digital services including Discord Nitro, YouTube, and Netflix."
        tag="Streaming & Pro"
        linkTo="/products?category=subscriptions"
        icon={Tv}
        products={subscriptions}
      />

    </div>
  );
}
