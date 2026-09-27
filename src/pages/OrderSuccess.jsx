import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { PAYMENT_METHODS } from '../data/categories';
import { formatPrice } from '../utils/formatPrice';
import {
  CheckCircle2,
  Copy,
  MessageCircle,
  Share2,
  Video,
  ExternalLink,
  ShoppingBag,
  Home
} from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
        <h2 className="text-2xl font-black text-white">No Order Found</h2>
        <p className="text-slate-400 text-xs">It looks like you navigated here directly without placing an order.</p>
        <Link to="/" className="inline-block px-6 py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-xs">
          Return to Home
        </Link>
      </div>
    );
  }

  const { orderId, customer, paymentMethod, items, totalAmount } = order;

  const paymentInfo = PAYMENT_METHODS.find((p) => p.id === paymentMethod) || PAYMENT_METHODS[0];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied "${text}" to clipboard!`);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I placed order #${orderId} for total ${formatPrice(totalAmount)}. Payment method: ${paymentInfo.name}. Please confirm!`
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">

      {/* Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-blue-950 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mx-auto">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-extrabold text-xs uppercase tracking-wider inline-block">
          Order Created Successfully
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Order #{orderId}
        </h1>
        <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </p>
      </div>

      {/* Payment Instructions Card */}
      <div className="bg-[#090d1a] border border-cyan-500/40 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-xs text-slate-400 uppercase font-semibold">Selected Payment Method</span>
            <h3 className="text-lg font-black text-cyan-400">{paymentInfo.name}</h3>
          </div>
          <span className="px-2.5 py-1 rounded bg-blue-950 border border-blue-500/40 text-xs font-bold text-blue-300">
            Manual Transfer
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Transfer Total ({formatPrice(totalAmount)}) To:
          </span>
          <div className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="font-mono text-base font-black text-white tracking-wider">
              {paymentInfo.account}
            </span>
            <button
              onClick={() => copyToClipboard(paymentInfo.account)}
              className="px-3 py-1.5 rounded bg-slate-800 text-cyan-400 hover:bg-slate-700 text-xs font-bold flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed pt-1">
            {paymentInfo.instructions}
          </p>
        </div>
      </div>

      {/* Contact Channels Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold text-slate-200 uppercase tracking-wider">
          Contact Us To Complete Payment & Instant Delivery
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647501234567?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-600/40 hover:bg-emerald-900/60 transition flex items-center gap-3 text-emerald-300 font-bold text-xs"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="block text-white font-extrabold text-sm">WhatsApp</span>
              <span className="text-[11px] text-emerald-400">Direct Chat Support</span>
            </div>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-600/40 hover:bg-indigo-900/60 transition flex items-center gap-3 text-indigo-300 font-bold text-xs"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center shrink-0">
              <Share2 className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <span className="block text-white font-extrabold text-sm">Discord</span>
              <span className="text-[11px] text-indigo-400">Community Server</span>
            </div>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-rose-950/60 border border-rose-600/40 hover:bg-rose-900/60 transition flex items-center gap-3 text-rose-300 font-bold text-xs"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center shrink-0">
              <Video className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <span className="block text-white font-extrabold text-sm">TikTok</span>
              <span className="text-[11px] text-rose-400">Official Channel</span>
            </div>
          </a>

        </div>
      </div>

      {/* Order Summary Box */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-extrabold text-white border-b border-slate-800 pb-3">
          Order Summary Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 font-semibold block">Customer Name:</span>
            <span className="text-slate-100 font-bold text-sm">{customer.name}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block">Phone Number:</span>
            <span className="text-slate-100 font-bold text-sm">{customer.phone}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block">City:</span>
            <span className="text-slate-100 font-bold text-sm">{customer.city}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block">Order Note / ID:</span>
            <span className="text-slate-100 font-bold text-sm">{customer.orderNote || 'N/A'}</span>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-3 space-y-2">
          {items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs py-1">
              <span className="text-slate-300 font-semibold">
                {item.name} ({item.packageName}) x {item.quantity}
              </span>
              <span className="text-cyan-400 font-extrabold">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
          <div className="border-t border-slate-800 pt-2 flex justify-between items-baseline text-sm font-black">
            <span className="text-white">Total Amount</span>
            <span className="text-cyan-400 text-lg">{formatPrice(totalAmount)}</span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          onClick={() => navigate('/')}
          className="flex-1 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800 font-extrabold text-xs transition flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4 text-cyan-400" />
          <span>Back To Home</span>
        </button>

        <button
          onClick={() => navigate('/products')}
          className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white font-extrabold text-xs hover:brightness-110 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

    </div>
  );
}
