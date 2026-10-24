import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, MessageSquare, ExternalLink, Copy, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../data/categories';

export const OrderSuccess = () => {
  const location = useLocation();

  // Try retrieving order from location state or latest from localStorage
  const order = location.state?.order || (() => {
    try {
      const saved = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      return saved[0] || null;
    } catch (e) {
      return null;
    }
  })();

  if (!order) {
    return (
      <div className="py-16 text-center space-y-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold font-heading text-slate-200">No Recent Order Found</h2>
        <p className="text-sm text-slate-400">Please start an order from our catalog.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-cyan-500 text-slate-950 hover:bg-cyan-400"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const { orderId, createdAt, customer, paymentMethod, items = [], totalAmount } = order;

  const paymentDetails = PAYMENT_METHODS.find((pm) => pm.id === paymentMethod) || PAYMENT_METHODS[0];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied "${text}" to clipboard!`);
  };

  return (
    <div className="space-y-8 pb-12 max-w-3xl mx-auto text-center">
      {/* Success Badge & Required Message */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
          <CheckCircle2 size={48} />
        </div>

        <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-100">
          Order Created Successfully!
        </h1>

        {/* REQUIRED MESSAGE FROM SPEC */}
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-sm sm:text-base font-bold leading-relaxed max-w-xl mx-auto">
          "Your order has been created successfully. Please contact us to complete the payment."
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400">Order Number:</span>
          <span className="font-mono font-bold text-cyan-400 text-sm">{orderId}</span>
          <button
            onClick={() => copyToClipboard(orderId)}
            className="p-1 text-slate-400 hover:text-white"
            title="Copy Order ID"
          >
            <Copy size={14} />
          </button>
        </div>
      </div>

      {/* Social Contact Buttons (WhatsApp, Discord, TikTok) */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-heading font-extrabold text-base text-slate-200">
          Contact Us On Social Media To Complete Payment
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647500000000?text=${encodeURIComponent(`Hello Dano Store! I want to complete payment for Order ID: ${orderId} (${formatPrice(totalAmount)})`)}`}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-heading font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
          >
            <MessageSquare size={18} />
            <span>WhatsApp Us</span>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
          >
            <ExternalLink size={18} />
            <span>Discord Server</span>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 font-heading font-extrabold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <ExternalLink size={18} />
            <span>TikTok @DanoStore</span>
          </a>
        </div>
      </div>

      {/* Payment Transfer Instructions Box */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-left space-y-4">
        <h3 className="font-heading font-bold text-base text-slate-100 flex items-center justify-between">
          <span>Selected Payment Method: {paymentDetails.name}</span>
          <span className={`px-2 py-0.5 rounded text-xs font-bold border ${paymentDetails.badgeColor}`}>
            {paymentDetails.logoText}
          </span>
        </h3>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Account / Transfer Number:</span>
            <span className="font-mono font-bold text-cyan-400 text-sm">{paymentDetails.accountNumber}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Account Name:</span>
            <span className="font-bold text-slate-200">{paymentDetails.accountName}</span>
          </div>
          <p className="text-xs text-slate-400 border-t border-slate-800/80 pt-2 leading-relaxed">
            {paymentDetails.instructions}
          </p>
        </div>
      </div>

      {/* Order Summary Box */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-left space-y-4">
        <h3 className="font-heading font-bold text-base text-slate-100">Order Items</h3>

        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
              <div>
                <h4 className="font-bold text-slate-200">{item.title}</h4>
                <p className="text-cyan-400 text-[11px]">{item.packageName} x {item.quantity}</p>
              </div>
              <div className="font-bold text-slate-100">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 text-sm font-heading">
          <span className="font-bold text-slate-300">Total Amount:</span>
          <span className="font-black text-cyan-400 text-lg">{formatPrice(totalAmount)}</span>
        </div>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-heading font-extrabold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
      >
        <ShoppingBag size={18} /> Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
