import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, Plus, Minus, ArrowLeft, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function Cart({ cart, onUpdateQty, onRemove, cartTotal }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate('/products')}
        className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer select-none bg-transparent border-0"
      >
        <ArrowLeft size={14} />
        Continue Shopping
      </button>

      <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
        Your Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-[#0c0d12] rounded-2xl border border-[#1a1e29]">
          <div className="p-4 rounded-full bg-[#151824] text-gray-500 mb-4">
            <ShoppingBag size={36} />
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Your Cart is Empty</h3>
          <p className="text-xs text-gray-400 mt-1.5 max-w-[320px]">
            You have no items in your cart. Choose from our game top-ups, paid titles, or subscriptions to get started.
          </p>
          <Link
            to="/products"
            className="mt-6 px-5 py-2.5 bg-[#0066ff] hover:bg-[#0052cc] rounded-lg text-xs font-bold text-white transition-all select-none"
          >
            Start Browsing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart list columns */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0c0d12]/90 border border-[#1a1e29]"
              >
                {/* Details */}
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-lg bg-[#050505] overflow-hidden flex items-center justify-center shrink-0 border border-[#1a1e29]">
                    {item.product.image ? (
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-sm font-black text-[#00e5ff]">{item.product.name[0]}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-snug">{item.product.name}</h3>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                      <span className="font-semibold text-gray-300 bg-[#151824] px-1.5 py-0.5 rounded border border-[#1a1e29] text-[10px] uppercase">
                        {item.product.platform}
                      </span>
                      <span>{item.selectedPackage.name}</span>
                    </p>
                  </div>
                </div>

                {/* Pricing, Qty, Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  {/* Single item price */}
                  <div className="text-left sm:text-right">
                    <p className="text-[10px] text-gray-500 font-bold uppercase">Price</p>
                    <p className="text-xs font-black text-white mt-0.5">{formatPrice(item.selectedPackage.price)}</p>
                  </div>

                  {/* Qty selectors */}
                  <div className="flex items-center bg-[#050505] rounded-lg p-1.5 border border-[#1a1e29]">
                    <button
                      onClick={() => onUpdateQty(item.cartItemId, item.quantity - 1)}
                      className="px-2 py-0.5 text-xs text-gray-400 hover:text-white cursor-pointer font-bold bg-transparent border-0"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="px-3 text-xs font-bold text-white w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQty(item.cartItemId, item.quantity + 1)}
                      className="px-2 py-0.5 text-xs text-gray-400 hover:text-white cursor-pointer font-bold bg-transparent border-0"
                    >
                      <Plus size={11} />
                    </button>
                  </div>

                  {/* Total price & remove button */}
                  <div className="text-right min-w-[80px]">
                    <p className="text-[10px] text-gray-500 font-bold uppercase">Total</p>
                    <p className="text-xs font-black text-[#00e5ff] mt-0.5">
                      {formatPrice(item.selectedPackage.price * item.quantity)}
                    </p>
                  </div>

                  <button
                    onClick={() => onRemove(item.cartItemId)}
                    className="p-2 rounded bg-[#050505] border border-[#1a1e29] text-gray-500 hover:text-red-500 hover:border-red-500/30 transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing summary widget */}
          <div className="lg:col-span-4 p-6 rounded-xl bg-[#0c0d12] border border-[#1a1e29] space-y-6 shadow-xl">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-300">Order Summary</h3>

            <div className="space-y-3.5 border-b border-[#1a1e29] pb-4">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Items Subtotal</span>
                <span className="font-bold text-white">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Manual Handling Fee</span>
                <span className="text-emerald-400 font-semibold uppercase">FREE</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-gray-300">Total Price:</span>
              <span className="text-lg font-black text-[#00e5ff]">{formatPrice(cartTotal)}</span>
            </div>

            <Link
              to="/checkout"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#0066ff] hover:bg-[#0052cc] text-xs font-black text-white rounded-xl transition-all shadow-lg shadow-[#0066ff]/25 select-none text-center"
            >
              PROCEED TO CHECKOUT
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
