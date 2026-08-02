import React from 'react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import { ShoppingBag, ArrowLeft, ArrowRight, Trash2, Plus, Minus } from 'lucide-react';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">

      {/* Title Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-white">
          Review Your Shopping Cart
        </h1>
        <p className="text-xs text-gray-400">
          Modify package volume or continue directly to place your secure manual order invoice.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-[#080811] border border-white/5 rounded-3xl p-8">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-gray-500">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">Your cart is currently empty</h3>
            <p className="text-gray-400 text-xs mt-1">
              Browse our official digital catalog to find high-end gaming licenses & top-up keys!
            </p>
          </div>
          <a
            href="/products"
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/10"
          >
            Start Browsing Games
          </a>
        </div>
      ) : (
        <div className="space-y-6">

          {/* Items Listing Box */}
          <div className="space-y-3">
            {cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedPackage}-${idx}`}
                className="bg-[#090911] border border-white/5 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
              >

                {/* Left Side: Photo + Name */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-950 flex-shrink-0">
                    <ProductImage product={item.product} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm line-clamp-1">{item.product.name}</h4>
                    <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
                      Package: {item.selectedPackage}
                    </span>
                    <div className="text-xs text-gray-400 sm:hidden mt-1">{formatPrice(item.price)}</div>
                  </div>
                </div>

                {/* Right Side: Price, Quantities and delete */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                  {/* Single unit price for desktop */}
                  <div className="hidden sm:block text-right">
                    <span className="text-xs text-gray-500">Unit Price</span>
                    <div className="text-xs font-bold text-white">{formatPrice(item.price)}</div>
                  </div>

                  {/* Qty Selector */}
                  <div className="flex items-center gap-3 bg-[#0d0d1a] border border-white/10 p-1.5 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedPackage, -1)}
                      className="w-6 h-6 rounded bg-white/5 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-black text-white px-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedPackage, 1)}
                      className="w-6 h-6 rounded bg-white/5 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Total price for quantity */}
                  <div className="text-right">
                    <span className="text-[10px] text-gray-500 block">Subtotal</span>
                    <span className="text-sm font-black text-white">{formatPrice(item.price * item.quantity)}</span>
                  </div>

                  {/* Trash action */}
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedPackage)}
                    className="p-1 text-gray-500 hover:text-red-400 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                </div>

              </div>
            ))}
          </div>

          {/* Pricing Summary Block */}
          <div className="bg-[#080811] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-bold block">Overall Cart Total</span>
              <span className="text-2xl font-black text-white">{formatPrice(getCartTotal())}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a
                href="/products"
                className="py-3 px-6 rounded-xl border border-white/10 hover:bg-white/5 text-gray-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors text-center"
              >
                Keep Shopping
              </a>
              <a
                href="/checkout"
                className="py-3 px-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-white text-xs font-black uppercase tracking-widest rounded-xl text-center flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/20"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
