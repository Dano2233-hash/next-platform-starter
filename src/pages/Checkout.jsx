import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, ShieldCheck, Zap } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import CheckoutForm from '../components/CheckoutForm';

export default function Checkout() {
  const { cart, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleOrderSuccess = (orderData) => {
    navigate('/order-success', { state: { orderData } });
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">
          Add items to your cart before proceeding to checkout.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Store</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <button
            onClick={() => navigate('/cart')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 mb-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Shopping Cart</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Checkout Order</h1>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
          <ShieldCheck className="w-4 h-4" />
          <span>Manual Payment Verification</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Checkout Form */}
        <div className="lg:col-span-8">
          <CheckoutForm onSuccess={handleOrderSuccess} />
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 bg-[#090d1a] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl sticky top-24">
          <h3 className="text-base font-extrabold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
            <span>Items Summary ({cart.length})</span>
          </h3>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-800/80"
              >
                <div className="min-w-0 pr-2">
                  <p className="font-bold text-slate-200 truncate">{item.name}</p>
                  <p className="text-[11px] text-cyan-400 font-semibold">{item.packageName} × {item.quantity}</p>
                </div>
                <span className="font-extrabold text-white shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-3 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal:</span>
              <span className="text-white font-bold">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Digital Processing:</span>
              <span className="text-emerald-400 font-bold">FREE</span>
            </div>
            <div className="border-t border-slate-800/80 pt-2 flex justify-between items-baseline text-sm">
              <span className="font-bold text-white">Total IQD:</span>
              <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
