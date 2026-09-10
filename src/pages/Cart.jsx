import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft, Plus, Minus, ShieldCheck } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-6 bg-slate-900/60 rounded-3xl border border-slate-800 p-8 sm:p-12">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500 shadow-xl">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-100">Your Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            You haven't added any game codes, gift cards, or top-ups to your cart yet.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs shadow-xl shadow-cyan-950/50 transition-all"
        >
          <span>Browse Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Shopping Cart ({totalItems})
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your digital gaming codes and top-ups before checkout.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1.5"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 hover:border-slate-700 transition-colors"
            >
              <ProductImage
                src={item.product?.image}
                name={item.product?.name}
                category={item.product?.category}
                platform={item.product?.platform}
                type={item.product?.type}
                className="w-full sm:w-24 h-24 rounded-xl shrink-0"
              />

              <div className="flex-1 w-full space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                      {item.product?.platform}
                    </span>
                    <h3 className="font-extrabold text-slate-100 text-base line-clamp-1">
                      {item.product?.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-slate-300 font-semibold bg-slate-950/60 rounded-lg px-2.5 py-1 inline-block border border-slate-800/80">
                  Package: <span className="text-cyan-400">{item.packageName}</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, -1)}
                      className="px-2.5 py-1 text-slate-400 hover:text-white font-bold text-xs"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-black text-slate-100">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, 1)}
                      className="px-2.5 py-1 text-slate-400 hover:text-white font-bold text-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-base font-black text-cyan-400">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5 sticky top-24">
            <h3 className="font-extrabold text-slate-100 text-base border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Items</span>
                <span className="font-bold text-slate-100">{totalItems}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Subtotal</span>
                <span className="font-bold text-slate-100">{formatPrice(totalPrice)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Digital Delivery</span>
                <span className="font-bold text-emerald-400">FREE</span>
              </div>

              <div className="border-t border-slate-800 pt-3 flex justify-between text-base font-black text-slate-100">
                <span>Total Amount</span>
                <span className="text-cyan-400">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-950/60 transition-all active:scale-[0.98]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/products"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs text-center block transition-colors border border-slate-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
