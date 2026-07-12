import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, ShieldCheck, Zap, Globe, Clock, ChevronRight } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import NotFound from './NotFound';

const ProductDetails = () => {
  const { slug } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find(p => p.slug === slug);

  if (!product) return <NotFound />;

  const [selectedPackage, setSelectedPackage] = useState(product.packages[0]);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedPackage);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-8 uppercase tracking-widest">
        <Link to="/" className="hover:text-accent-cyan">Home</Link>
        <ChevronRight size={12} />
        <Link to={`/products?category=${product.category}`} className="hover:text-accent-cyan">{product.category}</Link>
        <ChevronRight size={12} />
        <span className="text-gray-300">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Image & Info */}
        <div className="lg:col-span-5">
          <div className="sticky top-28">
            <ProductImage
              src={product.image}
              alt={product.name}
              productName={product.name}
              category={product.category}
              platform={product.platform}
              className="aspect-video lg:aspect-square shadow-2xl border border-white/5"
            />

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="glass-card p-4 flex flex-col items-center text-center">
                <ShieldCheck className="text-accent-cyan mb-2" size={24} />
                <span className="text-white text-sm font-bold">100% Legal</span>
                <span className="text-gray-500 text-xs">Official Keys</span>
              </div>
              <div className="glass-card p-4 flex flex-col items-center text-center">
                <Zap className="text-accent-cyan mb-2" size={24} />
                <span className="text-white text-sm font-bold">Instant</span>
                <span className="text-gray-500 text-xs">Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Selection & Details */}
        <div className="lg:col-span-7">
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
               <span className="bg-accent-blue/10 text-accent-blue text-[10px] font-bold px-2 py-1 rounded uppercase border border-accent-blue/20">
                 {product.platform}
               </span>
               <span className="bg-accent-purple/10 text-accent-purple text-[10px] font-bold px-2 py-1 rounded uppercase border border-accent-purple/20">
                 {product.type}
               </span>
               <span className="bg-white/5 text-gray-400 text-[10px] font-bold px-2 py-1 rounded uppercase border border-white/10">
                 Digital Download
               </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">{product.name}</h1>
            <div className="flex items-center gap-6 text-sm">
               <div className="flex items-center text-yellow-500">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                 ))}
                 <span className="text-white font-bold ml-2">{product.rating}</span>
               </div>
               <div className="text-gray-400">
                 <span className="text-white font-bold">{product.soldCount}+</span> Sold
               </div>
               <div className={`font-bold ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                 {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
               </div>
            </div>
          </div>

          <div className="glass-card p-8 mb-8">
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Select Package</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {product.packages.map((pkg) => (
                <button
                  key={pkg.name}
                  onClick={() => setSelectedPackage(pkg)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedPackage.name === pkg.name
                    ? 'border-accent-blue bg-accent-blue/10'
                    : 'border-white/5 bg-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="text-white font-bold text-sm mb-1">{pkg.name}</div>
                  <div className="text-accent-cyan font-bold">{formatPrice(pkg.price)}</div>
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:w-auto">
                 <div className="text-gray-400 text-xs mb-1 uppercase font-bold tracking-tighter">Total Price</div>
                 <div className="text-white text-3xl font-extrabold">{formatPrice(selectedPackage.price)}</div>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 w-full flex items-center justify-center gap-3 font-extrabold py-5 rounded-2xl shadow-xl transition-all ${
                  product.stock === 0
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : isAdded
                    ? 'bg-green-600 text-white'
                    : 'bg-accent-blue hover:bg-blue-600 text-white shadow-accent-blue/20'
                }`}
              >
                <ShoppingCart size={22} />
                {isAdded ? 'Added to Cart!' : 'Add to Cart'}
              </button>
            </div>
          </div>

          <div className="space-y-8">
             <div>
               <h3 className="text-white font-bold text-xl mb-4 border-l-4 border-accent-cyan pl-4">Product Description</h3>
               <p className="text-gray-400 leading-relaxed">{product.description}</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                   <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-accent-cyan shrink-0">
                     <Globe size={20} />
                   </div>
                   <div>
                     <h4 className="text-white font-bold text-sm">Region Free</h4>
                     <p className="text-gray-500 text-xs">Can be activated globally</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-accent-cyan shrink-0">
                     <Clock size={20} />
                   </div>
                   <div>
                     <h4 className="text-white font-bold text-sm">Instant Access</h4>
                     <p className="text-gray-500 text-xs">Delivered within minutes</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
