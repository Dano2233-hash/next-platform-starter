import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartSubtotal, totalItemsCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-6">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Your Cart is Empty</h1>
        <p className="text-sm text-slate-400 mt-2 mb-8 max-w-md mx-auto">
          You have no items in your shopping cart. Discover top games, UC, gift vouchers, and subscriptions now.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-950/40"
        >
          <ArrowLeft className="w-4 h-4" /> Start Browsing
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Shopping Cart</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            You have <strong className="text-cyan-400">{totalItemsCount}</strong> items in your cart.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-400 hover:text-rose-300 self-start sm:self-auto flex items-center gap-1.5"
        >
          <Trash2 className="w-4 h-4" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <ProductImage
                    src={item.image}
                    name={item.name}
                    category={item.category}
                    platform={item.platform}
                    className="w-16 h-16"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                      {item.platform}
                    </span>
                    <span className="text-[10px] uppercase text-slate-400">
                      {item.type}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-white truncate">{item.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Option: <span className="text-slate-200 font-semibold">{item.package.name}</span>
                  </p>
                </div>
              </div>

              {/* Price & Quantity Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <div className="flex items-center border border-slate-700 rounded-xl overflow-hidden bg-slate-950">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="px-2.5 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 text-xs font-bold text-white min-w-7 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="px-2.5 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-24">
                  <div className="text-sm font-extrabold text-cyan-400">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                  {item.quantity > 1 && (
                    <div className="text-[10px] text-slate-500">
                      {formatPrice(item.price)} each
                    </div>
                  )}
                </div>

                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
          <h2 className="font-bold text-white text-base">Order Summary</h2>

          <div className="space-y-3 text-xs text-slate-300 border-b border-slate-800 pb-4">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span className="font-semibold text-white">{formatPrice(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Processing / Delivery Fee</span>
              <span className="font-semibold text-emerald-400">FREE (Digital)</span>
            </div>
            <div className="flex justify-between">
              <span>Currency</span>
              <span className="font-semibold text-white">IQD</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-300">Total Amount</span>
            <span className="text-xl font-black text-cyan-400">{formatPrice(cartSubtotal)}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
            <div className="font-bold text-slate-200">Accepted Payment Methods:</div>
            <div>• FastPay</div>
            <div>• Korek</div>
            <div>• MasterCard (Direct Transfer)</div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center justify-center gap-2 shadow-xl shadow-cyan-950/50 transition-all active:scale-95 cursor-pointer"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
