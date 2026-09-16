import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">
          You haven't added any digital games or top-up packages to your cart yet.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20"
        >
          <span>Browse Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans uppercase">
            Shopping Cart ({cartItems.length})
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your digital items before proceeding to checkout.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-3">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 rounded-2xl bg-[#0d1322] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 flex-shrink-0">
                  <ProductImage
                    image={item.image}
                    name={item.name}
                    category={item.category}
                    platform={item.platform}
                    className="h-16 w-16"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{item.name}</h3>
                  <p className="text-xs text-cyan-400 font-mono font-semibold">{item.packageName}</p>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{formatPrice(item.price)} each</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-800">
                <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-2 text-slate-300 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-white font-mono">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-2 text-slate-300 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[90px]">
                  <span className="text-sm font-extrabold text-cyan-300 font-mono">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors pt-2"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary sidebar */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-2xl bg-[#0d1322] border border-slate-800 space-y-4 sticky top-24">
            <h2 className="text-base font-extrabold text-white uppercase tracking-wider">
              Order Summary
            </h2>

            <div className="space-y-2 text-xs border-y border-slate-800 py-3">
              <div className="flex items-center justify-between text-slate-400">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-mono text-slate-200">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Digital Delivery Fee</span>
                <span className="font-mono text-emerald-400 font-bold">FREE</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">Total IQD</span>
              <span className="text-xl font-black text-cyan-300 font-sans">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-98 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
