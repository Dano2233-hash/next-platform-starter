import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft, ShieldCheck } from 'lucide-react';

export function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartSubtotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto space-y-5 bg-[#090d1c] border border-slate-800 rounded-3xl p-8">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
          <ShoppingBag className="w-8 h-8 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Your Cart is Empty</h2>
          <p className="text-xs text-slate-400 mt-1">
            Browse our catalog to select your favorite games, top-up packages, and gift cards.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-950 transition-all"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Shopping Cart</h1>
          <p className="text-xs text-slate-400 mt-1">Review your selected digital packages and keys before checkout.</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart items list */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 sm:p-5 rounded-2xl bg-[#090d1c] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-950 border border-slate-800">
                  <ProductImage
                    image={item.image}
                    name={item.name}
                    category={item.category}
                    platform={item.platform}
                    type={item.type}
                    className="w-20 h-20"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    {item.platform}
                  </span>
                  <h3 className="font-bold text-sm text-white mt-1 truncate">{item.name}</h3>
                  {item.packageName && (
                    <p className="text-xs text-cyan-300 font-mono">{item.packageName}</p>
                  )}
                  <p className="text-xs font-semibold text-slate-400 mt-0.5 font-mono">
                    {formatPrice(item.price)} each
                  </p>
                </div>
              </div>

              {/* Quantity and Total */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg px-2 py-1">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 font-mono font-bold text-xs text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[90px]">
                  <span className="font-extrabold text-sm text-cyan-300 font-mono">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-colors cursor-pointer"
                  title="Remove from cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold pt-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-4">
          <div className="bg-[#090d1c] border border-slate-800 rounded-2xl p-6 space-y-5 sticky top-24">
            <h3 className="font-bold text-base text-white border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Items Subtotal</span>
                <span className="font-mono text-slate-200">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Digital Delivery Fee</span>
                <span className="font-bold text-emerald-400">FREE</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Local Currency</span>
                <span className="font-bold text-cyan-300">IQD</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
              <span className="font-bold text-sm text-white">Grand Total</span>
              <span className="text-xl font-extrabold text-cyan-300 font-mono">
                {formatPrice(cartSubtotal)}
              </span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-xl shadow-cyan-950 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-3 text-[11px] text-slate-500 space-y-1.5 text-center">
              <p className="flex items-center justify-center gap-1 text-slate-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Manual Payment via FastPay, Korek & MasterCard</span>
              </p>
              <p>Instant code or player ID top-up verification upon receipt.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
