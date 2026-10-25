import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CheckoutForm from '../components/CheckoutForm';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { ShoppingBag, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function Checkout() {
  const { cart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Your cart is empty</h2>
        <p className="text-slate-400 text-xs">Please select products before checking out.</p>
        <Link
          to="/products"
          className="inline-block px-5 py-2.5 bg-cyan-600 text-white text-xs font-bold rounded-xl"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">

      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white">Manual Checkout</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Fill in your details to create your digital order receipt.
          </p>
        </div>
        <Link
          to="/cart"
          className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Form */}
        <div className="lg:col-span-7">
          <CheckoutForm />
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-5">
          <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-6 space-y-4 sticky top-24">
            <h3 className="font-extrabold text-white text-base border-b border-slate-800 pb-3 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              Order Items ({cart.length})
            </h3>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center gap-3 text-xs">
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-950">
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      category={item.category || 'games'}
                      platform={item.platform || 'PC'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white truncate">{item.name}</h4>
                    {item.selectedPackage && (
                      <span className="text-[10px] text-cyan-400 block">{item.selectedPackage.name}</span>
                    )}
                    <span className="text-slate-400 text-[11px] block">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-cyan-300 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Total IQD Due:</span>
                <span className="text-cyan-300 font-extrabold text-sm">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-[11px] text-cyan-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              Direct local payment via FastPay, Korek, or MasterCard.
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
