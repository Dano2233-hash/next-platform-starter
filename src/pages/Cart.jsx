import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowLeft,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } =
    useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-100">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          You haven't added any PUBG UC, gift cards, subscriptions, or games to your cart yet.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-600/30"
        >
          Explore Gaming Products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-black text-slate-100 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your selected digital items before proceeding to checkout.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/30 border border-red-800/40"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => {
            const { itemKey, product, selectedPackage, price, quantity } = item;
            return (
              <div
                key={itemKey}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:border-slate-700"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-800">
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                      category={product.category}
                      platform={product.platform}
                      className="w-full h-full"
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-100">
                      {product.name}
                    </h4>
                    {selectedPackage && (
                      <span className="text-xs text-cyan-400 font-semibold block mt-0.5">
                        Package: {selectedPackage.name}
                      </span>
                    )}
                    <span className="text-[11px] text-slate-500 font-mono block mt-0.5">
                      {product.platform} &bull; {product.type}
                    </span>
                  </div>
                </div>

                {/* Quantity & Unit Price & Item Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                    <button
                      onClick={() => updateQuantity(itemKey, quantity - 1)}
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-black text-slate-100">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(itemKey, quantity + 1)}
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">
                      {formatPrice(price)} x {quantity}
                    </span>
                    <span className="text-sm font-black text-cyan-400">
                      {formatPrice(price * quantity)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(itemKey)}
                    className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 pt-2"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 sticky top-28">
            <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-bold text-slate-200">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-400">
                <span>Delivery Fee</span>
                <span className="font-bold text-cyan-400 uppercase">
                  FREE (Digital)
                </span>
              </div>

              <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-slate-100 font-bold">
                <span className="text-sm">Total Amount</span>
                <span className="text-xl font-black text-cyan-400">
                  {formatPrice(cartTotal)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:via-cyan-400 hover:to-purple-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-1 border-t border-slate-800">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>FastPay, Korek, & MasterCard accepted.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
