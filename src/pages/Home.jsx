import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, Flame, Sparkles, TrendingUp, Award, Smartphone, Monitor, Gift, Clock, Star, ArrowRight } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { ProductSection } from '../components/ProductSection';
import { CATEGORIES } from '../data/categories';

export function Home() {
  const { products } = useProducts();

  const featured = products.filter((p) => p.isFeatured);
  const flashDeals = products.filter((p) => p.isFlashDeal);
  const trending = products.filter((p) => p.isTrending);
  const topRated = products.filter((p) => p.isTopRated);

  const xboxGames = products.filter((p) => p.platform === 'Xbox');
  const psGames = products.filter((p) => p.platform === 'PlayStation');
  const pcGames = products.filter((p) => p.platform === 'PC');
  const mobileTopUps = products.filter((p) => p.category === 'mobile');
  const giftCards = products.filter((p) => p.category === 'gift-cards');
  const subscriptions = products.filter((p) => p.category === 'subscriptions');

  const comingSoon = [
    { title: 'GTA VI Pre-Orders', platform: 'PC / PS5 / Xbox', date: 'Expected 2025' },
    { title: 'Call of Duty: Gulf War CP', platform: 'Multiplatform', date: 'Coming Soon' },
    { title: 'Monster Hunter Wilds', platform: 'PC / Console', date: 'Q1 2025' }
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#070b1a] via-[#0b122b] to-[#110926] border border-slate-800/80 p-6 sm:p-10 lg:p-14 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Fast & Official Gaming Recharge
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Level Up Your Gaming in <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">Kurdistan & Iraq</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Get instant PUBG UC, Free Fire Diamonds, Steam Wallet Codes, PC & Console Games, and Subscription passes with 100% legal digital codes and local payment methods.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/products?category=mobile"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-cyan-600/25 flex items-center gap-2 transition-all"
            >
              <Zap className="w-4 h-4" /> Instant Mobile Top-Up
            </Link>
            <Link
              to="/products?category=games"
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 text-slate-200 hover:text-white border border-slate-700/80 hover:border-cyan-500/50 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
            >
              Browse PC Games
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs text-slate-400">
            <div>
              <span className="font-extrabold text-white text-base block">100% Legal</span>
              <span>Official Publisher Codes</span>
            </div>
            <div>
              <span className="font-extrabold text-white text-base block">Instant Delivery</span>
              <span>Direct to your ID or email</span>
            </div>
            <div>
              <span className="font-extrabold text-white text-base block">Local Payment</span>
              <span>FastPay, Korek & MasterCard</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Explore Categories
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/products?category=mobile"
            className="group p-5 rounded-2xl bg-[#0a0f20] border border-slate-800 hover:border-cyan-500/50 hover:bg-[#0e162e] transition-all"
          >
            <Smartphone className="w-8 h-8 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-white text-sm">Mobile Top-Ups</h4>
            <p className="text-xs text-slate-400 mt-1">PUBG, Free Fire, Valorant, MLBB</p>
          </Link>
          <Link
            to="/products?category=games"
            className="group p-5 rounded-2xl bg-[#0a0f20] border border-slate-800 hover:border-blue-500/50 hover:bg-[#0e162e] transition-all"
          >
            <Monitor className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-white text-sm">Paid PC & Console</h4>
            <p className="text-xs text-slate-400 mt-1">GTA V, Elden Ring, RDR2</p>
          </Link>
          <Link
            to="/products?category=gift-cards"
            className="group p-5 rounded-2xl bg-[#0a0f20] border border-slate-800 hover:border-amber-500/50 hover:bg-[#0e162e] transition-all"
          >
            <Gift className="w-8 h-8 text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-white text-sm">Digital Gift Cards</h4>
            <p className="text-xs text-slate-400 mt-1">Steam, PlayStation, Xbox</p>
          </Link>
          <Link
            to="/products?category=subscriptions"
            className="group p-5 rounded-2xl bg-[#0a0f20] border border-slate-800 hover:border-purple-500/50 hover:bg-[#0e162e] transition-all"
          >
            <Sparkles className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-white text-sm">Subscriptions</h4>
            <p className="text-xs text-slate-400 mt-1">Discord Nitro, YouTube, Netflix</p>
          </Link>
        </div>
      </section>

      {/* Flash Deals */}
      <ProductSection
        title="Flash Deals & Discounts"
        subtitle="Limited-time offers on top digital products"
        products={flashDeals.slice(0, 4)}
        linkTo="/products"
      />

      {/* Top Sales */}
      <ProductSection
        title="Top Sales in Kurdistan & Iraq"
        subtitle="Most popular recharge packages and game keys"
        products={featured.slice(0, 4)}
        linkTo="/products"
      />

      {/* New & Trending */}
      <ProductSection
        title="New & Trending"
        subtitle="Latest game releases and trending digital passes"
        products={trending.slice(0, 4)}
        linkTo="/products"
      />

      {/* Xbox Section */}
      <ProductSection
        title="Xbox Gaming"
        subtitle="Digital codes and keys for Xbox Series X|S & Xbox One"
        products={xboxGames.slice(0, 4)}
        linkTo="/products?platform=Xbox"
      />

      {/* PlayStation Section */}
      <ProductSection
        title="PlayStation Store"
        subtitle="PSN gift cards and PlayStation game keys"
        products={psGames.slice(0, 4)}
        linkTo="/products?platform=PlayStation"
      />

      {/* PC Gaming Section */}
      <ProductSection
        title="PC Gaming Keys"
        subtitle="Official Steam keys and PC digital games"
        products={pcGames.slice(0, 4)}
        linkTo="/products?platform=PC"
      />

      {/* Mobile Top-Ups Section */}
      <ProductSection
        title="Mobile Gaming Top-Ups"
        subtitle="PUBG UC, Free Fire Diamonds, Roblox Robux & more"
        products={mobileTopUps.slice(0, 4)}
        linkTo="/products?category=mobile"
      />

      {/* Gift Cards Section */}
      <ProductSection
        title="Gift Cards"
        subtitle="Instant Steam, PSN, Xbox, Apple & Google Play wallet top-ups"
        products={giftCards.slice(0, 4)}
        linkTo="/products?category=gift-cards"
      />

      {/* Subscriptions Section */}
      <ProductSection
        title="Digital Subscriptions"
        subtitle="Discord Nitro, YouTube Premium, Netflix & Pro Tools"
        products={subscriptions.slice(0, 4)}
        linkTo="/products?category=subscriptions"
      />

      {/* Coming Soon Teaser */}
      <section className="bg-[#080d1e] border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <h3 className="font-extrabold text-xl text-white">Coming Soon to Dano Store</h3>
          </div>
          <span className="text-xs text-purple-400 font-semibold bg-purple-950/60 px-2.5 py-1 rounded-full border border-purple-800/40">
            Upcoming Releases
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {comingSoon.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">{item.platform}</span>
                <h4 className="font-bold text-slate-100 text-sm mt-1">{item.title}</h4>
              </div>
              <span className="text-xs text-cyan-400 font-semibold mt-3 block">{item.date}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
