import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ChevronLeft, ShieldCheck } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import CheckoutForm from '../components/CheckoutForm';
import ProductImage from '../components/ProductImage';

export const Checkout = () => {
  const { cart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="py-16 text-center space-y-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold font-heading text-slate-200">Your Cart is Empty</h2>
        <p className="text-sm text-slate-400">Please add products to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-cyan-500 text-slate-950 hover:bg-cyan-400"
        >
          <ChevronLeft size={16} /> Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <Link to="/cart" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-400 mb-2">
          <ChevronLeft size={14} /> Back to Cart
        </Link>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-100">
          Manual Payment Checkout
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Complete your information and select your preferred local Iraqi payment method.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Checkout Form */}
        <div className="lg:col-span-7">
          <CheckoutForm />
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-heading font-extrabold text-lg text-slate-100 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs text-cyan-400 font-mono">{cart.length} items</span>
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 border-t border-slate-800 pt-3">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center gap-3 text-xs">
                  <ProductImage
                    product={{
                      name: item.title,
                      image: item.image,
                      category: item.category,
                      platform: item.platform,
                      type: item.type
                    }}
                    className="w-12 h-12 shrink-0 rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-200 truncate">{item.title}</h4>
                    <p className="text-cyan-400 text-[11px] font-semibold">{item.packageName}</p>
                    <p className="text-slate-400 text-[10px]">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-bold text-slate-100">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Delivery</span>
                <span className="text-emerald-400 font-bold">Instant Digital</span>
              </div>
              <div className="flex justify-between items-center text-slate-100 pt-2 border-t border-slate-800 font-heading">
                <span className="font-bold text-sm">Total Payable</span>
                <span className="font-black text-xl text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-200">
              <ShieldCheck size={16} className="text-cyan-400" />
              <span>Safe & Secure Manual Order</span>
            </div>
            <p className="leading-relaxed">
              No online card details are saved. Transfer the amount using FastPay, Korek, or MasterCard to complete your purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
