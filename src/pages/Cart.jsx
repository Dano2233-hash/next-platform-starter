import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function Cart({ cart, onRemove, onUpdateQuantity }) {
  const total = cart.reduce((acc, item) => acc + item.selectedPackage.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
          <ShoppingBag className="h-8 w-8 text-white/30" />
        </div>
        <div className="space-y-1">
          <h2 className="text-sm font-black uppercase text-white">Your Cart is Empty</h2>
          <p className="text-xs text-white/40">You have not added any games or premium top-up bundles yet.</p>
        </div>
        <Link
          to="/products"
          className="inline-block px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase tracking-widest rounded-lg transition-all"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-1">
        <h1 className="text-xl font-black uppercase tracking-wider text-white">Shopping Cart Review</h1>
        <p className="text-xs text-white/50">Manage items and packages in your current purchase session.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Cart items listing (left) */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, idx) => (
            <div
              key={`${item.product.id}-${item.selectedPackage.name}-${idx}`}
              className="flex items-center justify-between p-4 bg-[#09090c] border border-white/5 rounded-lg gap-4"
            >
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded">
                  {item.product.platform}
                </span>
                <h3 className="font-bold text-sm text-white truncate mt-1.5">{item.product.name}</h3>
                <p className="text-xs text-white/50 mt-0.5">
                  Package: <strong className="text-purple-400">{item.selectedPackage.name}</strong>
                </p>
                <div className="text-xs font-black text-cyan-400 mt-2">
                  {formatPrice(item.selectedPackage.price)} <span className="text-[10px] text-white/40 font-normal">each</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center bg-black/40 border border-white/10 rounded overflow-hidden">
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.selectedPackage.name, -1)}
                    className="p-1.5 hover:bg-white/5 text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="px-3 text-xs font-extrabold text-white">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.selectedPackage.name, 1)}
                    className="p-1.5 hover:bg-white/5 text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[80px]">
                  <span className="text-sm font-black text-white block">
                    {formatPrice(item.selectedPackage.price * item.quantity)}
                  </span>
                </div>

                {/* Remove */}
                <button
                  onClick={() => onRemove(item.product.id, item.selectedPackage.name)}
                  className="p-2 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded transition-all cursor-pointer"
                  title="Remove"
                >
                  <Trash2 className="h-4.5 w-4.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Sidebar Summary (right) */}
        <div className="bg-[#09090c] border border-white/5 p-6 rounded-lg space-y-6 h-fit">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Checkout Summary</h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between text-white/60">
              <span>Subtotal</span>
              <span className="font-bold text-white">{formatPrice(total)}</span>
            </div>
            <div className="flex items-center justify-between text-white/60">
              <span>Delivery Cost</span>
              <span className="text-green-400 font-bold">FREE (INSTANT)</span>
            </div>
            <div className="border-t border-white/5 pt-3 flex items-center justify-between text-sm font-black">
              <span>Total Price</span>
              <span className="text-cyan-400">{formatPrice(total)}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Link
              to="/checkout"
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/10 active:scale-98 cursor-pointer"
            >
              Checkout Now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/products"
              className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold text-[11px] uppercase tracking-wider rounded-lg transition-all text-center block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
