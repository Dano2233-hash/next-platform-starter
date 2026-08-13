import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export function Cart({ cart, onUpdateQuantity, onRemove, cartTotal }) {
  if (cart.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#12121e] border border-[#1e1e2d] text-gray-400">
          <ShoppingBag size={28} />
        </div>
        <h2 className="text-xl font-black text-white">Your Shopping Cart is Empty</h2>
        <p className="text-xs text-gray-400 leading-relaxed">
          You haven't added any digital game codes, mobile top-ups, or card packages to your shopping cart yet.
        </p>
        <Link
          to="/products"
          className="inline-block rounded-xl bg-gradient-to-r from-[#0066ff] to-[#7000ff] px-6 py-2.5 text-xs font-black uppercase text-white shadow-md hover:opacity-95 transition"
        >
          Explore Store
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 text-left">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-wide text-white">Shopping Cart</h1>
        <p className="text-xs text-gray-400 font-medium">Verify your items before proceeding to Kurdistan manual checkout</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Side: Items Table */}
        <div className="space-y-4 lg:col-span-2">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.selectedPackage.name}`}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-[#12121e] bg-[#0c0c14] p-4 transition hover:border-[#1e1e2d]"
            >
              <div className="space-y-1">
                <span className="rounded bg-[#0066ff]/10 border border-[#0066ff]/20 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-[#00e5ff]">
                  {item.platform} | {item.type}
                </span>
                <h3 className="text-sm font-black text-white">{item.name}</h3>
                <p className="text-xs font-bold text-[#00e5ff]">{item.selectedPackage.name}</p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-none border-[#12121e] pt-3 sm:pt-0">
                {/* Quantity controller */}
                <div className="flex items-center rounded-lg border border-[#1e1e2d] bg-[#05050a] p-1">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.selectedPackage.name, item.quantity - 1)}
                    className="h-6 w-6 flex items-center justify-center text-xs font-bold text-gray-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="text-xs font-black w-6 text-center text-white">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.selectedPackage.name, item.quantity + 1)}
                    className="h-6 w-6 flex items-center justify-center text-xs font-bold text-gray-400 hover:text-white"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal price */}
                <div className="text-right min-w-[80px]">
                  <span className="block text-[10px] text-gray-500 font-bold uppercase">Subtotal</span>
                  <span className="text-sm font-black text-white">
                    {formatPrice(item.selectedPackage.price * item.quantity)}
                  </span>
                </div>

                {/* Remove item trigger */}
                <button
                  onClick={() => onRemove(item.id, item.selectedPackage.name)}
                  className="rounded-lg p-2 text-red-500 hover:bg-red-500/10 transition"
                  title="Remove Item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Order Summary */}
        <div className="rounded-xl border border-[#12121e] bg-[#0c0c14] p-5 self-start space-y-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-white">Order Invoice Summary</h3>

          <div className="space-y-2 border-b border-[#12121e] pb-4">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Total Items quantity:</span>
              <span className="font-bold text-white">
                {cart.reduce((acc, curr) => acc + curr.quantity, 0)} units
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Standard delivery fee:</span>
              <span className="font-bold text-emerald-400 uppercase text-[10px]">Free Digital Delivery</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-gray-400">Grand Total Invoice</span>
            <span className="text-base font-black text-[#00e5ff]">{formatPrice(cartTotal)}</span>
          </div>

          <Link
            to="/checkout"
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#0066ff] via-[#7000ff] to-[#00e5ff] py-3 text-xs font-black uppercase tracking-wider text-white hover:opacity-95 transition shadow-lg premium-glow-blue"
          >
            <span>Proceed to checkout</span>
            <ArrowRight size={13} />
          </Link>

          <Link
            to="/products"
            className="block text-center text-xs font-bold text-gray-400 hover:text-white transition"
          >
            Or continue digital shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
