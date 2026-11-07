import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';

export function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center space-y-5 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-2xl bg-[#0d1222] border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">
          Looks like you haven&apos;t added any games, top-ups, or subscriptions yet. Explore our latest deals and top-rated games!
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-cyan-500/20"
        >
          <ArrowLeft className="w-4 h-4" /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Shopping Cart</h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your digital keys, packages, and quantities before checking out.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 p-2 rounded-lg hover:bg-red-500/10"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart items list */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="bg-[#0d1222] border border-slate-800 hover:border-slate-700 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-slate-700/80">
                  <ProductImage
                    src={item.image}
                    alt={item.name}
                    name={item.name}
                    category={item.category}
                    platform={item.platform}
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                      {item.platform}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {item.type}
                    </span>
                  </div>
                  <Link
                    to={`/product/${item.slug}`}
                    className="font-bold text-white hover:text-cyan-400 text-sm sm:text-base line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  {item.packageName && (
                    <span className="text-xs text-cyan-400/90 font-medium block">
                      Package: {item.packageName}
                    </span>
                  )}
                  <span className="text-xs text-slate-400 font-mono">
                    {formatPrice(item.price)} each
                  </span>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                {/* Quantity adjuster */}
                <div className="flex items-center border border-slate-700 rounded-xl bg-[#05070f] overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 py-1 text-xs font-bold text-white min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Line total */}
                <div className="text-right min-w-[100px]">
                  <span className="text-xs text-slate-500 block">Total</span>
                  <span className="font-extrabold text-cyan-400 text-sm sm:text-base">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-[#0d1222] border border-slate-800 rounded-3xl p-6 space-y-6 sticky top-24">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-4">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Items Subtotal:</span>
                <span className="text-slate-200 font-bold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Digital Delivery Fee:</span>
                <span className="text-emerald-400 font-bold">FREE (0 IQD)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Taxes:</span>
                <span className="text-slate-200 font-bold">0 IQD</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Grand Total:</span>
                <span className="text-2xl font-black text-cyan-400">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:to-teal-300 text-white font-extrabold text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/products"
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span>Continue Shopping</span>
              </Link>
            </div>

            {/* Guarantee reminder */}
            <div className="pt-4 border-t border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Manual verification via FastPay, Korek & MasterCard. 100% Guaranteed.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
