import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';
import { formatPrice } from '../utils/formatPrice.js';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';

export const Cart = () => {
  const { cart, cartTotal, cartCount, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <div className="w-20 h-20 rounded-3xl bg-[#080d1e] border border-gray-800 flex items-center justify-center text-gray-500 shadow-xl">
          <ShoppingBag className="w-10 h-10 text-cyan-400" />
        </div>
        <h2 className="text-2xl font-extrabold text-white">Your Shopping Cart is Empty</h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-md">
          You haven't added any products to your cart yet. Explore our games, top-ups, and gift cards to find great deals!
        </p>
        <Link
          to="/products"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-gray-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20"
        >
          Explore Store Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-cyan-400 transition-colors mb-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-bold text-gray-400 hover:text-red-400 flex items-center gap-1.5 transition-colors"
        >
          <Trash2 className="w-4 h-4" /> Clear All
        </button>
      </div>

      {/* Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.itemKey}
              className="bg-[#080d1e] border border-gray-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gray-900 overflow-hidden shrink-0 border border-gray-800 flex items-center justify-center">
                  {item.productImage ? (
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center text-cyan-300 font-bold text-sm">
                      {item.productName?.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                      {item.platform || item.category}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-white text-sm sm:text-base truncate">
                    {item.productName}
                  </h3>
                  {item.packageName && (
                    <p className="text-xs font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded inline-block">
                      Option: {item.packageName}
                    </p>
                  )}
                  <p className="text-xs text-gray-400">
                    Unit Price: {formatPrice(item.unitPrice)}
                  </p>
                </div>
              </div>

              {/* Quantity Controls & Price */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-800">
                <div className="flex items-center gap-2 bg-[#050814] border border-gray-800 rounded-xl p-1">
                  <button
                    onClick={() => updateQuantity(item.itemKey, -1)}
                    className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-extrabold text-cyan-300 px-2">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.itemKey, 1)}
                    className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-right min-w-[100px]">
                  <span className="text-xs text-gray-400 block font-semibold">Subtotal</span>
                  <span className="text-base sm:text-lg font-black text-cyan-400">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.itemKey)}
                  className="p-2 text-gray-500 hover:text-red-400 transition-colors"
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
          <div className="bg-[#080d1e] border border-gray-800 rounded-2xl p-6 space-y-6 sticky top-24 shadow-xl">
            <h3 className="text-lg font-extrabold text-white border-b border-gray-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal ({cartCount} items):</span>
                <span className="font-bold text-white">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee:</span>
                <span className="font-bold text-emerald-400">FREE (Digital)</span>
              </div>
              <div className="flex justify-between">
                <span>Accepted Currency:</span>
                <span className="font-bold text-cyan-400">IQD Only</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-800 flex justify-between items-baseline">
              <span className="text-sm font-bold text-gray-200">Total Price:</span>
              <span className="text-2xl font-black text-cyan-400">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <div className="p-3 bg-gray-900/60 border border-gray-800 rounded-xl flex items-center gap-2.5 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Manual Local Payment via FastPay, Korek or MasterCard</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-gray-950 font-black text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
