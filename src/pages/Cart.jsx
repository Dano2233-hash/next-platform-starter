import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowLeft, ArrowRight, ShieldCheck, Zap, Plus, Minus } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotalAmount, totalItemsCount } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 mx-auto shadow-xl">
          <ShoppingBag className="w-10 h-10 text-cyan-400" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-white">Your Cart is Empty</h1>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            You don't have any digital games, PUBG UC, diamonds, or subscriptions in your cart yet.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 text-white font-extrabold text-xs shadow-lg shadow-cyan-950"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Game Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Page Title */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-cyan-400" />
            <span>Shopping Cart ({totalItemsCount})</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Review your selected items before checkout</p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-bold text-slate-400 hover:text-red-400 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 rounded-2xl bg-[#090d1a] border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-16 h-16 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-slate-900 to-cyan-950 flex items-center justify-center font-bold text-cyan-400 text-sm">
                      {item.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="space-y-1 min-w-0">
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-bold text-cyan-400 uppercase">
                    {item.platform}
                  </span>
                  <h3 className="text-sm font-bold text-white truncate">{item.name}</h3>
                  <p className="text-xs text-cyan-400 font-semibold">
                    Package: {item.packageName}
                  </p>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-800/60">
                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, -1)}
                    className="p-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-white w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, 1)}
                    className="p-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <span className="text-sm font-black text-cyan-400 block">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-2xl bg-[#090d1a] border border-slate-800 space-y-6 sticky top-24 shadow-xl">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Total Items</span>
                <span className="text-slate-200 font-bold">{totalItemsCount}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-slate-200 font-bold">{formatPrice(cartTotalAmount)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Digital Code Delivery</span>
                <span className="text-emerald-400 font-bold">FREE Instant</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between text-base font-black text-white">
                <span>Grand Total</span>
                <span className="text-cyan-400">{formatPrice(cartTotalAmount)}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-950 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/products"
                className="block text-center py-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <Zap className="w-3.5 h-3.5" /> Fast Local Transfer
              </div>
              <p>Supported manual transfers: FastPay, Korek, and MasterCard.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
