import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 shadow-xl">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-white">Your Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Looks like you haven't added any games, top-ups, or gift cards to your cart yet.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20"
        >
          <span>Explore Store Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Shopping Cart</h1>
          <p className="text-xs text-slate-400 mt-1">Review your selected gaming items before checkout.</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="bg-[#090d1a] border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg group hover:border-slate-700 transition-all"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <ProductImage
                    src={item.image}
                    alt={item.name}
                    name={item.name}
                    category={item.category}
                    platform={item.platform}
                    className="h-full"
                  />
                </div>

                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded">
                    {item.platform || 'Digital'}
                  </span>
                  <h3 className="text-sm font-bold text-white truncate">{item.name}</h3>
                  <p className="text-xs font-semibold text-purple-300">{item.packageName}</p>
                </div>
              </div>

              {/* Price & Quantity Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-slate-800/80">
                <div className="flex items-center border border-slate-800 bg-slate-950 rounded-xl overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, -1)}
                    className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-extrabold text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, 1)}
                    className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[100px]">
                  <p className="text-xs text-slate-400 font-semibold">Subtotal</p>
                  <p className="text-base font-extrabold text-cyan-400">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-4 bg-[#090d1a] border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl sticky top-24">
          <h3 className="text-base font-extrabold text-white border-b border-slate-800 pb-3">
            Order Summary
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span>Total Items ({totalItems}):</span>
              <span className="font-bold text-white">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Digital Delivery Fee:</span>
              <span className="font-bold text-emerald-400">FREE / Instant</span>
            </div>
            <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-sm">
              <span className="font-bold text-white">Grand Total:</span>
              <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 px-4 rounded-2xl font-extrabold text-xs text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:opacity-95 shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Safe Local Kurdistan Checkout</span>
            </div>
            <p>Manual payment via FastPay, Korek, or MasterCard required at checkout.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
