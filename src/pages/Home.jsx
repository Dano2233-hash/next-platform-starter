import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Star, TrendingUp, Zap, Smartphone, Landmark, ShieldCheck } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { SectionHeader } from '../components/SectionHeader';
import { ProductSection } from '../components/ProductSection';

export function Home({ products, onAddToCart }) {
  // Homepage dynamic sections mapping
  const featured = products.filter((p) => p.isFeatured).slice(0, 4);
  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 4);
  const trending = products.filter((p) => p.isTrending).slice(0, 4);
  const topRated = products.filter((p) => p.isTopRated).slice(0, 4);

  // Platform/Category sections
  const xboxSec = products.filter((p) => p.platform === 'Xbox').slice(0, 4);
  const playstationSec = products.filter((p) => p.platform === 'PlayStation').slice(0, 4);
  const pcSec = products.filter((p) => p.platform === 'PC' && p.type === 'Game').slice(0, 4);
  const mobileSec = products.filter((p) => p.category === 'mobile').slice(0, 4);
  const giftcardsSec = products.filter((p) => p.category === 'giftcards').slice(0, 4);
  const subSec = products.filter((p) => p.category === 'subscriptions').slice(0, 4);

  return (
    <div className="space-y-12 pb-16">

      {/* Premium Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-[#090911] border border-[#12121e] px-6 py-12 sm:px-12 sm:py-20 text-left">
        {/* Gradients */}
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#0066ff]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#7000ff]/10 blur-3xl" />

        <div className="relative max-w-2xl space-y-6 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0066ff]/10 border border-[#0066ff]/30 px-3 py-1 text-xs font-bold text-[#00e5ff]">
            <Sparkles size={13} />
            <span>Premium Kurdistan & Iraq Gateway</span>
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white sm:text-5xl leading-tight">
            Level Up Your Digital <span className="text-gradient-purple-blue">Gaming Arsenal</span>
          </h1>
          <p className="text-sm text-gray-400 max-w-lg leading-relaxed font-medium">
            Discover official game codes, instant mobile points recharge, wallet cards, and memberships. High-security manual payments verified in Erbil, Sulaymaniyah, and Duhok.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/products"
              className="rounded-xl bg-gradient-to-r from-[#0066ff] to-[#7000ff] px-6 py-3 text-xs font-black uppercase tracking-wider text-white hover:opacity-90 transition shadow-lg premium-glow-blue"
            >
              Explore Products
            </Link>
            <Link
              to="/products?category=giftcards"
              className="rounded-xl border border-[#1e1e2d] bg-[#0c0c14] px-6 py-3 text-xs font-bold text-gray-300 hover:bg-[#12121e] hover:text-white transition"
            >
              Buy Gift Cards
            </Link>
          </div>
        </div>
      </section>

      {/* Grid of Store benefits */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#12121e] bg-[#07070d] p-5 text-left flex gap-4 items-start">
          <div className="rounded-lg bg-[#0066ff]/10 p-2 text-[#00e5ff]">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase text-white tracking-wide">100% Secure Manual Validation</h3>
            <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">Each transaction is personally audited and verified by our Kurdish regional support team.</p>
          </div>
        </div>
        <div className="rounded-xl border border-[#12121e] bg-[#07070d] p-5 text-left flex gap-4 items-start">
          <div className="rounded-lg bg-[#7000ff]/10 p-2 text-purple-400">
            <Landmark size={20} />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase text-white tracking-wide">Local Payment Integrations</h3>
            <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">No foreign fees or complex gateways. Settle securely via FastPay, Korek, and MasterCard.</p>
          </div>
        </div>
        <div className="rounded-xl border border-[#12121e] bg-[#07070d] p-5 text-left flex gap-4 items-start">
          <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
            <Zap size={20} />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase text-white tracking-wide">Rapid Manual Delivery</h3>
            <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">Receive your premium keys or direct game credit transfers immediately after sending receipts.</p>
          </div>
        </div>
      </section>

      {/* Hero Featured Sections */}
      {featured.length > 0 && (
        <ProductSection
          title="Featured Deals"
          subtitle="Handpicked gaming solutions, gift cards, and memberships"
          badge="Dano Recommends"
          products={featured}
          onAddToCart={onAddToCart}
        />
      )}

      {/* Category Quick Row links */}
      <section className="py-4 border-y border-[#12121d]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-gray-400">Browse Quick Categories:</span>
          <div className="flex flex-wrap gap-2">
            <Link to="/products?category=mobile" className="rounded-full bg-[#12121e] border border-[#1e1e2d] px-4 py-1.5 text-xs font-bold text-gray-300 hover:text-[#00e5ff] hover:border-[#00e5ff]/50 transition">Mobile Top-Ups</Link>
            <Link to="/products?category=giftcards" className="rounded-full bg-[#12121e] border border-[#1e1e2d] px-4 py-1.5 text-xs font-bold text-gray-300 hover:text-[#00e5ff] hover:border-[#00e5ff]/50 transition">Gift Cards</Link>
            <Link to="/products?category=subscriptions" className="rounded-full bg-[#12121e] border border-[#1e1e2d] px-4 py-1.5 text-xs font-bold text-gray-300 hover:text-[#00e5ff] hover:border-[#00e5ff]/50 transition">Subscriptions</Link>
            <Link to="/products?platform=PC" className="rounded-full bg-[#12121e] border border-[#1e1e2d] px-4 py-1.5 text-xs font-bold text-gray-300 hover:text-[#00e5ff] hover:border-[#00e5ff]/50 transition">PC Gaming</Link>
            <Link to="/products?platform=Xbox" className="rounded-full bg-[#12121e] border border-[#1e1e2d] px-4 py-1.5 text-xs font-bold text-gray-300 hover:text-[#00e5ff] hover:border-[#00e5ff]/50 transition">Xbox Store</Link>
            <Link to="/products?platform=PlayStation" className="rounded-full bg-[#12121e] border border-[#1e1e2d] px-4 py-1.5 text-xs font-bold text-gray-300 hover:text-[#00e5ff] hover:border-[#00e5ff]/50 transition">PlayStation Store</Link>
          </div>
        </div>
      </section>

      {/* Coming Soon Teaser */}
      <section className="rounded-xl bg-[#090910] border border-[#12121e] p-6 text-left relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <span className="rounded bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 text-[10px] font-black uppercase text-yellow-500">Coming Soon to Kurdistan</span>
          <h2 className="text-lg font-black uppercase tracking-wide text-white">GTA VI Pre-Orders & Special Editions</h2>
          <p className="text-xs text-gray-400 max-w-md">Stay tuned! Pre-orders will accept payment validation via Korek and FastPay instantly when official Rockstar pre-orders open.</p>
        </div>
        <div className="shrink-0 z-10">
          <button className="rounded-lg bg-[#12121e] border border-[#1e1e2d] text-gray-400 px-4 py-2.5 text-xs font-bold pointer-events-none uppercase">Stay Updated</button>
        </div>
      </section>

      {/* Flash Deals Section */}
      {flashDeals.length > 0 && (
        <ProductSection
          title="Flash Deals"
          subtitle="Strictly limited-time discounts for rapid purchase"
          badge="Limited Offers"
          products={flashDeals}
          onAddToCart={onAddToCart}
        />
      )}

      {/* New & Trending Section */}
      {trending.length > 0 && (
        <ProductSection
          title="New & Trending"
          subtitle="Top releases circulating in regional gaming clubs & cafes"
          badge="Sizzling Hot"
          products={trending}
          onAddToCart={onAddToCart}
        />
      )}

      {/* Top Rated Section */}
      {topRated.length > 0 && (
        <ProductSection
          title="Top Rated Keys"
          subtitle="Critically acclaimed titles with exceptional reviews"
          badge="Legendary Quality"
          products={topRated}
          onAddToCart={onAddToCart}
        />
      )}

      {/* Mobile Top-Ups Section */}
      {mobileSec.length > 0 && (
        <ProductSection
          title="Mobile Top-Ups"
          subtitle="UC, Diamonds, CP, Points for Free-to-Play titles"
          badge="Currency & Recharges"
          products={mobileSec}
          onAddToCart={onAddToCart}
        />
      )}

      {/* Gift Cards Section */}
      {giftcardsSec.length > 0 && (
        <ProductSection
          title="Wallet Gift Cards"
          subtitle="Steam, Google Play, Apple, Xbox, PSN, and Amazon Codes"
          badge="Gift Cards"
          products={giftcardsSec}
          onAddToCart={onAddToCart}
        />
      )}

      {/* Subscriptions Section */}
      {subSec.length > 0 && (
        <ProductSection
          title="Premium Memberships"
          subtitle="Discord Nitro, YouTube Premium, Netflix, Spotify and Canva"
          badge="Digital Subscriptions"
          products={subSec}
          onAddToCart={onAddToCart}
        />
      )}

      {/* Xbox Section */}
      {xboxSec.length > 0 && (
        <ProductSection
          title="Xbox Catalog"
          subtitle="Digital licenses & gift cards for Xbox console systems"
          badge="Xbox Ecosystem"
          products={xboxSec}
          onAddToCart={onAddToCart}
        />
      )}

      {/* PlayStation Section */}
      {playstationSec.length > 0 && (
        <ProductSection
          title="PlayStation Catalog"
          subtitle="Digital codes & premium expansion passes for PS4 & PS5"
          badge="PlayStation Ecosystem"
          products={playstationSec}
          onAddToCart={onAddToCart}
        />
      )}

      {/* PC Gaming Section */}
      {pcSec.length > 0 && (
        <ProductSection
          title="PC Gaming Store"
          subtitle="Official activation licenses for Steam, Epic and Battle.net"
          badge="PC Gaming Ecosystem"
          products={pcSec}
          onAddToCart={onAddToCart}
        />
      )}

    </div>
  );
}
