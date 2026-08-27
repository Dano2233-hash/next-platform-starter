import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';

export default function Cart({
  cart = [],
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
  cartTotal
}) {
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 bg-[#0a0f1d] border border-slate-800 rounded-3xl p-8 my-8 shadow-2xl">
        <div className="w-20 h-20 mx-auto rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4">
          <ShoppingCart className="w-10 h-10 text-slate-500" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
          Looks like you haven't added any game codes or top-up packages yet.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-600/20 transition-all"
        >
          <span>Explore Product Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-cyan-400" />
            Shopping Cart
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your selected digital items before proceeding to checkout.
          </p>
        </div>

        <button
          onClick={onClearCart}
          className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-3">
          {cart.map((item) => {
            const itemSubtotal = item.unitPrice * item.quantity;
            return (
              <div
                key={`${item.product.id}-${item.packageId}`}
                className="bg-[#0a0f1d] border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg transition-all"
              >
                {/* Product Thumbnail & Details */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-800">
                    <ProductImage
                      src={item.product.image}
                      alt={item.product.name}
                      category={item.product.category}
                      platform={item.product.platform}
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">
                      {item.product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-cyan-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded font-semibold">
                        {item.product.platform}
                      </span>
                      {item.packageName && (
                        <span className="text-[10px] text-purple-300 bg-purple-950/60 border border-purple-800/40 px-2 py-0.5 rounded font-semibold">
                          {item.packageName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price & Quantity Actions */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t sm:border-0 border-slate-800/60">
                  <div className="flex items-center border border-slate-700 rounded-xl bg-slate-900">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.packageId, -1)}
                      className="px-2.5 py-1 text-slate-400 hover:text-white"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.packageId, 1)}
                      className="px-2.5 py-1 text-slate-400 hover:text-white"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-medium">Subtotal</span>
                    <span className="text-sm font-extrabold text-cyan-400">
                      {formatPrice(itemSubtotal)}
                    </span>
                  </div>

                  <button
                    onClick={() => onRemoveFromCart(item.product.id, item.packageId)}
                    className="p-2 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-900 transition-colors"
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
        <div className="lg:col-span-4">
          <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl sticky top-24">
            <h3 className="font-bold text-base text-white border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Total Items</span>
                <span>{cart.reduce((a, c) => a + c.quantity, 0)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Delivery Fee</span>
                <span className="text-emerald-400 font-bold">FREE (Digital Code)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-xs font-bold text-white">Total Amount</span>
              <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-3 border-t border-slate-800/60 flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Supported: FastPay, Korek & MasterCard manual payments.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
