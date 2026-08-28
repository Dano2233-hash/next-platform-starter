import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';

export function Cart({ cartItems = [], onUpdateQuantity, onRemoveFromCart, onClearCart, cartTotal = 0 }) {
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto space-y-4">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500 shadow-xl">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">
          Looks like you haven't added any digital products or top-ups to your cart yet.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20"
        >
          <span>Explore Store Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">

      {/* Page Title */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <span>Shopping Cart</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Review your selected items before proceeding to checkout</p>
        </div>

        <button
          onClick={onClearCart}
          className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      {/* Cart Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Item Table */}
        <div className="lg:col-span-8 space-y-3">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto min-w-0">
                <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                  <ProductImage product={item.product} height="h-16" />
                </div>

                <div className="space-y-1 min-w-0">
                  <Link
                    to={`/product/${item.product?.slug || item.product?.id}`}
                    className="text-sm font-bold text-slate-100 hover:text-cyan-400 transition-colors line-clamp-1 block"
                  >
                    {item.product?.name}
                  </Link>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
                    {item.selectedPackage?.name}
                  </span>
                  <p className="text-xs font-black text-slate-200">
                    {formatPrice(item.price)} each
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-slate-800/80 pt-3 sm:pt-0">
                {/* Quantity adjuster */}
                <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 p-1">
                  <button
                    onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-slate-100 min-w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal & Delete */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-cyan-400">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => onRemoveFromCart(item.cartItemId)}
                    className="text-slate-500 hover:text-rose-400 transition-colors p-1.5 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Right Summary Sidebar */}
        <div className="lg:col-span-4 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Order Summary</h3>

          <div className="space-y-2 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span className="text-slate-200 font-semibold">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="text-emerald-400 font-bold">FREE (Instant Digital)</span>
            </div>
            <div className="flex justify-between">
              <span>Tax / Service Fee</span>
              <span className="text-slate-200 font-semibold">0 IQD</span>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
            <span className="text-xs font-bold text-slate-300 uppercase">Grand Total</span>
            <span className="text-2xl font-black text-cyan-400">{formatPrice(cartTotal)}</span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 cursor-pointer transition-all"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}

export default Cart;
