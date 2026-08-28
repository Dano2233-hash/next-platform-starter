import React from 'react';
import { Link } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export function Checkout({ cartItems = [], cartTotal = 0, onClearCart }) {
  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">Please add items to your cart before proceeding to checkout.</p>
        <Link to="/products" className="inline-block px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs">
          Return to Store Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Checkout</h1>
          <p className="text-xs text-slate-400 mt-1">Complete your order with manual local Kurdistan payment</p>
        </div>
        <Link to="/cart" className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Edit Cart</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Main Form */}
        <div className="lg:col-span-7">
          <CheckoutForm cartItems={cartItems} cartTotal={cartTotal} onClearCart={onClearCart} />
        </div>

        {/* Order Items Preview Sidebar */}
        <div className="lg:col-span-5 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
            <span>Order Summary</span>
            <span className="text-xs font-normal text-slate-400">{cartItems.length} items</span>
          </h3>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.cartItemId} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden border border-slate-800">
                  <ProductImage product={item.product} height="h-12" />
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <h4 className="font-bold text-slate-200 truncate">{item.product?.name}</h4>
                  <p className="text-[11px] text-cyan-400 font-medium">{item.selectedPackage?.name}</p>
                  <p className="text-slate-400">Qty: {item.quantity}</p>
                </div>
                <span className="text-xs font-bold text-cyan-400 shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-3 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="text-slate-200 font-semibold">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Delivery Fee</span>
              <span className="text-emerald-400 font-bold">FREE</span>
            </div>
            <div className="flex justify-between items-baseline border-t border-slate-800 pt-3">
              <span className="text-sm font-bold text-white">Total Amount</span>
              <span className="text-xl font-black text-cyan-400">{formatPrice(cartTotal)}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Checkout;
