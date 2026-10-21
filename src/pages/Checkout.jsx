import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import CheckoutForm from '../components/CheckoutForm';
import { ShieldCheck, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function Checkout() {
  const { cart, cartTotal } = useCart();

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <Link to="/cart" className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-cyan-400 mb-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
          </Link>
          <h1 className="text-2xl font-black text-white">Manual Checkout</h1>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Manual Transfer</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Form Column */}
        <div className="lg:col-span-7">
          <CheckoutForm />
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-[#0a0f24] border border-slate-800 rounded-2xl p-6 space-y-6 sticky top-24">
          <h2 className="text-base font-extrabold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
            <span>Order Summary</span>
            <span className="text-xs font-bold text-cyan-400">{cart.length} item(s)</span>
          </h2>

          {/* Cart Item Preview */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.cartItemId} className="flex items-center justify-between gap-3 p-2 bg-slate-900/80 border border-slate-800/80 rounded-xl text-xs">
                <div className="min-w-0">
                  <h4 className="font-bold text-white truncate">{item.product.name}</h4>
                  <p className="text-[11px] text-cyan-400">{item.package.name} × {item.quantity}</p>
                </div>
                <span className="font-black text-white shrink-0">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-800 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal:</span>
              <span className="font-bold text-white">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Delivery Fee:</span>
              <span className="font-bold text-emerald-400">FREE</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-sm font-bold text-white">Total Amount:</span>
              <span className="text-xl font-black text-cyan-400">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <div className="p-3 bg-blue-950/40 border border-blue-800/60 rounded-xl text-xs text-blue-200 leading-relaxed">
            💡 <strong>Note:</strong> After confirming your order, you will receive an order number to send to our customer service on WhatsApp or Discord to finalize the payment and receive your codes.
          </div>
        </div>

      </div>

    </div>
  );
}
