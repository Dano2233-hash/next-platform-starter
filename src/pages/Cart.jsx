import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { ProductImage } from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';

export const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  if (!cart || cart.length === 0) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-slate-900/80 border border-slate-800 rounded-3xl text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto border border-slate-700">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-100 font-heading">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          You haven't added any games, PUBG UC, or gift cards to your cart yet.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-950/50"
        >
          <ArrowLeft className="w-4 h-4" /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 pt-4">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-heading">
            Shopping Cart ({cart.length} Items)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your digital items before proceeding to checkout.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 bg-rose-950/30 border border-rose-500/20 px-3 py-1.5 rounded-lg"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Cart
        </button>
      </div>

      {/* Cart Items & Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item, index) => {
            const itemTotal = item.unitPrice * item.quantity;

            return (
              <div
                key={`${item.id}-${item.selectedPackageName}-${index}`}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Image & Main Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-20 h-20 flex-shrink-0">
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      name={item.name}
                      category={item.category}
                      platform={item.platform}
                      type={item.type}
                      className="h-20"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-cyan-500/30">
                      {item.platform}
                    </span>
                    <h4 className="font-bold text-slate-100 text-sm leading-snug">
                      {item.name}
                    </h4>
                    <p className="text-xs text-cyan-400 font-semibold">
                      Package: {item.selectedPackageName}
                    </p>
                    <p className="text-xs text-slate-400">
                      Unit Price: {formatPrice(item.unitPrice)}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Line Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-slate-800/80 pt-3 sm:pt-0">

                  {/* Qty Switch */}
                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.selectedPackageName, -1)}
                      className="px-2.5 py-1 text-slate-300 hover:bg-slate-800 font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-slate-100 font-bold text-xs">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.selectedPackageName, 1)}
                      className="px-2.5 py-1 text-slate-300 hover:bg-slate-800 font-bold text-xs"
                    >
                      +
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-slate-100">
                      {formatPrice(itemTotal)}
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id, item.selectedPackageName)}
                    className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h3 className="text-base font-bold text-slate-100 font-heading border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Processing Fee</span>
                <span className="text-emerald-400 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Delivery Method</span>
                <span className="text-cyan-400 font-semibold">Instant Digital</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-100">Total Amount</span>
                <span className="text-xl font-extrabold text-cyan-400">
                  {formatPrice(cartTotal)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Safe local payments via FastPay, Korek & MasterCard</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
