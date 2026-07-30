import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductSection from '../components/ProductSection';
import SectionHeader from '../components/SectionHeader';
import { Gamepad2, Shield, Zap, Sparkles, Gamepad, Monitor, Smartphone, Ticket } from 'lucide-react';

export default function Home({ navigate, onProductSelect }) {
  const { products } = useProducts();
  const { addToCart } = useCart();

  // Filter sections
  const featured = products.filter((p) => p.isFeatured).slice(0, 5);
  const flashDeals = products.filter((p) => p.isFlashDeal).slice(0, 5);
  const trending = products.filter((p) => p.isTrending).slice(0, 5);
  const topRated = products.filter((p) => p.isTopRated).slice(0, 5);

  const xboxProducts = products.filter((p) => p.category === 'xbox').slice(0, 5);
  const psProducts = products.filter((p) => p.category === 'playstation').slice(0, 5);
  const pcProducts = products.filter((p) => p.category === 'pc').slice(0, 5);
  const mobileProducts = products.filter((p) => p.category === 'mobile').slice(0, 5);
  const cardProducts = products.filter((p) => p.category === 'gift-cards').slice(0, 5);
  const subProducts = products.filter((p) => p.category === 'subscriptions').slice(0, 5);

  const handleAddToCart = (product) => {
    if (product.packages && product.packages.length > 0) {
      // If product has packages, go to detail page to select packages
      onProductSelect(product);
      navigate('/products/' + product.slug);
    } else {
      addToCart(product, null, 1);
      alert(`${product.name} added to cart!`);
    }
  };

  const handleBuyNow = (product) => {
    if (product.packages && product.packages.length > 0) {
      onProductSelect(product);
      navigate('/products/' + product.slug);
    } else {
      addToCart(product, null, 1);
      navigate('/checkout');
    }
  };

  const handleViewDetails = (product) => {
    onProductSelect(product);
    navigate('/products/' + product.slug);
  };

  return (
    <div className="space-y-12 pb-16">

      {/* Hero / Featured section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0c0d19] via-[#050505] to-[#050505] rounded-3xl border border-white/5 p-8 md:p-16 text-left">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/40 text-xs font-black text-blue-400 border border-blue-500/20 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Premium Gaming Store in Kurdistan</span>
          </span>

          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight uppercase">
            Elevate Your Gaming <br />
            With <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-blue-500 to-purple-600">Dano Store</span>
          </h1>

          <p className="text-sm md:text-base text-zinc-400 max-w-xl leading-relaxed">
            Get instant codes for game top-ups, subscriptions, gift cards, and premium keys. Tested and trusted with 24/7 local support.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => navigate('/products')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-black px-8 py-3.5 rounded-2xl shadow-lg shadow-blue-500/10 uppercase tracking-wider transition-all"
            >
              Explore Products
            </button>
            <button
              onClick={() => navigate('/gift-cards')}
              className="bg-white/5 hover:bg-white/10 text-white text-xs font-black px-8 py-3.5 rounded-2xl border border-white/5 transition-all"
            >
              Buy Gift Cards
            </button>
          </div>
        </div>

        {/* Floating Features Bar */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/5 pt-8">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/30 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Instant Activation</h4>
              <p className="text-[11px] text-zinc-500 mt-0.5">Automated codes directly to your device.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/30 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">100% Legal Keys</h4>
              <p className="text-[11px] text-zinc-500 mt-0.5">Fully authorized digital distributors.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">No F2P Base Markups</h4>
              <p className="text-[11px] text-zinc-500 mt-0.5">We only sell legal UC, points, and items.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section className="text-left space-y-4">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">Store Quick Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {[
            { name: 'PC Games', path: '/pc', icon: Monitor, bg: 'from-blue-600/10 to-blue-900/10 border-blue-500/10' },
            { name: 'Xbox Cards & Keys', path: '/xbox', icon: Gamepad, bg: 'from-green-600/10 to-green-900/10 border-green-500/10' },
            { name: 'PlayStation Store', path: '/playstation', icon: Gamepad2, bg: 'from-indigo-600/10 to-indigo-900/10 border-indigo-500/10' },
            { name: 'Mobile Top-Ups', path: '/mobile', icon: Smartphone, bg: 'from-cyan-600/10 to-cyan-900/10 border-cyan-500/10' },
            { name: 'Gift Cards', path: '/gift-cards', icon: Ticket, bg: 'from-amber-600/10 to-amber-900/10 border-amber-500/10' },
            { name: 'Subscriptions', path: '/subscriptions', icon: Sparkles, bg: 'from-purple-600/10 to-purple-900/10 border-purple-500/10' },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                onClick={() => navigate(cat.path)}
                className={`cursor-pointer bg-gradient-to-br ${cat.bg} border p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-3 hover:scale-103 transition-all duration-300 group`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">{cat.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Dynamic Sections Grid */}
      <div className="space-y-12">
        {/* Flash Deals */}
        <ProductSection
          title="Flash Deals"
          subtitle="Time-limited premium gaming deals. Best rates across Kurdistan."
          badge="Limited Offers"
          products={flashDeals}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onViewDetails={handleViewDetails}
          onSeeAll={() => navigate('/products')}
        />

        {/* Featured Products */}
        <ProductSection
          title="Featured Products"
          subtitle="Top selected digital gaming licenses this month."
          badge="Featured"
          products={featured}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onViewDetails={handleViewDetails}
          onSeeAll={() => navigate('/products')}
        />

        {/* New & Trending */}
        <ProductSection
          title="New & Trending"
          subtitle="Recently added legal games, tokens, and upgrades."
          badge="Trending Now"
          products={trending}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onViewDetails={handleViewDetails}
          onSeeAll={() => navigate('/products')}
        />

        {/* Top Rated */}
        <ProductSection
          title="Top Rated"
          subtitle="Highest user-rated items by the Iraqi gaming community."
          badge="Top Rated"
          products={topRated}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onViewDetails={handleViewDetails}
          onSeeAll={() => navigate('/products')}
        />

        {/* Mobile Top-Ups section */}
        <ProductSection
          title="Mobile Top-Ups & Coins"
          subtitle="UC, V-Bucks, Diamonds, and CP. Fast game-account transfer."
          badge="Mobile Top-Ups"
          products={mobileProducts}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onViewDetails={handleViewDetails}
          onSeeAll={() => navigate('/mobile')}
        />

        {/* PC Section */}
        <ProductSection
          title="PC Gaming Section"
          subtitle="Legal digital keys and activation codes for Steam and Epic."
          badge="PC Store"
          products={pcProducts}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onViewDetails={handleViewDetails}
          onSeeAll={() => navigate('/pc')}
        />

        {/* Xbox section */}
        <ProductSection
          title="Xbox Section"
          subtitle="Xbox digital games, passes, and wallet top-ups."
          badge="Xbox Store"
          products={xboxProducts}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onViewDetails={handleViewDetails}
          onSeeAll={() => navigate('/xbox')}
        />

        {/* PlayStation section */}
        <ProductSection
          title="PlayStation Section"
          subtitle="PlayStation network activation codes and exclusives."
          badge="PlayStation Store"
          products={psProducts}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onViewDetails={handleViewDetails}
          onSeeAll={() => navigate('/playstation')}
        />

        {/* Gift Cards section */}
        <ProductSection
          title="Gift Cards Section"
          subtitle="Official wallet vouchers for App Store, Play Store, Razer, and Steam."
          badge="Gift Cards"
          products={cardProducts}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onViewDetails={handleViewDetails}
          onSeeAll={() => navigate('/gift-cards')}
        />

        {/* Subscriptions section */}
        <ProductSection
          title="Subscriptions Section"
          subtitle="Premium licenses for Discord Nitro, YouTube, Netflix, and Canva."
          badge="Subscriptions"
          products={subProducts}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onViewDetails={handleViewDetails}
          onSeeAll={() => navigate('/subscriptions')}
        />

        {/* Coming Soon Section */}
        <section className="bg-gradient-to-br from-[#0c0d19] to-[#050505] border border-white/5 p-8 rounded-3xl text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
          <div className="max-w-xl space-y-4">
            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest bg-purple-950/40 px-2.5 py-1 rounded-md border border-purple-500/20">
              Coming Soon
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white">GTA VI Activation & Pre-Orders</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              We are working directly with official regional gaming key providers to guarantee the lowest pre-order prices for Grand Theft Auto VI across Iraq. Stay tuned!
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
