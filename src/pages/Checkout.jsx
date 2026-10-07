import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, ShoppingBag, ChevronLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import CheckoutForm from '../components/CheckoutForm';
import ProductImage from '../components/ProductImage';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, closeCart } = useCart();

  useEffect(() => {
    closeCart();
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 space-y-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-slate-100">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">Please add items to your cart before proceeding to checkout.</p>
        <Link to="/products" className="inline-block px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <Link to="/cart" className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-cyan-400 mb-2">
            <ChevronLeft className="w-4 h-4" /> Back to Cart
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">Order Checkout</h1>
          <p className="text-xs text-slate-400 mt-1">Manual payment via FastPay, Korek, or MasterCard</p>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
          <Lock className="w-3.5 h-3.5 text-cyan-400" /> Secure Manual Transfer
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Form */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <CheckoutForm />
        </div>

        {/* Right Summary */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 h-fit">
          <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-3 flex items-center justify-between">
            <span>Your Order Items</span>
            <span className="text-xs text-cyan-400 font-bold">{cartItems.length} Items</span>
          </h3>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.cartItemId} className="flex gap-3 items-center p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="w-12 h-12 shrink-0">
                  <ProductImage product={item.product} className="h-12" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-slate-100 truncate">{item.product.name}</h4>
                  {item.packageItem && (
                    <p className="text-[10px] text-purple-300">Package: {item.packageItem.name}</p>
                  )}
                  <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
                </div>
                <div className="text-xs font-bold text-cyan-400">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Subtotal:</span>
              <span className="font-bold">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Instant Digital Delivery:</span>
              <span className="font-bold text-emerald-400">Free</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-slate-800 text-slate-100 font-bold">
              <span>Total Amount:</span>
              <span className="text-cyan-400 text-lg font-black">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
            <div className="font-bold text-slate-200 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Next Step After Submission</span>
            </div>
            <p className="leading-tight">An order number will be generated. You will contact our team on WhatsApp/Discord to complete the payment transfer.</p>
          </div>

        </div>

      </div>

    </div>
  );
}
