import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Users } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { id, name, category, platform, type, price, oldPrice, image, stock, rating, soldCount, tag } = product;

  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  const isOutOfStock = stock === 0;

  return (
    <div className="glass-card overflow-hidden group flex flex-col h-full hover:border-accent-cyan/30 transition-all duration-300">
      {/* Image Area */}
      <div className="relative h-48 sm:h-56">
        <ProductImage
          src={image}
          alt={name}
          productName={name}
          category={category}
          platform={platform}
          className="h-full"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {tag && (
            <span className="bg-accent-purple text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg uppercase tracking-wider">
              {tag}
            </span>
          )}
          {discount > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg uppercase tracking-wider">
              {discount}% OFF
            </span>
          )}
        </div>

        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="bg-dark-900/80 backdrop-blur-md text-white text-[9px] font-bold px-2 py-1 rounded border border-white/10 uppercase">
            {platform}
          </span>
          <span className="bg-dark-900/80 backdrop-blur-md text-accent-cyan text-[9px] font-bold px-2 py-1 rounded border border-white/10 uppercase">
            {type}
          </span>
        </div>

        {isOutOfStock && (
          <div className="absolute inset-0 bg-dark-900/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-red-600 text-white font-bold py-1 px-4 rounded-full text-xs uppercase">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product.slug}`} className="hover:text-accent-cyan transition-colors">
          <h3 className="text-white font-bold text-base mb-1 line-clamp-1">{name}</h3>
        </Link>
        <p className="text-gray-400 text-xs mb-3 line-clamp-1">{product.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-[11px] text-gray-400">
            <Star size={12} className="text-yellow-500 fill-yellow-500 mr-1" />
            <span className="font-bold text-white mr-2">{rating}</span>
            <Users size={12} className="mr-1" />
            <span>{soldCount}+ sold</span>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-accent-cyan font-bold text-lg">
              {type === 'Top-Up' || product.packages.length > 1 ? 'From ' : ''}
              {formatPrice(price)}
            </span>
            {oldPrice && (
              <span className="text-gray-500 text-xs line-through">{formatPrice(oldPrice)}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/product/${product.slug}`}
              className="bg-white/5 hover:bg-white/10 text-white text-xs font-bold py-2 px-3 rounded-lg border border-white/10 text-center transition-all"
            >
              Details
            </Link>
            <button
              onClick={() => !isOutOfStock && addToCart(product, product.packages[0])}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-2 text-xs font-bold py-2 px-3 rounded-lg transition-all ${
                isOutOfStock
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-accent-blue hover:bg-blue-600 text-white shadow-lg shadow-accent-blue/20'
              }`}
            >
              <ShoppingCart size={14} />
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
