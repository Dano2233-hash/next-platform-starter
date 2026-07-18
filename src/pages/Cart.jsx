import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function Cart({ cartState }) {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal } = cartState;

  if (cart.length === 0) {
    return (
      <div className="py-24 text-center space-y-6">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#0a0f1d]/50 text-cyan-400 border border-blue-500/10 shadow">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">Your Cart is Empty</h1>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            You don't have any items in your cart. Head back to the store to explore game keys, top-ups, and more.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-xs font-black uppercase text-white shadow hover:from-blue-500 hover:to-cyan-400 transition"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left">
      <div className="border-b border-blue-500/10 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          SHOPPING CART
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Review your items and complete order processing for Kurdistan & Iraq delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Items list */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => {
            const pkgId = item.selectedPackage?.id || 'base';
            const price = item.selectedPackage ? item.selectedPackage.price : item.product.price;
            const itemTotal = price * item.quantity;
            return (
              <div
                key={`${item.product.id}-${pkgId}`}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0a0f1d]/50 border border-blue-500/5 hover:border-blue-500/10 transition"
              >
                {/* Visual block representation */}
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-xl bg-gradient-to-tr from-blue-900 to-cyan-950 border border-white/5 flex items-center justify-center text-xs font-bold text-cyan-400 flex-shrink-0 shadow">
                    {item.selectedPackage ? 'PKG' : 'GAME'}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base leading-snug">{item.product.name}</h3>
                    <p className="text-xs text-gray-400 font-semibold">{item.product.platform} • {item.product.type}</p>
                    {item.selectedPackage && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-cyan-950 text-cyan-400 border border-cyan-800/20">
                        Option: {item.selectedPackage.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing and Controls */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                  <span className="text-base font-black text-white">
                    {formatPrice(itemTotal)}
                  </span>

                  <div className="flex items-center gap-4">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 bg-black/40 rounded-lg border border-white/5 p-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, pkgId, item.quantity - 1)}
                        className="p-1 text-gray-400 hover:text-white hover:bg-white/5 rounded"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-xs font-black px-2 text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, pkgId, item.quantity + 1)}
                        className="p-1 text-gray-400 hover:text-white hover:bg-white/5 rounded"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id, pkgId)}
                      className="p-2 text-gray-500 hover:text-rose-400 transition hover:bg-white/5 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Order summary */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-2xl bg-[#0a0f1d]/50 border border-blue-500/10 space-y-6">
            <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-white/[0.04] pb-2">
              ORDER SUMMARY
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} Items)</span>
                <span className="font-semibold text-white">{formatPrice(getCartTotal())}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping / Delivery</span>
                <span className="font-extrabold text-emerald-400 uppercase">FREE / INSTANT</span>
              </div>
              <div className="border-t border-white/[0.03] pt-3 flex justify-between text-sm">
                <span className="font-bold text-gray-300">Grand Total</span>
                <span className="font-black text-cyan-400 text-lg">{formatPrice(getCartTotal())}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-xs font-black uppercase text-white shadow-lg shadow-cyan-950/40 hover:from-blue-500 hover:to-cyan-400 transition flex items-center justify-center gap-1.5"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
