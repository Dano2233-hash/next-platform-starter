import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export function Cart({ cart = [], onUpdateQty, onRemove, onClear }) {
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.packagePrice * item.quantity, 0);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 bg-[#0a0a14] border border-slate-900 rounded-2xl p-8 space-y-4">
        <ShoppingBag className="w-16 h-16 text-slate-500 mx-auto opacity-30" />
        <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
          You have no items in your shopping cart. Browse our awesome selection of games and mobile top-ups!
        </p>
        <div className="pt-4">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-black px-6 py-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-cyan-500/10"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-slate-900 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          Shopping Cart ({count} items)
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Review your items before proceeding to Kurdistan manual checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#0a0a14] border border-slate-900 rounded-xl overflow-hidden">
            {/* Header row */}
            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 text-xs font-black uppercase tracking-widest text-slate-500 border-b border-slate-900 bg-slate-950/40">
              <div className="col-span-6">Product Details</div>
              <div className="col-span-2 text-center">Unit Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Subtotal</div>
            </div>

            <div className="divide-y divide-slate-900">
              {cart.map((item) => {
                const subtotal = item.packagePrice * item.quantity;
                return (
                  <div key={`${item.productId}-${item.packageId}`} className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">

                    {/* Item Details */}
                    <div className="col-span-6 flex items-start space-x-4">
                      <div className="flex-grow">
                        <Link to={`/product/${item.slug}`} className="text-sm sm:text-base font-black text-white hover:text-cyan-400 transition-colors line-clamp-1">
                          {item.productName}
                        </Link>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          <span className="text-[9px] font-bold uppercase text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/10">
                            {item.platform}
                          </span>
                          <span className="text-[9px] font-bold uppercase text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/10">
                            {item.packageName}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Unit Price */}
                    <div className="col-span-2 text-left sm:text-center">
                      <span className="sm:hidden text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Price</span>
                      <span className="text-xs sm:text-sm text-slate-300 font-bold">
                        {formatPrice(item.packagePrice)}
                      </span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="col-span-2 flex sm:justify-center">
                      <div className="flex items-center space-x-2 bg-slate-950 border border-slate-900 rounded-lg p-1">
                        <button
                          onClick={() => onUpdateQty(item.productId, item.packageId, -1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white font-bold transition-colors"
                        >
                          -
                        </button>
                        <span className="text-xs font-black text-white min-w-[15px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.productId, item.packageId, 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white font-bold transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="col-span-2 text-left sm:text-right flex items-center justify-between sm:justify-end gap-2">
                      <div className="sm:hidden">
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Subtotal</span>
                        <span className="text-xs sm:text-sm text-cyan-400 font-bold">
                          {formatPrice(subtotal)}
                        </span>
                      </div>
                      <span className="hidden sm:inline text-xs sm:text-sm text-cyan-400 font-black">
                        {formatPrice(subtotal)}
                      </span>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemove(item.productId, item.packageId)}
                        className="p-1.5 text-slate-500 hover:text-red-400 rounded-md transition-colors sm:ml-4"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom actions row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
            <button
              onClick={onClear}
              className="text-xs font-bold text-red-500 hover:text-red-400 uppercase tracking-widest transition-colors bg-slate-900/40 px-4 py-2 rounded-lg border border-slate-900 hover:border-red-500/10"
            >
              Clear Entire Cart
            </button>
          </div>
        </div>

        {/* Right: Summary Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0a0a14] border border-slate-900 rounded-xl p-6 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-white border-b border-slate-900 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3.5 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span className="text-slate-200 font-bold">{count} items</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="text-emerald-400 font-bold">0 IQD (Digital Delivery)</span>
              </div>
              <div className="flex justify-between">
                <span>Processing Tax</span>
                <span className="text-emerald-400 font-bold">Free</span>
              </div>
              <div className="border-t border-slate-900 pt-3.5 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white uppercase tracking-wider">Est. Grand Total</span>
                <span className="text-xl font-black text-cyan-400">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              to="/checkout"
              className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-black py-4 rounded-lg text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/15"
            >
              <span>Proceed to Manual Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Quick manual note */}
            <p className="text-[10px] text-slate-500 text-center leading-relaxed">
              * Payments are made manually via FastPay, Korek credit, or MasterCard. Activation instructions will appear on the next steps.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
