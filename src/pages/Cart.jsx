import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function Cart({ cart = [], onUpdateQuantity, onRemoveFromCart, onClearCart, totalPrice = 0 }) {
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="py-20 max-w-md mx-auto text-center space-y-4">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-slate-100">Your Cart is Currently Empty</h2>
        <p className="text-xs text-slate-400">Looks like you haven't added any games, top-ups, or gift cards yet.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-cyan-400" />
          <span>Shopping Cart ({cart.length})</span>
        </h1>

        <button
          onClick={onClearCart}
          className="text-xs font-bold text-slate-400 hover:text-red-400 flex items-center gap-1 transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart items list */}
        <div className="lg:col-span-8 space-y-3">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                  <ProductImage
                    src={item.productImage}
                    name={item.productName}
                    category={item.category}
                    platform={item.platform}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-bold text-sm text-slate-100">{item.productName}</h3>
                  <p className="text-xs font-semibold text-cyan-400 mt-0.5">{item.selectedPackageName}</p>
                  <p className="text-xs font-extrabold text-slate-200 mt-1">{formatPrice(item.price)} each</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl">
                  <button
                    onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                    className="p-2 text-slate-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-white">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                    className="p-2 text-slate-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-sm font-extrabold text-cyan-300">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <button
                    onClick={() => onRemoveFromCart(item.cartItemId)}
                    className="text-[11px] text-slate-500 hover:text-red-400 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white pt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Order Summary box */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-3">Order Summary</h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
              <span className="font-bold text-slate-200">{formatPrice(totalPrice)}</span>
            </div>

            <div className="flex justify-between text-slate-400">
              <span>Delivery Fee</span>
              <span className="font-bold text-green-400">FREE (Digital)</span>
            </div>

            <div className="flex justify-between text-slate-400">
              <span>Tax / Verification Fee</span>
              <span className="font-bold text-slate-200">0 IQD</span>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-sm font-bold text-slate-100">Total</span>
              <span className="text-xl font-black text-cyan-300">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 rounded-xl font-extrabold text-xs text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-xl shadow-cyan-500/20 transition flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
