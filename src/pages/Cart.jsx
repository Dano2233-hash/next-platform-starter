import React from 'react';
import { ShoppingBag, Trash2, ArrowRight, Minus, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';

export default function Cart({ cart, onRemove, onUpdateQuantity, total }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-20">
      <div className="border-b border-slate-900 pb-5">
        <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Shopping Cart</h1>
        <p className="text-xs text-slate-400 mt-1">Review the digital game keys and top-ups before paying manually</p>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-950/40 border border-slate-900 p-8 rounded-3xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-center text-slate-500 mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-base font-extrabold text-white uppercase tracking-wider">Your Cart is Empty</h2>
          <p className="text-xs text-slate-500 mt-2 max-w-xs leading-relaxed">
            Browse our catalog to select your favorite games, PUBG UC bundles, or premium cards!
          </p>
          <Link
            to="/products"
            className="mt-6 bg-[#0066ff] hover:bg-[#0055dd] text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#0066ff]/20"
          >
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Items list */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-4 p-5 rounded-2xl bg-[#09090c] border border-slate-900/80 hover:border-slate-800 transition-colors items-start sm:items-center justify-between"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-900 bg-slate-900 flex items-center justify-center shrink-0">
                    {item.product.image ? (
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-blue-900 to-black flex items-center justify-center font-black text-xs text-[#00e5ff]">
                        {item.product.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-extrabold text-white text-sm hover:text-[#00e5ff] transition-colors line-clamp-1">
                      {item.product.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                      Pkg: {item.selectedPackageName}
                    </p>
                    <p className="text-xs text-[#00e5ff] font-bold mt-1">
                      {formatPrice(item.price)} each
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 border-slate-900 pt-3 sm:pt-0">
                  {/* Quantity */}
                  <div className="flex items-center border border-slate-800 rounded-lg bg-slate-950 overflow-hidden">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="px-2.5 py-1.5 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-bold text-slate-200">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="px-2.5 py-1.5 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Total & Remove */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-black text-white shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-red-500/10 text-slate-500 hover:text-red-500 border border-slate-900 hover:border-red-500/20 transition-all cursor-pointer"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-4 bg-[#08080b] border border-slate-900 p-6 rounded-3xl space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-white border-b border-slate-900 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs font-bold text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} item types)</span>
                <span className="text-slate-200">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Processing Fee</span>
                <span className="text-emerald-400 font-extrabold uppercase">Free Delivery</span>
              </div>
            </div>

            <div className="border-t border-slate-900 pt-4 flex justify-between items-baseline">
              <span className="text-sm font-bold text-white uppercase tracking-wider">Total Amount</span>
              <span className="text-2xl font-black text-[#00e5ff]">{formatPrice(total)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full flex items-center justify-center gap-2 bg-[#0066ff] hover:bg-[#0055dd] text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-[#0066ff]/20 group cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
