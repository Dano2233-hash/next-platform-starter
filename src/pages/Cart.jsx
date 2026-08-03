import React from 'react';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';

export default function Cart({ cart, onUpdateQuantity, onRemove, total }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between border-b border-[#121225] pb-4">
        <h1 className="text-xl font-black text-white uppercase tracking-wider">
          🛒 Your Shopping Cart
        </h1>
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-premium cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Continue Shopping
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="bg-[#090911] border border-[#121225] p-12 rounded-2xl text-center space-y-4">
          <span className="text-4xl block">🛍️</span>
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Your Cart is Empty</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
            There are no items currently in your cart. Choose from our digital top-ups, games, subscriptions, or gift cards to begin.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-[#0066ff] hover:bg-[#0055dd] text-xs font-bold text-white px-5 py-2.5 rounded-lg transition-premium uppercase"
          >
            Explore All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Cart Table list */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedPackage}`}
                className="bg-[#090911] border border-[#121225] p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 rounded bg-black overflow-hidden shrink-0">
                    <ProductImage product={item.product} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-white uppercase tracking-wider line-clamp-1">
                      {item.product.name}
                    </h3>
                    <p className="text-[10px] text-purple-400 font-semibold mt-0.5 uppercase tracking-wider">
                      🎁 Package: {item.selectedPackage}
                    </p>
                    <span className="text-[10px] text-gray-500 font-bold block mt-0.5">
                      Platform: {item.product.platform}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#121225]">
                  {/* Quantity Actions */}
                  <div className="flex items-center gap-2 bg-[#05050d] border border-[#121225] rounded px-2.5 py-1">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.selectedPackage, -1)}
                      className="text-gray-400 hover:text-[#00e5ff] transition-premium px-1 font-bold"
                    >
                      -
                    </button>
                    <span className="text-xs font-black text-white px-1">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.selectedPackage, 1)}
                      className="text-gray-400 hover:text-[#00e5ff] transition-premium px-1 font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="text-xs font-black text-[#00e5ff] tracking-tight">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                    <span className="text-[9px] text-gray-500 font-medium">
                      {formatPrice(item.product.price)} each
                    </span>
                  </div>

                  {/* Delete Option */}
                  <button
                    onClick={() => onRemove(item.product.id, item.selectedPackage)}
                    className="text-gray-500 hover:text-red-500 transition-premium p-1.5"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal card */}
          <div className="lg:col-span-4 bg-[#090911] border border-[#121225] p-5 rounded-xl space-y-4">
            <h3 className="text-xs font-black uppercase text-white tracking-widest border-b border-[#121225] pb-2.5">
              📋 Summary
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-gray-400 font-medium">
                <span>Total Items quantity</span>
                <span className="text-white font-bold">{cart.reduce((t, i) => t + i.quantity, 0)}</span>
              </div>
              <div className="flex justify-between text-gray-400 font-medium pb-2 border-b border-[#121225]/50">
                <span>Delivery Charge</span>
                <span className="text-[#00e5ff] font-bold uppercase tracking-wider text-[10px]">Free Digital</span>
              </div>
              <div className="flex justify-between items-baseline pt-2">
                <span className="text-gray-400 font-extrabold uppercase tracking-wider text-[10px]">Grand Total</span>
                <span className="text-base font-black text-[#00e5ff]">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full flex items-center justify-center bg-gradient-to-r from-[#0066ff] to-[#7000ff] hover:glow-blue text-white text-xs font-black py-3 rounded-lg uppercase tracking-wider transition-premium shadow-md"
            >
              Proceed to checkout
            </Link>
          </div>

        </div>
      )}
    </div>
  );
}
