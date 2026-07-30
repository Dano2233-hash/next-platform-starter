import React from 'react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import { ShoppingBag, Trash2, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Cart({ navigate }) {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="space-y-8 pb-16 text-left">
      <div>
        <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">Your Shopping Cart</h1>
        <p className="text-xs text-zinc-500 mt-1">Review your selected digital items before completing manual checkout.</p>
      </div>

      {cart.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-white/5 bg-[#08080c] rounded-3xl space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center text-zinc-500 mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Your cart is currently empty</h3>
            <p className="text-xs text-zinc-500 mt-1">Explore our premium catalog of digital top-ups and keys!</p>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Cart Items List Table (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item, index) => (
              <div
                key={`${item.productId}-${item.packageName || 'base'}-${index}`}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#0d0d12] border border-white/5 rounded-2xl gap-4"
              >
                {/* Product thumbnail & basic description */}
                <div className="flex items-center gap-4 text-left">
                  <div className="w-14 h-14 rounded-xl bg-zinc-900 overflow-hidden shrink-0 border border-white/5">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center font-bold text-xs">
                        {item.name[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.name}</h3>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-white/5 text-zinc-400 px-1.5 py-0.5 rounded">
                        {item.platform}
                      </span>
                      {item.packageName && (
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-cyan-950/40 text-cyan-400 border border-cyan-500/10 px-1.5 py-0.5 rounded">
                          {item.packageName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pricing, Quantity & Removal buttons */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-none border-white/5 pt-3 sm:pt-0">
                  {/* Quantity adjustment */}
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1">
                    <button
                      onClick={() => updateQuantity(item.productId, item.packageName, -1)}
                      className="w-6 h-6 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold px-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.packageName, 1)}
                      className="w-6 h-6 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal price display */}
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-zinc-500 block">Subtotal</span>
                    <span className="text-sm font-black text-[#00e5ff]">{formatPrice(item.price * item.quantity)}</span>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => removeFromCart(item.productId, item.packageName)}
                    className="text-zinc-500 hover:text-red-400 p-2 rounded-xl hover:bg-red-950/20 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Back to Shopping Button */}
            <button
              onClick={() => navigate('/products')}
              className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white transition-colors py-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
          </div>

          {/* Cart Pricing summary card (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-[#0d0d12] border border-white/5 p-6 rounded-3xl space-y-6 shadow-xl">
            <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-white/5 pb-3">Order Summary</h3>

            {/* Breakdown lines */}
            <div className="space-y-3.5 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="text-white font-bold">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Service Fee:</span>
                <span className="text-emerald-400 font-bold">0 IQD (Free)</span>
              </div>
              <div className="flex justify-between">
                <span>Tax Rate:</span>
                <span className="text-white font-bold">0.00%</span>
              </div>

              <div className="border-t border-white/5 pt-4 flex justify-between text-sm font-black text-white">
                <span>Total Amount:</span>
                <span className="text-base text-[#00e5ff]">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Trust disclaimer */}
            <div className="bg-[#050505] border border-white/5 p-3 rounded-2xl flex gap-2 text-[11px] leading-relaxed text-zinc-500">
              <ShieldCheck className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
              <span>Manual processing only. There are no automated credit card or online payment charges on this platform.</span>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black py-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/10 uppercase tracking-widest transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
