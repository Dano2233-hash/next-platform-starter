import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft, Plus, Minus } from 'lucide-react';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500 shadow-xl">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-100">Your Shopping Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Looks like you haven't added any games, top-ups, or subscriptions yet.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-xs uppercase tracking-wider text-white shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
        >
          Explore Gaming Store <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">

      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100">Shopping Cart</h1>
          <p className="text-xs text-slate-400 mt-1">Review your selected items before proceeding to payment.</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear All
        </button>
      </div>

      {/* Cart Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-3">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              {/* Image & Product Info */}
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-800">
                  <ProductImage
                    src={item.image}
                    title={item.name}
                    platform={item.platform}
                    category={item.type}
                    className="w-16 h-16"
                  />
                </div>

                <div className="space-y-1 min-w-0 flex-1">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                    {item.platform} • {item.type}
                  </span>
                  <h4 className="font-extrabold text-sm text-slate-100 truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs font-medium text-slate-400">
                    Pkg: <strong className="text-slate-300">{item.packageName}</strong>
                  </p>
                </div>
              </div>

              {/* Price & Quantity Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">

                {/* Quantity Control */}
                <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-1.5 text-slate-300 hover:bg-slate-800 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-slate-100">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-1.5 text-slate-300 hover:bg-slate-800 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <span className="text-xs font-extrabold text-cyan-400 block">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  {item.quantity > 1 && (
                    <span className="text-[10px] text-slate-500">
                      {formatPrice(item.price)} each
                    </span>
                  )}
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

              </div>
            </div>
          ))}

          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
          <h3 className="font-black text-base text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-3">
            Order Summary
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Items Total ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
              <span className="text-slate-200 font-semibold">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Delivery Fee</span>
              <span className="text-emerald-400 font-bold uppercase">Free (Digital)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Taxes & Fees</span>
              <span className="text-slate-200 font-semibold">0 IQD</span>
            </div>

            <div className="border-t border-slate-800 pt-3 flex justify-between text-sm items-baseline">
              <span className="font-extrabold text-slate-100">Grand Total</span>
              <span className="text-xl font-black text-cyan-400">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-extrabold text-xs sm:text-sm text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.01] uppercase tracking-wider flex items-center justify-center gap-2"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};

export default Cart;
