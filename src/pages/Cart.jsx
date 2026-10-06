import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotalCount,
    cartTotalPrice
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 space-y-4 bg-[#090d1a] border border-slate-800 rounded-3xl">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-100">Your Shopping Cart is Empty</h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md">
          Looks like you haven't added any games, top-ups, or gift cards to your cart yet.
        </p>
        <Link
          to="/products"
          className="mt-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-lg shadow-cyan-950/50"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100">Shopping Cart</h1>
          <p className="text-xs text-slate-400 mt-1">{cartTotalCount} items in your order</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Item List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl bg-[#090d1a] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
                <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center text-cyan-400 font-black text-lg">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{item.productName.substring(0, 2).toUpperCase()}</span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <Link
                    to={`/product/${item.slug}`}
                    className="font-bold text-sm sm:text-base text-slate-100 hover:text-cyan-400 transition-colors line-clamp-1"
                  >
                    {item.productName}
                  </Link>

                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {item.platform}
                    </span>
                    {item.packageName && (
                      <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/50">
                        {item.packageName}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Price and Quantity */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
                <div className="flex items-center bg-[#05070f] border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1.5 text-slate-400 hover:text-white transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-slate-100">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1.5 text-slate-400 hover:text-white transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-medium">Total</span>
                  <span className="text-base font-extrabold text-cyan-300">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 pt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4">
          <div className="bg-[#090d1a] border border-slate-800 rounded-3xl p-6 space-y-6 sticky top-24">
            <h3 className="text-base font-bold text-slate-100 pb-3 border-b border-slate-800">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal ({cartTotalCount} items)</span>
                <span className="text-slate-200 font-bold">{formatPrice(cartTotalPrice)}</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Processing & Delivery Fee</span>
                <span className="text-emerald-400 font-bold">0 IQD (Free)</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between text-base font-black text-slate-100">
                <span>Total Amount</span>
                <span className="text-cyan-300">{formatPrice(cartTotalPrice)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 rounded-xl font-extrabold text-xs sm:text-sm bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-white shadow-xl shadow-cyan-950/50 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Safe local payment via FastPay, Korek, or MasterCard.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
