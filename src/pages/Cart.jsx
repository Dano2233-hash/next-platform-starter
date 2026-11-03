import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="bg-[#0b1120] border border-slate-800 rounded-3xl p-12 text-center max-w-lg mx-auto my-12">
        <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-600">
          <ShoppingBag size={36} />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Your Cart is Currently Empty</h2>
        <p className="text-xs text-slate-400 mb-6 max-w-xs mx-auto">
          Explore gaming top-ups, paid Steam keys, and digital gift cards to fill your cart.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-cyan-950/40"
        >
          <span>Browse All Products</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your digital keys, packages, and quantities before proceeding to checkout.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-400 hover:text-rose-300 font-semibold self-start sm:self-auto flex items-center gap-1.5"
        >
          <Trash2 size={14} />
          <span>Clear Entire Cart</span>
        </button>
      </div>

      {/* Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-3">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="bg-[#0b1120] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-950 border border-slate-800">
                  <ProductImage
                    product={{
                      name: item.name,
                      image: item.image,
                      category: item.category,
                      platform: item.platform,
                    }}
                    height="h-20"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                      {item.platform}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">
                      {item.type}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-white">{item.name}</h3>
                  <p className="text-xs text-cyan-400 font-semibold">{item.selectedPackage}</p>
                  <p className="text-xs font-mono font-bold text-slate-300 mt-1">
                    {formatPrice(item.price)} each
                  </p>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-slate-800/80">
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-xl px-2.5 py-1">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="text-slate-400 hover:text-white p-1"
                    title="Decrease quantity"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="font-mono font-bold text-xs text-white w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="text-slate-400 hover:text-white p-1"
                    title="Increase quantity"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                <div className="text-right min-w-[90px]">
                  <span className="text-sm font-black text-cyan-400 font-mono">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="text-slate-400 hover:text-rose-400 transition-colors p-1"
                  title="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400"
            >
              <ArrowLeft size={14} />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-4 bg-[#0b1120] border border-slate-800 rounded-3xl p-6 space-y-5">
          <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Total Items</span>
              <span className="font-bold text-white font-mono">{cartCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Delivery Method</span>
              <span className="font-semibold text-emerald-400">Digital (Instant / WhatsApp)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Delivery Fee</span>
              <span className="font-bold text-emerald-400">0 IQD (Free)</span>
            </div>
            <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-sm font-bold text-white">Estimated Total</span>
              <span className="text-2xl font-black text-cyan-400 font-mono tracking-tight">
                {formatPrice(cartTotal)}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl shadow-cyan-950/50"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={16} />
          </button>

          <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck size={14} className="text-cyan-400 shrink-0" />
            <span>Guaranteed genuine digital codes. Manual checkout via FastPay, Korek, & MasterCard.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
