import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ShieldCheck, Zap, Award, Smartphone, CreditCard, Layers } from 'lucide-react';
import ProductSection from '../components/ProductSection';
import { useProducts } from '../hooks/useProducts';

const Home = () => {
  const { products } = useProducts();

  const featured = products.filter(p => p.isFeatured);
  const trending = products.filter(p => p.isTrending);
  const flashDeals = products.filter(p => p.isFlashDeal);
  const topRated = products.filter(p => p.isTopRated);
  const xbox = products.filter(p => p.category === 'Xbox');
  const playstation = products.filter(p => p.category === 'PlayStation');
  const pc = products.filter(p => p.category === 'PC');
  const mobile = products.filter(p => p.category === 'Mobile');
  const giftCards = products.filter(p => p.category === 'Gift Cards');
  const subscriptions = products.filter(p => p.category === 'Subscriptions');

  return (
    <div className="pb-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent-blue/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent-cyan text-xs font-bold uppercase tracking-wider mb-6">
              <Zap size={14} /> The #1 Gaming Store in Kurdistan
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              Level Up Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue">Gaming Experience</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
              Get instant delivery for games, gift cards, and mobile top-ups. Professional service, secure payments, and 24/7 support.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/products" className="bg-accent-blue hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-xl shadow-xl shadow-accent-blue/25 transition-all flex items-center gap-2">
                <Play size={18} fill="currentColor" /> Shop Now
              </Link>
              <Link to="/products?category=Gift Cards" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-4 px-10 rounded-xl transition-all">
                Gift Cards
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Icons */}
      <section className="py-10 border-y border-white/5 bg-navy-800/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'PC Games', icon: Layers, path: '/products?platform=PC' },
              { name: 'Xbox', icon: ShieldCheck, path: '/products?platform=Xbox' },
              { name: 'PlayStation', icon: Award, path: '/products?platform=PlayStation' },
              { name: 'Mobile', icon: Smartphone, path: '/products?platform=Mobile' },
              { name: 'Gift Cards', icon: CreditCard, path: '/products?category=Gift Cards' },
              { name: 'Subscriptions', icon: Zap, path: '/products?category=Subscriptions' },
            ].map((item, i) => (
              <Link key={i} to={item.path} className="glass-card p-6 flex flex-col items-center justify-center text-center hover:border-accent-cyan/30 transition-all group">
                <item.icon className="text-accent-blue mb-3 group-hover:scale-110 transition-transform" size={28} />
                <span className="text-sm font-bold text-white uppercase tracking-tighter">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product Sections */}
      <ProductSection
        title="Featured Now"
        subtitle="The hottest picks selected just for you"
        products={featured.slice(0, 5)}
        link="/products"
      />

      <ProductSection
        title="Flash Deals"
        subtitle="Limited time offers with massive discounts"
        products={flashDeals.slice(0, 5)}
        link="/products?filter=flash"
        className="bg-navy-800/20"
      />

      <ProductSection
        title="Trending"
        subtitle="Most popular items this week"
        products={trending.slice(0, 5)}
        link="/products?filter=trending"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-accent-blue to-accent-purple rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
           <div className="relative z-10 text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Join our Discord Community</h2>
              <p className="text-blue-100 mb-8 max-w-lg">Get exclusive codes, participate in giveaways, and get instant support from our team.</p>
              <a href="#" className="bg-white text-accent-blue font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
                Join Now
              </a>
           </div>
           <div className="relative z-10 w-full md:w-1/3">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full animate-pulse" />
                    <div>
                       <div className="h-3 w-24 bg-white/30 rounded mb-2" />
                       <div className="h-2 w-16 bg-white/20 rounded" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="h-2 w-full bg-white/10 rounded" />
                    <div className="h-2 w-full bg-white/10 rounded" />
                    <div className="h-2 w-2/3 bg-white/10 rounded" />
                 </div>
              </div>
           </div>
        </div>
      </div>

      <ProductSection
        title="Mobile Top-Ups"
        subtitle="Instant UC, Diamonds, and more for your favorite mobile games"
        products={mobile.slice(0, 5)}
        link="/products?platform=Mobile"
      />

      <ProductSection
        title="PC Gaming"
        subtitle="The best AAA titles and indie gems"
        products={pc.slice(0, 5)}
        link="/products?platform=PC"
        className="bg-navy-800/20"
      />

      <ProductSection
        title="PlayStation & Xbox"
        subtitle="Exclusive console games and memberships"
        products={[...playstation, ...xbox].slice(0, 5)}
        link="/products"
      />

      <ProductSection
        title="Gift Cards"
        subtitle="Steam, PlayStation, Xbox, and more"
        products={giftCards.slice(0, 5)}
        link="/products?category=Gift Cards"
        className="bg-navy-800/20"
      />

      <ProductSection
        title="Subscriptions"
        subtitle="Netflix, Spotify, Discord Nitro, and more"
        products={subscriptions.slice(0, 5)}
        link="/products?category=Subscriptions"
      />
    </div>
  );
};

export default Home;
