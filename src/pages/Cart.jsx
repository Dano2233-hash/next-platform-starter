import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import { ProductImage } from '../components/ProductImage';

export const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, cartSubtotal, totalItemsCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400 max-w-sm">
          You haven't added any digital games or top-ups to your cart yet.
        </p>
        <Link
          to="/products"
          className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20"
        >
          Explore Gaming Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white">Shopping Cart</h1>
          <p className="text-xs text-slate-400">Review your selected digital items ({totalItemsCount} item{totalItemsCount > 1 ? 's' : ''})</p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-800/40"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-20 h-20 shrink-0 bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
                  <ProductImage product={item.product} className="w-full h-full object-cover" />
                </div>

                <div className="space-y-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-cyan-950 text-cyan-300 border border-cyan-800">
                    {item.platform || 'Digital'}
                  </span>
                  <h3 className="font-bold text-slate-100 text-sm">{item.title}</h3>
                  <p className="text-xs font-black text-cyan-400">{formatPrice(item.price)}</p>
                </div>
              </div>

              {/* Quantity Controls & Remove */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 p-1 rounded-xl">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-900"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-900"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="block text-xs font-black text-white">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-[11px] text-red-400 hover:text-red-300 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 pt-2"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 sticky top-24">
            <h3 className="text-lg font-black text-white border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Items Subtotal</span>
                <span className="text-slate-200 font-bold">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Delivery / Service Fee</span>
                <span className="text-emerald-400 font-bold">FREE (Digital)</span>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-between text-sm font-black text-white">
                <span>Total Amount</span>
                <span className="text-cyan-400 text-lg font-black">{formatPrice(cartSubtotal)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-white" /> Proceed to Checkout
            </button>

            <div className="pt-2 text-[11px] text-slate-500 space-y-1.5 border-t border-slate-800/80">
              <p className="flex items-center gap-1.5 font-semibold text-slate-400">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> FastPay, Korek & MasterCard Accepted
              </p>
              <p>Manual payment processing with Kurdistan & Iraq local support.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
