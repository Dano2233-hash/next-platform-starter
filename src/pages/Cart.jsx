import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ChevronLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-100">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">
          You haven't added any game top-ups, gift cards, or subscriptions to your cart yet.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-xs shadow-lg"
        >
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Shopping Cart</h1>
          <p className="text-xs text-slate-400">Review your selected items before proceeding to payment.</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-rose-400 hover:underline font-semibold"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-3">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 rounded-2xl bg-[#0b0f19] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <ProductImage
                    product={{
                      name: item.productName,
                      image: item.image,
                      category: item.category,
                      platform: item.platform,
                      type: item.type,
                    }}
                    className="h-full"
                  />
                </div>
                <div>
                  <Link
                    to={`/product/${item.productSlug}`}
                    className="text-sm font-bold text-slate-100 hover:text-cyan-400 transition-colors"
                  >
                    {item.productName}
                  </Link>
                  <p className="text-xs text-cyan-400 font-medium mt-0.5">Package: {item.packageName}</p>
                  <p className="text-xs font-semibold text-slate-400 mt-1">
                    Unit Price: {formatPrice(item.price)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-800">
                {/* Qty Controls */}
                <div className="flex items-center gap-2 bg-slate-900 rounded-xl border border-slate-800 p-1">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-slate-100 min-w-[20px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal Item Price */}
                <span className="text-sm font-extrabold text-cyan-300 min-w-[90px] text-right">
                  {formatPrice(item.price * item.quantity)}
                </span>

                {/* Remove */}
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
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 pt-2"
          >
            <ChevronLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 space-y-4 sticky top-24">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Total Items</span>
                <span className="text-slate-200 font-semibold">{cart.length}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-slate-200 font-semibold">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Instant Delivery Fee</span>
                <span className="text-emerald-400 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-100 pt-3 border-t border-slate-800">
                <span>Total Amount</span>
                <span className="text-cyan-300 text-lg">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-xl shadow-cyan-950/50 flex items-center justify-center gap-2 transition-all"
            >
              <span>Proceed To Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
