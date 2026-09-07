import React from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  Flame,
  Zap,
  TrendingUp,
  Star,
  Clock,
  Gamepad2,
  Smartphone,
  CreditCard,
  Tv,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { ProductSection } from '../components/ProductSection'
import { ProductCard } from '../components/ProductCard'

export function Home() {
  const { products } = useProducts()

  // Filtered lists for Home sections
  const flashDeals = products.filter(p => p.isFlashDeal).slice(0, 4)
  const topSales = products.filter(p => p.soldCount && p.soldCount > 2000).slice(0, 4)
  const trending = products.filter(p => p.isTrending).slice(0, 4)
  const topRated = products.filter(p => p.isTopRated).slice(0, 4)

  const xboxGames = products.filter(p => p.platform === 'Xbox').slice(0, 4)
  const playstationGames = products.filter(p => p.platform === 'PlayStation').slice(0, 4)
  const pcGames = products.filter(p => p.platform === 'PC' && p.category === 'Games').slice(0, 4)
  const mobileTopups = products.filter(p => p.category === 'Mobile Top-Ups').slice(0, 4)
  const giftCards = products.filter(p => p.category === 'Gift Cards').slice(0, 4)
  const subscriptions = products.filter(p => p.category === 'Subscriptions').slice(0, 4)

  const categories = [
    { name: 'Mobile Top-Ups', count: 'PUBG, Free Fire, VP, CP', icon: Smartphone, link: '/products?category=Mobile%20Top-Ups', bg: 'from-cyan-500/20 to-blue-600/20 border-cyan-500/30 text-cyan-400' },
    { name: 'PC & Console Games', count: 'GTA V, Elden Ring, RDR2', icon: Gamepad2, link: '/products?category=Games', bg: 'from-purple-500/20 to-indigo-600/20 border-purple-500/30 text-purple-400' },
    { name: 'Gift Cards', count: 'Steam, PSN, Xbox, Apple', icon: CreditCard, link: '/products?category=Gift%20Cards', bg: 'from-amber-500/20 to-orange-600/20 border-amber-500/30 text-amber-400' },
    { name: 'Subscriptions', count: 'Discord Nitro, YouTube, Netflix', icon: Tv, link: '/products?category=Subscriptions', bg: 'from-emerald-500/20 to-teal-600/20 border-emerald-500/30 text-emerald-400' }
  ]

  const comingSoonGames = [
    { title: 'Grand Theft Auto VI', release: '2025', category: 'Rockstar Games', platform: 'PS5 / Xbox Series X', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop' },
    { title: 'Monster Hunter Wilds', release: 'Q1 2025', category: 'Action RPG', platform: 'PC / PS5 / Xbox', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop' },
    { title: 'DOOM: The Dark Ages', release: '2025', category: 'Bethesda Softworks', platform: 'PC / Xbox Series X', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop' }
  ]

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#080e22] via-[#0d1636] to-[#120a2a] border border-slate-800 p-6 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <Sparkles className="w-4 h-4 text-cyan-400" /> #1 Digital Store in Kurdistan & Iraq
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Level Up Your Gaming Experience <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Instant Delivery & Best Prices
            </span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Get instant PUBG Mobile UC, Valorant Points, Steam Wallet codes, Discord Nitro, and original PC/Console game keys. Pay easily with FastPay, Korek, or MasterCard.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/products"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/20 flex items-center gap-2 transition-all"
            >
              <span>Explore Store</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/products?category=Mobile%20Top-Ups"
              className="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm transition-colors"
            >
              PUBG UC & Mobile Top-Ups
            </Link>
          </div>

          <div className="pt-4 flex items-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> 100% Guaranteed</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Instant Key/Recharge</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Kurdistan Support</span>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const IconComponent = cat.icon
            return (
              <Link
                key={cat.name}
                to={cat.link}
                className={`p-5 rounded-2xl bg-gradient-to-br ${cat.bg} bg-[#080d1a] border hover:scale-[1.02] transition-transform duration-300 flex items-center gap-4 group`}
              >
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base group-hover:text-cyan-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{cat.count}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Flash Deals Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Limited time discounts on top gaming top-ups & game keys"
        products={flashDeals}
        viewAllLink="/products"
        icon={Zap}
      />

      {/* Top Sales Section */}
      <ProductSection
        title="Top Sales"
        subtitle="Most purchased products by Kurdish & Iraqi gamers"
        products={topSales}
        viewAllLink="/products"
        icon={Flame}
      />

      {/* New & Trending Section */}
      <ProductSection
        title="New & Trending"
        subtitle="Fresh additions and viral releases"
        products={trending}
        viewAllLink="/products"
        icon={TrendingUp}
      />

      {/* Top Rated Section */}
      <ProductSection
        title="Top Rated Products"
        subtitle="Highest customer satisfaction score"
        products={topRated}
        viewAllLink="/products"
        icon={Star}
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Console & PC Games"
        subtitle="Digital game keys and Xbox Gift Cards"
        products={xboxGames}
        viewAllLink="/products?platform=Xbox"
        icon={Gamepad2}
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Network Store"
        subtitle="PSN Gift Cards & PlayStation hits"
        products={playstationGames}
        viewAllLink="/products?platform=PlayStation"
        icon={Gamepad2}
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Catalog"
        subtitle="Steam, Epic, and Rockstar PC licenses"
        products={pcGames}
        viewAllLink="/products?platform=PC"
        icon={Gamepad2}
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Game Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, VP, CP & Coins"
        products={mobileTopups}
        viewAllLink="/products?category=Mobile%20Top-Ups"
        icon={Smartphone}
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Digital Gift Cards"
        subtitle="Steam Wallet, Apple, Google Play & Razer Gold"
        products={giftCards}
        viewAllLink="/products?category=Gift%20Cards"
        icon={CreditCard}
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix & Canva Pro"
        products={subscriptions}
        viewAllLink="/products?category=Subscriptions"
        icon={Tv}
      />

      {/* Coming Soon Section */}
      <section className="bg-[#080d1e] rounded-3xl p-6 md:p-8 border border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Coming Soon</h2>
            <p className="text-xs text-slate-400">Upcoming blockbuster video games available for pre-order soon</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {comingSoonGames.map((game, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80 p-4 space-y-3">
              <img src={game.image} alt={game.title} className="w-full h-36 object-cover rounded-xl" />
              <div className="flex items-center justify-between text-xs">
                <span className="text-purple-400 font-bold">{game.category}</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">{game.release}</span>
              </div>
              <h3 className="font-bold text-white text-base">{game.title}</h3>
              <p className="text-xs text-slate-400">{game.platform}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
